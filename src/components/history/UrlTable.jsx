import React, { useState, useEffect } from 'react'
import { Button, Table } from 'antd'
import { useStateContext } from '../../contexts/ContextProvider'
import '../../styles/urltable.css'
import Preview from '../Preview'

const columns = [
    {
        title: 'URL',
        dataIndex: 'url',
    },
    {
        title: 'Summary',
        dataIndex: 'summary'
    }
]


const UrlTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(false)
    const { userEmail, currentColour } = useStateContext()
    const [urlHistory, setUrlHistory] = useState(null)
    const [textHistory, setTextHistory] = useState(null)
    const [tableData, setTableData] = useState(null)
    const [showPreview, setShowPreview] = useState(false)
    const [summaryHistory, setSummaryHistory] = useState(null)

    const handleViewSummary = (data) => {
        console.log("this is the data")
        console.log(data)
        setSummaryHistory(data)
        setShowPreview(true)
    }

    useEffect(() => {
        const existingUrlData = JSON.parse(localStorage.getItem('urlData')) || {}
        if (existingUrlData[userEmail]) {
            console.log("history")
            console.log(existingUrlData[userEmail])
            const uniqueUrls = [...new Set(existingUrlData[userEmail])]
            console.log(uniqueUrls)
            setUrlHistory(uniqueUrls)
            const tableData = uniqueUrls.map((data, index) => {
                return {
                    key: index,
                    url: data.url,
                    summary: (<div className='text-center' style={{cursor : 'pointer'}} onClick={() => handleViewSummary(data.summary)}>View</div>)
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
                title={'Summary'}
            />}
        </div>
    )
}
export default UrlTable