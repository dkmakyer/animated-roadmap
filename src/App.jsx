import React from 'react'
import "./App.css"
import Header from './components/header/Header'
import {HashRouter, Routes, Route} from "react-router-dom"
import Footer from './components/footer/Footer'
import Home from './components/pages/Home/Home'

const App = () => {
  return (
    <>
      <HashRouter>
        {/* <Header/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/*<Route path='/About' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/Sign-up' element={<SignUp/>}/>*/}
          <Route path='*' element={<p className='min-h-[80vh] flex items-center pl-[37rem] text-2xl'>Page Not found</p>}/>
        </Routes>
        <Footer/>
      </HashRouter>
    </>
  )
}

export default App