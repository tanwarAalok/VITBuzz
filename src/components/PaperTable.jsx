import { DeleteIcon, EditIcon } from "@/utils/Icons";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function PaperTable({ data, setUpdate }) {
  const [loading, setLoading] = useState(null);

  const handleStatus = async (paperId, status) => {
    setLoading(paperId);
    await axios
      .patch(`/api/paper?id=${paperId}`, { approved: !status })
      .then(function (res) {
        setLoading(null);
        setUpdate(true);
      })
      .catch(function (error) {
        alert("Something went wrong");
        console.log(error);
        setLoading(null);
      });
  };

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Faculty Name</th>
          <th>Course Name</th>
          <th>Paper Type</th>
          <th>PDF</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((paper, idx) => (
          <tr key={paper._id}>
            <td>{idx + 1}</td>
            <td>{paper.facultyName}</td>
            <td>{paper.courseTitle}</td>
            <td>{paper.paperType}</td>
            <td>
              <object
                type="application/pdf"
                data={paper.link}
                width="250"
                height="200"
              ></object>
            </td>
            <td>
              <button
                disabled={loading}
                onClick={() => handleStatus(paper._id, paper.approved)}
                className={`btn ${
                  paper.approved ? "btn-success" : "btn-primary"
                }`}
              >
                {loading === paper._id ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : paper.approved ? (
                  "Approved"
                ) : (
                  "Pending"
                )}
              </button>
            </td>
            <td>
              <DeleteIcon style={{ cursor: "pointer", marginRight: "20px" }} />
              <EditIcon style={{ cursor: "pointer" }} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PaperTable;
