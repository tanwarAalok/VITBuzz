import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
// import styles from "@/styles/Verfication.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const VerificationForm = ({ setIsverified }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/api/verify", { name, email })
      .then(function (response) {
          const user = response?.data.data;
          localStorage.setItem("User", JSON.stringify(user));
          console.log("user: ", localStorage.getItem("User"));
          setIsverified(true);
        setLoading(false);
      })
      .catch(function (error) {
        alert(error.response.data.error);
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={formSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          autoFocus
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>VIT Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Verify"
        )}
      </Button>
    </Form>
  );
};

export default VerificationForm;
