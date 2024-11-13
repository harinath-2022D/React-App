import React,{useState} from 'react'
import { NavLink, Routes, Route, Outlet, useLocation } from 'react-router-dom'

import ChangePasswordDialogue from "../util/ChangePasswordDialogue";

import EmployeeManagement from './hrpages/EmployeeManagement';
import Payroll from './hrpages/Payroll';
import TrainingAndDev from './hrpages/TrainingAndDev';

import "../css/adminscreens.css";
import Logout from '../components/Logout';

const HrScreens = () => {
    return(
        <section className="root-section">
        <div className="left-sidebar">
          <nav className="">
            <div className="list-group list-group-flush mx-3 mt-4">
            <NavLink to="/hr/ems" className="items">Employee Management</NavLink>
            <NavLink to="/hr/payroll" className="items">Payroll services</NavLink>
            <NavLink to="/hr/training" className="items">Training & Development</NavLink>
            <NavLink to="/hr/logout" className="items ">Log Out</NavLink>
            </div>
          </nav>
        </div>
        <div className="right-sidebar">
          <Routes>
            <Route path="ems" element={<EmployeeManagement />}/>
            <Route path="payroll" element={<Payroll />} />
            <Route path="training" element={<TrainingAndDev />} />
            <Route path="logout" element={<Logout status={true}/>} />
          </Routes>
          <Outlet />
        </div>
      </section>
    )
}
const HrDashBoard = () => {
    const { state } = useLocation();
  return (
    <div>
      {state != null && state.pwd_upd === 0 && (
        <ChangePasswordDialogue modalStatus={true} />
      )}
      <HrScreens />
    </div>
  )
}

export default HrDashBoard
