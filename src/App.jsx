import { useState } from 'react'
import './App.css'
import ProductCard from './components/product-card'
import Header from './components/header'
import LoginPage from './pages/loginpage'
import AdminPage from './pages/adminpage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <BrowserRouter>

                      <Routes path="/*">


                      <Route path="/admin/*" element={<AdminPage/>}/>
                      <Route path="/login" element={<LoginPage/>}/>
                      <Route path="/" element={<h1>Home</h1>}/>
                      <Route path="/*" element={<h1>404 Not Found</h1>}/>
                      
                      
                      </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
