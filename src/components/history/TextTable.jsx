import React, { useState, useEffect } from 'react'
import { Button, Table } from 'antd'
import { useStateContext } from '../../contexts/ContextProvider'
import '../../styles/urltable.css'
import Preview from '../Preview'

const columns = [
    {
        title: 'Text',
        dataIndex: 'text',
    },
    {
        title: 'Summary',
        dataIndex: 'summary'
    }
]


const TextTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(false)
    const { userEmail, currentColour } = useStateContext()
    const [urlHistory, setUrlHistory] = useState(null)
    const [textHistory, setTextHistory] = useState(null)
    const [tableData, setTableData] = useState(null)
    const [showPreview, setShowPreview] = useState(false)
    const [summaryHistory, setSummaryHistory] = useState(null)
    const [title, setTitle] = useState(null)

    const handleViewSummary = (data, title) => {
        setTitle(title)
        setSummaryHistory(data)
        setShowPreview(true)
    }

    useEffect(() => {
        const existingTextData = JSON.parse(localStorage.getItem('textData')) || {}
        if (existingTextData[userEmail]) {
            console.log("history")
            console.log(existingTextData[userEmail])
            const uniqueTexts = [...new Set(existingTextData[userEmail])]
            console.log(uniqueTexts)
            setTextHistory(uniqueTexts)
            const tableData = uniqueTexts.map((data, index) => {
                return {
                    key: index,
                    text: <div className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleViewSummary(data.textData, 'Text')}>View</div>,
                    summary: <div className='text-center' style={{ cursor: 'pointer' }} onClick={() => handleViewSummary(data.summary, 'Summary')}>View</div>
                }
            })
            setTableData(tableData)
        }
    }, [])

    const start = () => {
        setLoading(true)
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([])
            setLoading(false)
        }, 1000)
    }

    const fetchSelectedRows = () => {
        if (tableData) {
            const selectedRows = selectedRowKeys.map(key => tableData.find(item => item.key === key))
            console.log('Selected Rows:', selectedRows)
        }
    }

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const hasSelected = selectedRowKeys.length > 0
    return (
        <div className='mx-5 my-5'>
 
            <Table className="custom-ant-table" rowSelection={undefined} columns={columns} dataSource={tableData} />

            {<Preview
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                scrapeData={summaryHistory}
                setScrapeData={null}
                title={title}
            />}
        </div>
    )
}
export default TextTable