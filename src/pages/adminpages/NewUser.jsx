import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "antd";
import { getRoles, saveNewUser } from "../../services/userService";

import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const tosterStyles = {
  position: "top-right",
  duration: 2000,
};

const NewUser = () => {
  //   const roles = ["USER", "ADMIN", "HR"];
  const [roles, setRoles] = useState([]);
  //   let roles = [];
  const [isLoading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  const navigation = useNavigate();

  const email = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);
  const userImage = useRef(null);
  let currUserRoles = [];

  const handleRoles = (userRoles) => {
    currUserRoles = userRoles;
  };

  const validateEmail = (mail) => {
    const EMAIL_REGEX = /[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-z]{3}$/;
    return EMAIL_REGEX.test(mail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail(email.current.value);
    console.log(`submitting data`);
    // console.log(`email `, email, `firstName `, firstName, `lastName `, lastName, `roles `, currUserRoles);
    let user = {
      email: email.current.value,
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      roles: currUserRoles,
      image: file
    };
    if (validateEmail(email.current.value)) {
      setLoading(true);
      const response = await saveNewUser(user);
      console.log(`response is`, response);
      if (response.status === 201) {
        console.log(`user created`);
        toast.success("User Created Successfully", { ...tosterStyles });
        setLoading(false);
      } else {
        console.log(`user creation failed`);
        toast.error("User Creation Failed", { ...tosterStyles });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    async function getResponse() {
      try {
        const response = await getRoles();
        if (response.status === 202) {
          setRoles(response.data);
          //   roles = response.data;
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    }

    getResponse();
  }, []);

  const handleFileUpload =  (e) => {
    const file = e.target.files[0];
    console.log(file)
   
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    setFile(file)
  };
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <>
      {isLoading === false ? (
        
        <div className="w-50 m-auto main-user-registration">
                <div>
        <Toaster />
      </div>
          <div className="text-center m-4">
            <h4>New User Creation Form</h4>
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="form-group d-flex justify-content-between my-3">
              <label htmlFor="email-id">Email</label>
              <input
                name="email-id"
                type="text"
                placeholder="enter email"
                className="form-control"
                style={{ width: "80%" }}
                ref={email}
              />
            </div>
            <div className="form-group d-flex justify-content-between my-3">
              <label htmlFor="first-name">First Name</label>
              <input
                name="first-name"
                type="text"
                placeholder="enter first name"
                className="form-control"
                style={{ width: "80%" }}
                ref={firstname}
              />
            </div>
            <div className="form-group d-flex justify-content-between my-3">
              <label htmlFor="last-name">Last Name</label>
              <input
                name="last-name"
                type="text"
                placeholder="enter last name"
                className="form-control"
                style={{ width: "80%" }}
                ref={lastname}
              />
            </div>
            <div className="form-group d-flex justify-content-between" >
            <div className="form-group d-flex justify-content-between w-100">
              <label htmlFor="user-image">Upload Photo</label>
              <input type="file" name="user-image" accept=".png" onChange={(e) => handleFileUpload(e)}/>
              </div>
              {selectedImage && (
              <div>
                <img src={selectedImage} alt="Selected" style={{ maxWidth: '50%', maxHeight: '50%' }} />
              </div>
               )}
            </div>
            <div className="form-group d-flex justify-content-between my-3">
              <label htmlFor="role">Roles</label>
              {/* <input name='role' type='text' placeholder='enter user email' className='form-control' style={{width: "80%"}} /> */}
              <Checkbox.Group options={roles} onChange={handleRoles} />
            </div>
            <div className="d-flex d-flex justify-content-center">
              <button
                className="btn btn-danger mx-3"
                onClick={() => navigation(-1)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary mx-3">
                Create User
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Spin
          size="large"
          style={{ width: "100%", height: "100%", marginTop: "15%" }}
        />
      )}
    </>
  );
};

export default NewUser;
