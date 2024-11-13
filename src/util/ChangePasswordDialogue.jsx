import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { updatePassword } from "../services/userService";
import { useSelector } from "react-redux";

import toast, { Toaster } from "react-hot-toast";

const tosterStyles = {
  position: "top-right",
  duration: 2000,
};

const ChangePasswordDialogue = ({ modalStatus }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(modalStatus);
  const { username } = useSelector((state) => state.userState);

  const newPassword = useRef("");
  const confirmPassword = useRef("");

  const showModal = () => {
    setOpen(true);
  };
  const handleSubmit = async () => {
    if (handleInput()) {
      setLoading(true);
      const response = await updatePassword(
        username,
        confirmPassword.current.value
      );
      if (response.status == 202) {
        console.log(response.data);
        // navigate("/user");
        setLoading(false);
        setOpen(false);
        toast.success("password updated successfully", { ...tosterStyles });
      }
    } else {
      console.log(`error beacuse password mismatch`);
      toast.error("password updation failed", { ...tosterStyles });
    }
  };

  const handleInput = () => {
    // e.preventDefault();
    if (newPassword.current.value !== confirmPassword.current.value) {
      document.getElementById("err").style.visibility = "visible";
      return false;
    } else {
      document.getElementById("err").style.visibility = "hidden";
      return true;
    }
  };
  const handleCancel = () => {
    setOpen(false);
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
  return (
    <>
      <Modal
        open={open}
        title="Update your password"
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="new-pwd">New password</label>
            <input
              name="new-pwd"
              ref={newPassword}
              style={{ marginLeft: "25px" }}
              onChange={() => validatePassword(newPassword.current.value)}
            />
          </div>
          {actualErrors.map((val) => {
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
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="confirm-pwd">Confirm password</label>
            <input
              name="confirm-pwd"
              ref={confirmPassword}
              onChange={handleInput}
              style={{ marginLeft: "5px" }}
            />
            <span
              id="err"
              style={{
                display: "block",
                textAlign: "center",
                color: "red",
                visibility: "hidden",
              }}
            >
              * password mismatch
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ChangePasswordDialogue;
