import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Logout = ({ status }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLogOut, setLogout] = useState(false);
  const navigate = useNavigate();

  if (user) {
    localStorage.removeItem("user");
    setLogout(status);
  }

  useEffect(() => {
    navigate("/");
  }, [isLogOut]);
  return <div></div>;
};

export default Logout;
