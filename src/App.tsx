import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
