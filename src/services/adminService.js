import axios from "axios";

export const getUsers = async (pageNo) => {
    try {
      const response = await axios({
        url: "http://localhost:8081/api/auth/users",
        method: "GET",
        params: {
          pageNo: pageNo,
          pageSize: 5
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  export const getTotalCntOfUsers = async () => {
    try {
      const response = await axios({
        url: "http://localhost:8081/api/auth/users/cnt",
        method: "GET",
      });
      return response;
    } catch (error) {
      return error;
    }
  };