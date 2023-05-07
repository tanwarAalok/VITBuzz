import Table from "react-bootstrap/Table";

function ClubTable({ data }) {
  console.log("DATA: ", data);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Club Name</th>
          <th>Club Type</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((club, idx) => (
          <tr key={club._id}>
            <td>{idx + 1}</td>
            <td>{club.name}</td>
            <td>{club.clubType}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClubTable;
