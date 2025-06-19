import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from '../../Components/Admin_components/First_page/firstpage';
import Navbar from '../../Components/Navbar/Navbar';
import CreateCompany from '../../Components/Admin_components/Create_company/Create_company'

function Admin() {
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path='/admin' element={<FrontPage/>}/>
      <Route path='/admin/create_company' element={<CreateCompany/>}/>

    </Routes>

    </div>
  );
}

export default Admin;