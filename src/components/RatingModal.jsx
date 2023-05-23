import React from "react";
import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import ReactStars from "react-stars";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";


const RatingModal = ({ show, handleClose, setUpdate }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [behaviourRating, setBehaviourRating] = useState(0);
  const [paperRating, setPaperRating] = useState(0);
  const [teachingRating, setTeachingRating] = useState(0);
  const [comment, setComment] = useState("");
  const { query } = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      paperRating,
      behaviourRating,
      teachingRating,
      userData: session.user,
      facultyId: query.id,
      comment,
    };

    setLoading(true);
    await axios
      .post("/api/review", body)
      .then(function (response) {
        alert(response.data.message);
        setLoading(false);
        setUpdate(true);
      })
      .catch(function (error) {
        alert(error.response.data.error.explanation);
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rate Faculty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group
            className="mb-3 d-flex align-items-center justify-content-between"
            controlId="formBasicEmail"
          >
            <Form.Label className="mt-3">Behaviour Rating</Form.Label>
            <ReactStars
              count={5}
              value={behaviourRating}
              onChange={(newRating) => setBehaviourRating(newRating)}
              isHalf={true}
              edit={true}
              size={36}
              activeColor={"#ffd700"}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex align-items-center justify-content-between"
            controlId="formBasicEmail"
          >
            <Form.Label className="mt-3">Exam Rating</Form.Label>
            <ReactStars
              count={5}
              value={paperRating}
              onChange={(newRating) => setPaperRating(newRating)}
              isHalf={true}
              edit={true}
              size={36}
              activeColor={"#ffd700"}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex align-items-center justify-content-between"
            controlId="formBasicEmail"
          >
            <Form.Label className="mt-3">Teaching Rating</Form.Label>
            <ReactStars
              count={5}
              value={teachingRating}
              onChange={(newRating) => setTeachingRating(newRating)}
              isHalf={true}
              edit={true}
              size={36}
              activeColor={"#ffd700"}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Leave a comment..."
              onChange={(e) => setComment(e.target.value)}
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
      </Modal.Body>
    </Modal>
  );
};

export default RatingModal;
