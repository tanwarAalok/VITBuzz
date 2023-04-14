import Table from "react-bootstrap/Table";

function FacultyTable({ data }) {
    console.log(data);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((faculty, idx) => (
          <tr key={faculty._id}>
            <td>{idx + 1}</td>
            <td>{faculty.name}</td>
            <td>{faculty.email}</td>
            <td>{faculty.gender}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FacultyTable;
