import React from 'react'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import Projects from './Projects'
import About from './About'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
    </BrowserRouter>
  )
}

