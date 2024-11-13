import React, { useEffect, useState } from "react";
import Header from "./adminpages/Header";
import {
  Route,
  Routes,
  useLocation,
  NavLink,
  Outlet,
  Link,
} from "react-router-dom";
import Contact from "../components/Contact";
import Services from "../components/Services";
import ChangePasswordDialogue from "../util/ChangePasswordDialogue";

import NewUser from "./adminpages/NewUser";
import { useSelector } from "react-redux";
import EmployeeManagement from "./hrpages/EmployeeManagement";
import Payroll from "./hrpages/Payroll";
import TrainingAndDev from "./hrpages/TrainingAndDev";
import Logout from "../components/Logout";
import AllUsers from "./adminpages/AllUsers";
import { getUserImage } from "../services/userService";

import "../css/adminscreens.css";

const AdminScreens = () => {
  const { username, roles } = useSelector((state) => state.userState);
  const [userImage, setUserImage] = useState(null);
  console.log(username);

  const hrScreens = () => {
    return (
      <>
        <NavLink to="/admin/payroll" className="items">
          Payroll Services
        </NavLink>
        <NavLink to="/admin/training" className="items">
          Training & Development
        </NavLink>
      </>
    );
  };

  useEffect(() => {
    const getUserDetials = async (username) => {
      const respone = await getUserImage(username);
      if (respone.status === 202) {
        console.log(respone);
        let base64ImageDataString = respone.data.image
        let imageUrl = "data:image/png;base64," + base64ImageDataString;
        setUserImage(base64ImageDataString)
      }
    };
    getUserDetials(username);
  }, []);
  return (
    <section className="root-section">
      <div className="left-sidebar">
        <nav className="">
          <div className="list-group list-group-flush mx-3 mt-4">
            <NavLink to="/admin/ems" className="items">
              User Management
            </NavLink>

            {roles.includes("ROLE_HR") ? hrScreens() : null}
            <NavLink to="/admin/service" className="items">
              Services
            </NavLink>
            <NavLink to="/admin/contact" className="items">
              Contact Us
            </NavLink>
            <NavLink to="/admin/change-password" className="items ">
              Change Password
            </NavLink>
            <NavLink to="/admin/logout" className="items ">
              Log Out
            </NavLink>
          </div>
        </nav>
      </div>
      <div className="right-sidebar">
        <div
          style={{ height: "8%", backgroundColor: "lightblue" }}
          className="d-flex justify-content-around align-items-center"
        >
          <h4 style={{ padding: "0", margin: "0" }}>workplace</h4>
          <p style={{ padding: "0", margin: "0" }}>{username}</p>
          {console.log(userImage)}
          {userImage && <img src={`data:image/png;base64,${userImage}`} alt="user-image"/>}
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ height: "5%", backgroundColor: "yellow" }}
        >
          <Link to="ems/create" style={{ textDecoration: "none" }}>
            Create
          </Link>
          <Link to="ems/users/view" style={{ textDecoration: "none" }}>
            View
          </Link>
        </div>
        <Routes>
          <Route path="ems/create" element={<NewUser />} />
          <Route path="contact" element={<Contact />} />
          <Route path="service" element={<Services />} />
          <Route path="ems" element={<EmployeeManagement />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="training" element={<TrainingAndDev />} />
          <Route
            path="change-password"
            element={<ChangePasswordDialogue modalStatus={true} />}
          />
          <Route path="logout" element={<Logout status={true} />} />
          <Route path="ems/users/view" element={<AllUsers />} />
        </Routes>

        <Outlet />
      </div>
    </section>

    // <section>
    //   <div className="left">
    //       <NavLink to="/admin/service" className="items">Services</NavLink>
    //       <NavLink to="/admin/contact" className="items">Contact Us</NavLink>
    //   </div>
    //   <div className="right">
    //   <Routes>
    //       <Route path="create" element={<NewUser />}/>
    //       <Route path="contact" element={<Contact />} />
    //       <Route path="service" element={<Services />} />
    //   </Routes>
    //     <Outlet />
    //   </div>
    // </section>
  );
};

const AdminDashBoard = () => {
  const { state } = useLocation();

  return (
    <div>
      {state != null && state.pwd_upd === 0 && (
        <ChangePasswordDialogue modalStatus={true} />
      )}
      <AdminScreens />
    </div>
  );
};

export default AdminDashBoard;
