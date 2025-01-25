import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
function Layouts() {
    const location = useLocation();
    const noHeaderRoutes = ["/register", "/sign"];
    const showHeader = !noHeaderRoutes.includes(location.pathname);
  return (
  
         <div>
      {showHeader && <Header />} 
      <main className="container-fluid">
  <div className="row">

    <div className="col-md-3">
      <Sidebar />
    </div>

    <div className="col-md-9">
      <Outlet />
    </div>
  </div>
</main>
    </div>
 
  )
}

export default Layouts
