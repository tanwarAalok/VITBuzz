import axios from "axios";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const INTIAL_VALUES = {
  name: "",
  email: "",
  gender: "",
  image: "",
  description: "",
};

function FacultyForm() {
  const [body, setBody] = useState(INTIAL_VALUES);
  const [loading, setLoading] = useState(false);

  const updateValues = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/api/faculty", body)
      .then(function (response) {
        alert("Faculty Created");
        setLoading(false);
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={formSubmit}>
      <div className="d-flex">
        <Form.Group className="mb-3 flex-grow-1" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            onChange={updateValues}
          />
        </Form.Group>

        <Form.Group
          className="mb-3 flex-grow-1 ms-5"
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={updateValues}
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Gender</Form.Label>
        <Form.Select name="gender" onChange={updateValues}>
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Image Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image"
          name="image"
          onChange={updateValues}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Description</Form.Label>
        <textarea
          class="form-control"
          placeholder="Write description here"
          name="description"
          onChange={updateValues}
        ></textarea>
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
          "Submit"
        )}
      </Button>
    </Form>
  );
}

export default FacultyForm;
