import React from 'react'
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Spinner/>
    </div>
  );
}

export default Loader;