import { useState } from 'react'
import './App.css'
import ProductCard from './components/product-card'
import Header from './components/header'
import LoginPage from './pages/loginpage'
import AdminPage from './pages/adminpage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Testing from './pages/testing'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/client/register'
import HomePage from './pages/homePage'
import Checkout from './pages/client/checkout'
import Orders from './pages/admin/order'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ContactPage from './pages/contactPage'
import ReviewsPage from './pages/reviews'
import ForgotPassword from './pages/client/forgetPassword'

function App() {
  

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <BrowserRouter>
    <Toaster position='top-right'/>

                      <Routes path="/*">


                      <Route path="/admin/*" element={<AdminPage/>}/>
                      <Route path="/login" element={<LoginPage/>}/>
                      <Route path="/testing" element={<Testing/>}/>
                      <Route path="/Register" element={<RegisterPage/>}/>
                      <Route path="/*" element={<HomePage/>}/>
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/reviews" element={<ReviewsPage />} />
                      <Route path="/forget" element={<ForgotPassword />} />



                      
                      
                      
                      
                      
                      
                      </Routes>
    
    
    </BrowserRouter>
    </GoogleOAuthProvider>
  )

  
}

export default App
