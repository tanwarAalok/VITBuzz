import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 } from "uuid";
import { STORAGE } from '@/utils/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const INTIAL_VALUES = {
  courseCode: "",
  courseTitle: "",
  facultyName: "",
  paperType: "",
  courseCode: "",
};

function PaperForm() {
  const [body, setBody] = useState(INTIAL_VALUES);
  const [pdfUpload, setPdfUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateValues = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const PDF_URL = useRef();

  const uploadPaper = async () => {
    if (!pdfUpload) return;
    const pdfRef = ref(STORAGE, `papers/${pdfUpload.name + v4()}`);
    await uploadBytes(pdfRef, pdfUpload).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
        PDF_URL.current = url;
      });
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await uploadPaper();
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      return;
    }
    
    await axios
      .post("/api/paper", {...body, link: PDF_URL.current})
      .then(function (res) {
        alert("Paper Uploaded", res.data);
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
          <Form.Label>Course Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course name"
            name="courseTitle"
            onChange={updateValues}
          />
        </Form.Group>

        <Form.Group className="mb-3 flex-grow-1 ms-5" controlId="formBasicName">
          <Form.Label>Faculty Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter faculty name"
            name="facultyName"
            onChange={updateValues}
          />
        </Form.Group>
      </div>

      {/* ******************************************************************************* */}

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
          <Form.Label>Course Slot</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Enter course slot"
            name="courseCode"
            onChange={updateValues}
          />
        </Form.Group>
      </div>

      {/* ******************************************************************************* */}

      <Form.Group className="mb-3 flex-grow-1" controlId="formBasicName">
      <Form.Label>Paper type</Form.Label>
        <Form.Select name="paperType" onChange={updateValues}>
          <option>Select Type</option>
          <option value="Mid Term">Mid-Term</option>
          <option value="Term End">Term-End</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3 flex-grow-1" controlId="formBasicName">
        <Form.Label>Upload Paper</Form.Label>
        <Form.Control
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfUpload(e.target.files[0])}
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
          "Submit"
        )}
      </Button>
    </Form>
  );
}

export default PaperForm;
