import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useStateContext } from './contexts/ContextProvider';
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import Summarizer from './pages/Summarizer';
import Url from './components/summarizer/Url'
import Text from './components/summarizer/Text'
import History from './pages/History';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import UrlTable from './components/history/UrlTable';
import TextTable from './components/history/TextTable';


function App() {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize, themeMode, setThemeMode, setCurrentColour } = useStateContext();
  useEffect(() => {
    const currColour = localStorage.getItem('colourMode')
    if (currColour) {
      setCurrentColour(currColour)
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={(<Login />)} />
        <Route element={(<Layout />)}>
          <Route element={(<ProtectedRoutes />)}>
            <Route path='/summarize' element={(<Summarizer />)} >
              <Route path='url' element={(<Url />)} />
              <Route path='text' element={(<Text />)} />
            </Route>
            <Route path='/history' element={(<History />)} >
              <Route path='url' element={(<UrlTable />)} />
              <Route path='text' element={(<TextTable />)} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
