import React, { useEffect, useState, useRef } from 'react'
import { generateSummary } from '../../apis/SummarizeApi'
import Loader from '../Loader'
import Preview from '../Preview'
import SummaryBlock from './SummaryBlock.jsx'
import { useStateContext } from '../../contexts/ContextProvider.jsx'
import { message } from 'antd'
import { mockSummarizationAPI } from '../../apis/MockApi.jsx'

const Text = () => {

  const { currentColour, userEmail } = useStateContext()
  const [text, setText] = useState(null)
  const [prevText, setPrevText] = useState(null)
  const [loader, setLoader] = useState(false)
  const [scrapeData, setScrapeData] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [summary, setSummary] = useState('')
  const myRef = useRef(null)

  const scrollToElement = () => {
    // console.log(myRef.current)
    if (myRef.current)
      myRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(() => {
    if (summary) {
      scrollToElement()
    }
  }, [summary])

  function handleFocus(e) {
    e.target.style.border = `1px solid ${currentColour}`
    e.target.style.outline = `.5px solid ${currentColour}`
  }

  function handleBlur(e) {
    e.target.style.border = ``
    e.target.style.outline = `none`
  }

  const handleSummarization = () => {
    if (text === null || text.trim() === '') {
      message.error("Please enter a some text", 3)
      return
    }
    if (text && prevText && prevText.trim() === text.trim()) {
      message.error("Data already summarized", 3)
      return
    }

    try {
      // console.log("inside handle summary")
      setLoader(true)
      // const summary = generateSummary('Medium')
      // console.log(text)
      const summary = mockSummarizationAPI(text,'medium')
      // console.log("this is the summary")
      // console.log(summary)
      setSummary(summary)
      setPrevText(text)
      // scrollToElement()
      storeData(text, summary)
    } catch (error) {
      // console.log(error)
      message.error("Something went wrong while summarizing.")
    } finally {
      setLoader(false)
    }
  }

  const storeData = (textData, summary) => {
    const existingData = JSON.parse(localStorage.getItem('textData')) || {}
    if (!existingData[userEmail]) {
      existingData[userEmail] = []
    }
    existingData[userEmail].push({ textData, summary })
    localStorage.setItem('textData', JSON.stringify(existingData))
  }

  return (
    <>
      <div
        className='mx-5 py-3 px-3 px-lg-4'
        style={{
          background: 'rgb(247 247 252)',
          borderRadius: '10px'
        }}>
        <div className='text-center fs-1 fw-bold mx-5 mt-3 mb-5'
          style={{
            color: 'gray',
          }} >
          Enter Some
          <span className='text-gradient fw-bolder'  >{" TEXT "}</span>
          To Summarize
        </div>
        <textarea
          name="" id=""
          onChange={(e) => setText(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ minHeight: '200px' }}
          className='p-3'
          placeholder='Enter Text'
          value={text}
        >

        </textarea>
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <button
            className='custombtn mt-3 textbtn '
            style={{ backgroundColor: `${currentColour}` }}
            onClick={handleSummarization}
          >
            Summarize
          </button>
        </div>
      </div>

      {loader && <Loader loaderText={"Please wait while we summarize your data.."} />}

      {/* {scrapeData && <Preview
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        scrapeData={scrapeData}
        setScrapeData={setScrapeData}
        title={'Preview'}
      />} */}

      <div ref={myRef} className='p-0 m-0'>
        {summary &&
          <SummaryBlock
            summary={summary}
            setSummary={setSummary}
            scrapeData={text}
            setScrapeData={setText}
          />
        }
      </div>


    </>
  )
}

export default Text