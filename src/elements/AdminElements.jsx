import React from "react";
import {  useSelector } from "react-redux";

const AdminElements = ({ children }) => {
  const { username, roles } = useSelector((state) => state.userState);

  const user = JSON.parse(localStorage.getItem("user"));

  const checkUserRoles = () => {
    function innerFunction(data) {
      const response = data.filter((r) => r === "ROLE_ADMIN");
      if (response !== null && response.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (user) {
      return innerFunction(user.roles);
    } else {
      return innerFunction(roles);
    }
  };

  if (checkUserRoles()) {
    return <>{children}</>;
  } else {
    return (
      <div>
        <h1>You are not auhorized person to access this page...</h1>
      </div>
    );
  }
};

export default AdminElements;
