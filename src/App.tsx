'use client';
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { Navigation } from './components/navigation'
import Home from './pages/Home'
import Customers from './pages/Customers';
import NotFound from './pages/NotFound';



function App() {
  
  return (

      <div className="flex items-center flex-col w-screen h-screen">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route index element={<Home />} />
            <Route path='kunder' element={<Customers />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>

  )
}

export default App
