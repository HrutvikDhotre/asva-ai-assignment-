import React, { useEffect, useState } from 'react'
import '../styles/preview.css'
import { RxCross2 } from "react-icons/rx";
import { useStateContext } from '../contexts/ContextProvider';
import { generateSummary } from '../apis/SummarizeApi';
import { mockSummarizationAPI } from '../apis/MockApi';

const Preview = ({ showPreview, setShowPreview, title, scrapeData, setScrapeData,setSummary }) => {

    const { currentColour, screecSize } = useStateContext()
    const [content, setContent] = useState(null)

    function handleFocus(e) {
        e.target.style.border = `1px solid ${currentColour}`
        // e.target.style.outline = `1px solid ${currentColour}`
    }

    function handleBlur(e) {
        e.target.style.border = ``
        e.target.style.outline = `none`
    }

    useEffect(() => {
        setContent(scrapeData)
    },[scrapeData])

    const handleSaveSummarize = ()=>{
        try{
            setScrapeData(content)
            setShowPreview(false)
            // const summary = generateSummary('Medium')
            // console.log("hi summary")
            const summary = mockSummarizationAPI(content,'medium')
            console.log(summary)
            setSummary(summary)
        }catch(error){

        }
    }

    return (
        <>
            {showPreview  &&
                <div className='preview-container '>
                    <div className='preview-content mx-5 my-2'>
                        <div className='text-center fw-bolder fs-1 mb-4 text-gradient'>{title ? title : ""}
                        </div>
                       {title === 'Preview' ?  <textarea
                            className='p-4 w-100 h-75'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        /> : 
                        <textarea
                        className='p-4 w-100 h-75'
                        value={content}
                        // onChange={(e) => setContent(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    /> 
                        }
                        <div className='button-container'>
                           {title !== 'Preview' ? <button
                                className='custombtn  mt-2 '
                                style={{ backgroundColor: `${currentColour}` }}
                                onClick={() => setShowPreview(false)}
                            >Cancel</button> : ''}
                           {title === 'Summary' || title === 'Text' ? '' : <button className='custombtn mt-2 me-0'
                                style={{
                                    backgroundColor: 'white',
                                    color: `${currentColour}`,
                                    border: `1px solid ${currentColour}`
                                }}
                                onClick={handleSaveSummarize}
                            >{ window.innerWidth < 840 ? 'Summarize' : 'Save & Summarize'}</button>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Preview