import React from 'react'
import { BrowserRouter ,Link, Route,Routes } from 'react-router-dom'
import {Home, Sign, RegistrationForm, Profile, Record, Remainder, Appointment} from './pages';
import Form from './components/Form'
import {Navbar,Footer} from './components';




const App = () => {
  
  return (
    
    <BrowserRouter>
   <Navbar/>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/form" element={<Form />} /> 
        <Route path="/record" element={<Record />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/remainder" element={<Remainder />} /> 
       
      </Routes>
    </main>
    <Footer/>
  </BrowserRouter>

  )
}

export default App
