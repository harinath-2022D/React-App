import axios from "axios";
import { redirect } from "react-router-dom";

export const loginService = async (username, password) => {
  try {
    const response = await axios({
      url: "http://localhost:8081/api/auth/login",
      method: "POST",
      data: { username, password },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const checkEmail = async (username) => {
  try {
    const response = await axios({
      url: "http://localhost:8081/api/auth/user",
      method: "GET",
      params: {
        email: username,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePassword = async (username, password) => {
  try {
    const response = await axios({
      url: "http://localhost:8081/api/auth/user/update_pwd",
      method: "PUT",
      data: {
        username,
        password,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getRoles = async () => {
  try {
    const response = await axios({
      url: "http://localhost:8081/api/auth/roles",
      method: "GET",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const saveNewUser = async (user) => {
  try {
    console.log(`user object : `, user);
    const response = await axios({
      url: "http://localhost:8081/api/auth/user/save",
      method: "POST",
      data: user,
      headers: {
        'Content-Type': 'multipart/form-data'
    }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const forgotpassword = async (email) => {
  try {
    const response = await axios({
      url: "http://localhost:8081/api/auth/user/forgot",
      method: "GET",
      params: {
        email: email,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const otpCheck = async (email, otp) => {
  try {
    const response = await axios({
      url: "http://localhost:8081/api/auth/user/forgot/otp-check",
      method: "GET",
      params: {
        email: email,
        otp: otp,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserImage = async (username) => {
  try {
    const response = await axios({
      url: "http://localhost:8081/api/auth/user/image",
      method: "GET",
      params: {
        email: username,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
