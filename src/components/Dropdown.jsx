import React, { useEffect } from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, message, Space, Tooltip } from 'antd'
import '../styles/dropdown.css'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useStateContext } from '../contexts/ContextProvider';
import { IoIosArrowDown } from "react-icons/io"
import { generateSummary } from '../apis/SummarizeApi';

const DropdownComponent = ({ summaryLength, setSummaryLength }) => {

    const { currentColour } = useStateContext()

    const handleButtonClick = (e) => {
        // message.info('Click on left button.')
        console.log('click left button', e)
    }

    const handleMenuClick = (e) => {
        e.key === 'short' ? setSummaryLength('Short') : e.key === 'medium' ? setSummaryLength('Medium') : setSummaryLength('Long')
        // message.info(e.key)
        // console.log('click', e.target.key)
    }

    const items = [
        {
            label: 'Short',
            key: 'short',
        },
        {
            label: 'Medium',
            key: 'medium',
        },
        {
            label: 'Long',
            key: 'long',
        },
    ]


    const menuProps = {
        items,
        onClick: handleMenuClick,
    }


    return (
        <Dropdown
            menu={menuProps}
            onClick={handleButtonClick}
            style={{
                height: '45px',
                padding: '0',
                margin: '0'
            }}
        >
         <button
            className='custombtn  dropdownBtn'
            style={{
              backgroundColor: 'white',
              color: `${currentColour}`,
              border: `1px solid ${currentColour}`
            }}
          >
            <span className='text-center mx-2'>{'Length'}</span>
            <IoIosArrowDown style={{color :currentColour}} />
          </button>
        </Dropdown>
    )
}


export default DropdownComponent