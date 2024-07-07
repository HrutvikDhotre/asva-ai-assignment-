import React, { useState, useEffect,useRef } from 'react'
import DropdownComponent from '../Dropdown'
import { generateSummary } from '../../apis/SummarizeApi'
import { LuClipboardList } from "react-icons/lu"
import { message } from 'antd'
import { FaDownload } from "react-icons/fa6"
import { jsPDF } from "jspdf"
import { mockSummarizationAPI } from '../../apis/MockApi'

const SummaryBlock = ({ summary, setSummary, scrapeData, setScrapeData }) => {
    const [summaryLength, setSummaryLength] = useState('Medium')

    const isInitialRender = useRef(true)

    useEffect(() => {
        // const summary = generateSummary(summaryLength)
        if (isInitialRender.current) {
            isInitialRender.current = false
        } else {
            const summary = mockSummarizationAPI(scrapeData, summaryLength)
            setSummary(summary)
        }
    }, [summaryLength])

    const handleCopySummary = async () => {
        try {
            await navigator.clipboard.writeText(summary)
            message.success('Summary copied to clipboard!')
        } catch (error) {
            message.error('Failed to copy summary. Please try again.')
        }
    }

    const downloadSummary = () => {
        try {
            const doc = new jsPDF()
            const pageWidth = doc.internal.pageSize.getWidth()
            const titleTextWidth = doc.getStringUnitWidth("Summary") * doc.internal.getFontSize() / doc.internal.scaleFactor
            const titleX = (pageWidth - titleTextWidth) / 2
            doc.setFontSize(18)
            doc.text("Summary", titleX, 10)
            doc.setFontSize(12)
            doc.text(summary, 10, 20)
            doc.save('Summary.pdf')
            message.success("Summary downloaded successfully.", 3)
        } catch (error) {
            message.error('Failed to generate PDF. Please try again.')
        }
    }


    return (
        <>{
            <div className='mt-5 mx-5'>
                <div className='mx-lg-2 mx-sm-1' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span className='text-center fs-1 fw-bold ' style={{ color: 'gray' }}>Summary</span>
                    <DropdownComponent

                        summaryLength={summaryLength}
                        setSummaryLength={setSummaryLength}
                    />
                </div>
                <div
                    className='mx-lg-2 mx-sm-1 py-3 px-4 mt-3 pb-5 pt-0'
                    style={{
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                        borderRadius: '10px',
                        background: 'rgb(252 252 252)',
                    }}
                >
                    <div className='m-0 p-0 text-end'>
                        <button
                            className=' m-0 mt-2 float-end p-0 m-0 text-end'
                            onClick={handleCopySummary}
                        >
                            <LuClipboardList style={{color : 'gray'}} />
                        </button>
                        <button
                            className='m-0 me-2 mt-2 float-end p-0 m-0 text-end'
                            onClick={downloadSummary}
                        >
                            <FaDownload style={{color : 'gray'}} />
                        </button>
                        {/* <span className='border fs-6'>Download</span> */}
                    </div>
                    <div className='mt-5 pt-5'>
                        {summary}
                    </div>
                </div>
            </div>
        }</>
    )
}

export default SummaryBlock