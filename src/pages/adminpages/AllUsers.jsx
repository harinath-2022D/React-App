import React, { useEffect, useState } from "react";
import { Pagination, Space, Table, Tag, Button } from "antd";
import { getUsers, getTotalCntOfUsers } from "../../services/adminService";

import { TiUserDelete } from "react-icons/ti";
import { BsPencilSquare } from "react-icons/bs";

import "../../css/allUsers.css";

const AllUsers = () => {
  const [pageNo, setPageNo] = useState(1);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const columns = [
    {
        title: "S.NO",
        dataIndex: "key",
        key: "key",
        render: (text) => text,
      },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      render: (text) => text,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text,
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = "green";
            if (role === "ADMIN") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "accountStatus",
      render: (tags) => <>{tags === true ? "ACTIVE" : "INACTIVE"}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsPencilSquare id="update-icon" />
          <TiUserDelete id="delete-icon" />
        </Space>
      ),
    },
  ];

  const assignSerialNum = (info) => {
    let key = (pageNo * 5) - 5;
    let result = [];
    for (let i = 0; i < info.length; i++) {
      let obj = info[i];
      obj.name = obj.firstname + ' '+  obj.lastname
      obj.key = ++key;
      result.push(obj);
    }

    return result;
  };

  useEffect(() => {
    const getTotalUsers = async () => {
      const respone = await getTotalCntOfUsers();
      if (respone.status == 202) {
        setTotalPages(respone.data);
      } else {
        console.log(`error occured while fetching users count`);
      }
    };

    getTotalUsers();
  }, []);

  useEffect(() => {
    const getUsersDate = async (pageNo) => {
      const response = await getUsers(pageNo);
      if (response.status === 202) {
        console.log(response)
        const resultArr = assignSerialNum(response.data);
        setData(resultArr);
        setDataLoaded(true);
      } else {
        console.log(`error in use effect`);
        setData([]);
        setDataLoaded(false);
      }
    };
    getUsersDate(pageNo);
  }, [pageNo]);

  const handlePageNum = (page) => {
    setPageNo(page);
  };

  return (
    <div style={{ height: "87%" }} className="outer-container">

      <div className="overflow-auto table-container">
        {isDataLoaded && (
          <Table columns={columns} dataSource={data} pagination={false} className="table-display"/>
        )}
      </div>

      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          total={totalPages}
          defaultPageSize={5}
          onChange={handlePageNum}
        />
      </div>
    </div>
  );
};

export default AllUsers;
