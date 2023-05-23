import React from 'react'

const SomethingWentWrong = ({ error }) => {
  return (
    <div
      style={{ height: "calc(100vh - 70px", marginTop: "70px" }}
      className="d-flex align-items-center justify-content-center"
    >
      <h2>Something went Wrong !</h2>
      <p>{error}</p>
    </div>
  );
};

export default SomethingWentWrong;