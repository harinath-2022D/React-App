import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { checkEmail } from "../services/userService";
import { useDispatch } from "react-redux";
import { userInformation } from "../store/userSlice";

import { QuestionOutlined } from "@ant-design/icons";

import Logo from "../assets/Zettamine-Logo.png"
import HomeScale from "../assets/Home-scaled.webp"

import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;

  const [isValidUser, setValidUser] = useState(false)

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const rolesArr = user.roles;
      const status = user.loginStatus;
      navigateToUserDashBoard(rolesArr, status);
    } else {
      console.log(`user is not availble in localstorage`);
    }
  }, []);

  useEffect(() => {
    const userFind = async () => {
      const response = await checkEmail(username);
      // console.log(response);
      if (response.status !== 202) {
        document.getElementById("user-email").style.display = "block";
        setValidUser(false)
      } else {
        document.getElementById("user-email").style.display = "none";
        setValidUser(true)
      }
    };

    if (username !== "") {
      userFind();
    }
  }, [user.username]);

  const navigateToUserDashBoard = (arr, status) => {
    if (arr.includes("ROLE_ADMIN")) {
      navigate("/admin", {
        state: { pwd_upd: status },
      });
      console.log(`redirect to admin page`);
    } else if (arr.includes("ROLE_USER")) {
      navigate("/user", {
        state: { pwd_upd: status },
      });
      console.log(`redirect to user page`);
    } else if (arr.includes("ROLE_HR")) {
      navigate("/hr", {
        state: { pwd_upd: status },
      });
      console.log("redirecting to hr portal");
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(userInformation({ username, password }));
      console.log(response);
      if (response.payload.status === 202) {
        const arr = response.payload.data.roles;
        const status = response.payload.data.loginStatus; // extra line added
        localStorage.setItem("user", JSON.stringify(response.payload.data))
        navigateToUserDashBoard(arr, status); // extra line added
        // if (arr.includes("ROLE_ADMIN")) {
        //   navigate("/admin", {
        //     state: { pwd_upd: response.payload.data.loginStatus },
        //   });
        //   console.log(`redirect to admin page`);
        // } else if (arr.includes("ROLE_USER")) {
        //   navigate("/user", {
        //     state: { pwd_upd: response.payload.data.loginStatus },
        //   });
        //   console.log(`redirect to user page`);
        // } else if (arr.includes("ROLE_HR")) {
        //   navigate("/hr", {
        //     state: { pwd_upd: response.payload.data.loginStatus },
        //   });
        //   console.log("redirecting to hr portal");
        // }
      } else if (response.payload.response.status === 401) {
        document.getElementById("acc-block").style.display = "block";
        document.getElementById("err").style.display = "none";
      } else {
        document.getElementById("err").style.display = "block";
        document.getElementById("acc-block").style.display = "none";
      }
    } catch (error) {
      // document.getElementById("err").style.display = "block";
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>

    <div className="container mt-5 w-50">
      <h3 className="text-center mb-5">Login here...</h3>
      <p
        style={{ color: "red", display: "none" }}
        className="text-center"
        id="err"
      >
        invalid credentials
      </p>
      <p
        style={{ color: "red", display: "none" }}
        className="text-center"
        id="acc-block"
      >
        Your account is blocked...
      </p>
      <form onSubmit={onSubmit}>
        <div className="form-group d-flex">
          <label htmlFor="exampleInputEmail1" className="w-25">
            Username :
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="username"
            value={user.username}
            onChange={handleInput}
            // onBlur={handleInput}
          />
        </div>
        <span
          style={{ color: "red", display: "none" }}
          className="text-center"
          id="user-email"
        >
          * Couldn't find your account{" "}
        </span>
        <div className="form-group mt-3 d-flex">
          <label htmlFor="exampleInputPassword1" className="w-25">
            Password :
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleInput}
          />
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
            Forgot password <QuestionOutlined />
          </Link>
        </div>
        <div className="mt-3 text-center">
          <button type="submit" className="btn btn-primary" disabled={isValidUser ? false : true}>
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
