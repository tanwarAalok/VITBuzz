import Image from "next/image";
import Table from "react-bootstrap/Table";
import { DeleteIcon, EditIcon } from '@/utils/Icons';

function ClubTable({ data }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Logo</th>
          <th>Club Name</th>
          <th>Club Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((club, idx) => (
          <tr key={club._id}>
            <td>{idx + 1}</td>
            <td>
              <Image
                className="rounded-circle"
                src={club.image}
                width={50}
                height={50}
                alt="clubLogo"
              />
            </td>
            <td>{club.name}</td>
            <td>{club.clubType}</td>
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

export default ClubTable;
