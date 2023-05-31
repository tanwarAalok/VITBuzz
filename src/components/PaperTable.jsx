import { DeleteIcon, EditIcon } from "@/utils/Icons";
import Table from "react-bootstrap/Table";

function PaperTable({ data }) {
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
                className={`btn ${
                  paper.approved ? "btn-success" : "btn-primary"
                }`}
              >
                {paper.approved ? "Approved" : "Pending"}
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
