import React, { useEffect } from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, message, Space, Tooltip } from 'antd'
import '../styles/dropdown.css'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useStateContext } from '../contexts/ContextProvider';
import { IoIosArrowDown } from "react-icons/io"
import { generateSummary } from '../apis/SummarizeApi';
import { TbRectangleFilled } from "react-icons/tb";
import { MdOutlineArrowDropDown } from "react-icons/md";

const ThemeDropdown = () => {

    const { currentColour, setColour } = useStateContext()

    const handleButtonClick = (e) => {
        // message.info('Click on left button.')
        console.log('click left button', e)
    }

    const handleMenuClick = (e) => {
        setColour(e.key)
    }

    const items = [
        {
            label: <TbRectangleFilled
                className='fs-4'
                style={{
                    color: '#72CC50'
                }}
            // onClick={() => setColour('#72CC50')}
            />,
            key: '#72CC50',
        },
        {
            label: <TbRectangleFilled
                className='fs-4'
                style={{
                    color: '#03C9D7'
                }}
            // onClick={() => setColour('#03C9D7')}
            />,
            key: '#03C9D7',
        },
        {
            label: <TbRectangleFilled
                className='fs-4'
                style={{
                    color: '#1E4DB7'
                }}
            // onClick={() => setColour('#1E4DB7')}
            />,
            key: '#1E4DB7',
        },
        {
            label: <TbRectangleFilled
                className='fs-4'
                style={{
                    color: '#FB9678'
                }}
            // onClick={() => setColour('#1E4DB7')}
            />,
            key: '#FB9678',
        }

    ]


    const menuProps = {
        items,
        onClick: handleMenuClick,
    }


    return (
        <Dropdown
            menu={menuProps}
            onClick={handleButtonClick}
            // style={{
            //     height: '45px',
            //     padding: '0',
            //     margin: '0'
            // }}
        >
            {/* <button
                className='custombtn  dropdownBtn'
                style={{
                    backgroundColor: 'white',
                    color: `${currentColour}`,
                    border: `1px solid ${currentColour}`
                }}
            > */}
                <span className='text-center mx-2'>
                    <TbRectangleFilled
                        className='fs-3'
                        style={{
                            color: currentColour
                        }}
                    />
                    <MdOutlineArrowDropDown style={{
                        color: 'black',
                        fontSize: '1rem'
                    }} />
                </span>
            {/* </button> */}
        </Dropdown>
    )
}


export default ThemeDropdown


{/* <div
className='float-end  flex-column justify-content-center align-items-center py-2'
style={{
  position: 'absolute',
  top: '2.7rem',
  right: '5.3rem',
  width: '3rem',
  border: '.5px solid gray',
  backgroundColor: 'white',
  borderRadius: '0.2rem',
  display: themeBlock ? 'flex' : 'none'
}}
>
<TbRectangleFilled
  className='fs-4'
  style={{
    color: '#72CC50'
  }}
  onClick={() => setColour('#72CC50')}
/>
<TbRectangleFilled
  className='fs-4'
  style={{
    color: '#03C9D7'
  }}
  onClick={() => setColour('#03C9D7')}
/>
<TbRectangleFilled
  className='fs-4'
  style={{
    color: '#1E4DB7'
  }}
  onClick={() => setColour('#1E4DB7')}
/>
<TbRectangleFilled
  className='fs-4'
  style={{
    color: '#FB9678'
  }}
  onClick={() => setColour('#FB9678')}
/>
</div> */}