import React, { useEffect, useState,useRef } from 'react'
import { useStateContext } from '../../contexts/ContextProvider.jsx'
import axios from 'axios'
import cheerio from 'cheerio'
import { parseDocument } from 'htmlparser2'
import { DomHandler } from 'domhandler'
import Loader from '../Loader.jsx'
import Preview from '../Preview.jsx'
import { generateSummary } from '../../apis/SummarizeApi.jsx'
// import { handleBlur, handleFocus } from '../../apis/InputFunctions.jsx'
import SummaryBlock from './SummaryBlock.jsx'
import { message } from 'antd'
import { mockSummarizationAPI } from '../../apis/MockApi.jsx'

const Url = () => {

  const { currentColour, userEmail } = useStateContext()
  const [url, setUrl] = useState(null)
  const [prevUrl, setPrevUrl] = useState(null)
  const [loader, setLoader] = useState(false)
  const [scrapeData, setScrapeData] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [summary, setSummary] = useState('')


  function handleFocus(e) {
    e.target.style.border = `1.5px solid ${currentColour}`
    e.target.style.outline = `1.5px solid ${currentColour}`
  }

  function handleBlur(e) {
    e.target.style.border = ``
    e.target.style.outline = `none`
  }

  const handleScrape = async () => {
    console.log("inside")
    const proxyUrl = 'https://thingproxy.freeboard.io/fetch/'
    if (url === null || url.trim() === '') {
      message.error("Please enter a valid URL", 3)
      setScrapeData(null)
      setSummary(null)
      // setUrl(null)
      setPrevUrl(null)
      return
    }
    if (url && prevUrl && prevUrl.trim() === url.trim()) {
      message.error("Data already fetched.", 3)
      return
    }
    try {
      setLoader(true)
      const response = await axios.get(proxyUrl + url)
      const content = extractContent(response.data)
      if (content.length === 0) {
        throw new Error("No content fetched.");
      }
      setShowPreview(true)
      setScrapeData(null)
      setScrapeData(content)
      setPrevUrl(url)
      // const summaryData =  generateSummary('Medium')
      // setSummary(summaryData)
      // storeData(url,summaryData)
    } catch (error) {
      message.error("Something went wrong while fetching data", 3)
      setScrapeData(null)
      setSummary(null)
      setPrevUrl(null)
    }finally{
      setLoader(false) 
    }
  }

  const extractContent = (html) => {
    const handler = new DomHandler()
    const document = parseDocument(html, handler)

    const content = []
    const visitNode = (node) => {
      if (node.type === 'tag' && (node.name === 'p' || node.name === 'article')) {
        if (node.children) {
          node.children.forEach(child => {
            if (child.type === 'text') {
              content.push(child.data)
            }
          })
        }
      } else if (node.children) {
        node.children.forEach(visitNode)
      }
    }

    visitNode(document)

    return content.join(' ').trim()
  }

  const storeData = (url, summary) => {
    console.log(summary)
    const existingData = JSON.parse(localStorage.getItem('urlData')) || {}
    if (!existingData[userEmail]) {
        existingData[userEmail] = []
    }
    const urlExists = existingData[userEmail].some(data => data.url === url)
    if (!urlExists) {
        existingData[userEmail].push({ url, summary })
        localStorage.setItem('urlData', JSON.stringify(existingData))
    }
  }

  // useEffect(()=>{
  //   // alert("summary change")
  //   storeData(url,summary)
  // },[summary])

  const isInitialRender = useRef(true)
  useEffect(()=>{
    // alert("scrap change")
    if (isInitialRender.current) {
      isInitialRender.current = false
    } else {
      if (scrapeData) {
        console.log("hola summary")
        // const summary = generateSummary('Long')
        const summary = mockSummarizationAPI(scrapeData,'medium')
        setSummary(summary)
        storeData(url,summary)

      }
    }
  },[scrapeData])




  return (
    <>
      <div className='mx-5 py-3 px-0'
        style={{
          background: 'rgb(247 247 252)',
          borderRadius: '10px'
        }}
      >
        <div className='text-center fs-1 fw-bold mx-5 mt-5 mb-5' style={
          {
            color: 'gray',
            // margin : '0 100px',
            // width : "100%",
          }
        } >Enter A
          <span className='text-gradient fw-bolder'  >{" URL "}</span>
          To Scrap Data & Summarize
        </div>
        <div
          className='text-center formGroup mb-4 mx-lg-3 mx-sm-0'
        >
          <input
            className='mx-2 my-2'
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder='Enter URL'
            value={url}
          />
          <button className='custombtn mx-2 my-2' onClick={handleScrape} style={{ backgroundColor: `${currentColour}` }} >
            Fetch
          </button>
          {scrapeData && <button
            className='custombtn mx-2 my-2'
            style={{
              backgroundColor: 'white',
              color: `${currentColour}`,
              border: `1px solid ${currentColour}`
            }}
            onClick={() => {
              setShowPreview(true)
            }}
          >{window.innerWidth < 840 ? 'Preview' : 'Preview Scrap'}</button>}
        </div>
      </div>

      {loader && <Loader loaderText={"Please wait while we scrape the data.."} />}

      {scrapeData && <Preview
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        scrapeData={scrapeData}
        setScrapeData={setScrapeData}
        title={'Preview'}
      // setSummary={setSummary}
      />}

      {summary && <SummaryBlock
        summary={summary}
        setSummary={setSummary}
        scrapeData={scrapeData}
        setScrapeData={setScrapeData}
      />
      }

    </>
  )
}

export default Url
