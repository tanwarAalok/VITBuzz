import { DeleteIcon, EditIcon } from "@/utils/Icons";
import Image from "next/image";
import Table from "react-bootstrap/Table";

function FacultyTable({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((faculty, idx) => (
          <tr key={faculty._id}>
            <td>{idx + 1}</td>
            <td>
              <Image
                className="rounded-circle"
                src={faculty.image}
                width={50}
                height={50}
                alt="image"
              />
            </td>
            <td>{faculty.name}</td>
            <td>{faculty.email}</td>
            <td>{faculty.gender}</td>
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

export default FacultyTable;
