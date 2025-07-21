 import React from 'react' 
 import { Routes, Route } from 'react-router-dom'
 import BuyCredit from './pages/BuyCredit'
 import Home from './pages/Home'
import Result from './pages/Result'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
// import { SignInButton } from '@clerk/clerk-react'

 const App = () => {
   return (
      <div className='min-h-screen bg-slate-50'>
        <NavBar />
        {/* <SignInButton /> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="result/" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />

        </Routes>
        <Footer/>


        </div>
   )
 }
 
 export default App
 