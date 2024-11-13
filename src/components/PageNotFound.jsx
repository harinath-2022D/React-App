import React from "react";

const PageNotFound = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center flex-column align-items-center"
    >
      <div className="w-25">
        <h3 style={{ color: "red" }}>404 This page not found</h3>
      </div>
      <div className="w-25">
        <img src="https://i.imgur.com/qIufhof.png" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default PageNotFound;
