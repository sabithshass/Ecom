import { useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import Registration from './pages/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/SignIn';
import Listing from './pages/Listing';
import Layouts from './Layout/Layouts';
import ProductDetail from './pages/ProductDetail';

function App() {

  return (
    <>
    <Routes>
    <Route path="/register" element={<Registration />} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/" element={<Layouts />}>
          <Route index element={<Listing />} />
          <Route path='details/:id' element={<ProductDetail />} />
        </Route>
  </Routes>
  </>
  )
}

export default App
