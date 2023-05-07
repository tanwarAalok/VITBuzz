import axios from "axios";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const INTIAL_VALUES = {
  courseCode: "",
  faculty: "",
  paperType: "",
  link: "",
};

function PaperForm() {
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
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course code"
            name="courseCode"
            onChange={updateValues}
          />
        </Form.Group>

        <Form.Group className="mb-3 flex-grow-1 ms-5" controlId="formBasicName">
          <Form.Label>Faculty</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter faculty name"
            name="faculty"
            onChange={updateValues}
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3 flex-grow-1 " controlId="formBasicName">
        <Form.Label>Paper type</Form.Label>
        <Form.Select name="type" onChange={updateValues}>
          <option>Select Type</option>
          <option value="Tech">Mid-term</option>
          <option value="Non-tech">Term-End</option>
        </Form.Select>
      </Form.Group>
      
      <Form.Group className="mb-3 flex-grow-1" controlId="formBasicName">
        <Form.Label>Upload Paper</Form.Label>
        <Form.Control type="file" name="paper" onChange={updateValues} />
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

export default PaperForm;
