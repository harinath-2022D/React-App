import React, { useRef, useState } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import {
  forgotpassword,
  otpCheck,
  updatePassword,
} from "../services/userService";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const tosterStyles = {
  position: "top-right",
  duration: 2000,
};

const ForgotPassword = () => {
  //   let operationType = "username-check";
  const {username, roles} = useSelector(state => state.userState)
  const email = useRef("");
  const newPassword = useRef("");
  const otp = useRef(0);

  const navigate = useNavigate();

  const [isValidUsername, setValidUsername] = useState(false);
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [operationType, setOpertionType] = useState("username-check");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event, operation) => {
    event.preventDefault();
    if (operation === "username-check") {
      console.log(email.current.value);
      setLoading(true)
      const response = await forgotpassword(email.current.value);
      if (response.status === 202) {
        console.log(response);
        setLoading(false)
        toast.success("An OTP sent to your email", { ...tosterStyles });
        setOpertionType("otp-check");
        setValidUsername(true);
      } else {
        toast.error("please provide valid email", { ...tosterStyles });
        setValidUsername(false);
        setLoading(false)
      }
    } else if (operationType === "otp-check") {
      const response = await otpCheck(email.current.value, otp.current.value);
      //   const response = { status: 202 };
      console.log(response);
      if (response.status === 202) {
        console.log(response);
        toast.success("OTP verified", { ...tosterStyles });
        setIsValidOtp(true);
        setOpertionType("updatingPassword");
      } else {
        toast.error("please check your email for otp", { ...tosterStyles });
        setIsValidOtp(false);
        setOpertionType("otp-check");
      }
    } else {
      console.log(`final submit`);
      const response = await updatePassword(
        email.current.value,
        newPassword.current.value
      );
      //   const response = { status: 202 };

      if (response.status === 202) {
        toast.success("password Updated", { ...tosterStyles });
        setTimeout(()=>{navigate("/")},500)
      } else {
        toast.error("password updation failed", { ...tosterStyles });
      }
    }
  };

  const [errors, setErrors] = useState([
    { minLength: false },
    { minNum: false },
    { capitalLetter: false },
    { specialChar: false },
  ]);

  const validatePassword = (pass) => {
    let errorsArr = [];
    pass.length >= 8 ? (errorsArr[0] = true) : (errorsArr[0] = false);
    /\d/.test(pass) ? (errorsArr[1] = true) : (errorsArr[1] = false);
    /[A-Z]/.test(pass) ? (errorsArr[2] = true) : (errorsArr[2] = false);
    /[^A-Za-z0-9]/.test(pass) ? (errorsArr[3] = true) : (errorsArr[3] = false);

    setErrors([
      //   ...errors,
      { minLength: errorsArr[0] },
      { minNum: errorsArr[1] },
      { capitalLetter: errorsArr[2] },
      { specialChar: errorsArr[3] },
    ]);
  };

  function makeSingleErrorSet() {
    const set = new Set();
    errors.map((obj) => {
      for (let key in obj) {
        if (obj[key] === false) set.add(key);
      }
    });
    return Array.from(set);
  }

  let actualErrors = makeSingleErrorSet();

  //   function setOpertionType(type) {
  //     operationType = type;
  //     return true;
  //   }

  return (
    <div className="container mt-5 w-50">
      <div>
        <Toaster />
      </div>
      {isLoading && <Spin
          size="large"
          style={{ width: "100%", height: "100%", marginTop: "15%" }}
        />}
      <h3 className="text-center mb-5">Forgot password</h3>
      <p
        style={{ color: "red", display: "none" }}
        className="text-center"
        id="err"
      >
        invalid credentials
      </p>
      <form>
        <div className="form-group d-flex">
          <label htmlFor="exampleInputEmail1" className="w-25">
            Username :
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="username"
            // value={username || username !== ""  ? username : "" }
            ref={email}
            disabled= {username || username !== "" ? true : false}
          />
        </div>
        {isValidUsername && (
          <div className="form-group mt-3 d-flex">
            <label htmlFor="otp" className="w-25">
              OTP :
            </label>
            <input
              type="text"
              placeholder="Enter your OTP"
              className="form-control"
              name="otp"
              ref={otp}
            />
          </div>
        )}

        {isValidOtp && (
          <div className="form-group mt-3 d-flex">
            <label htmlFor="new-password" className="w-25">
              New Password :
            </label>
            <input
              type="text"
              placeholder="Enter your new password"
              className="form-control"
              name="new-password"
              ref={newPassword}
              onChange={() => validatePassword(newPassword.current.value)}
            />
          </div>
        )}

        {isValidOtp &&
          actualErrors.map((val) => {
            if (val === "minLength") {
              return (
                <p style={{ color: "red" }}>
                  * minimum length should be 8 characters
                </p>
              );
            } else if (val === "minNum") {
              return (
                <p style={{ color: "red" }}>* at least one number required</p>
              );
            } else if (val === "capitalLetter") {
              return (
                <p style={{ color: "red" }}>
                  * at least one capital letter required
                </p>
              );
            } else {
              return (
                <p style={{ color: "red" }}>
                  * at least one special character required
                </p>
              );
            }
          })}

        <div className="mt-3 text-center">
          <button
            onClick={(e) => handleSubmit(e, operationType)}
            className="btn btn-primary"
            disabled={operationType === "updatingPassword" && actualErrors.length > 0 ? true : false}
          >
            {!isValidUsername ? "Get OTP" : "NEXT"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
