import { DeleteIcon, EditIcon } from "@/utils/Icons";
import Image from "next/image";
import Table from "react-bootstrap/Table";

function UserTable({ data }) {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((user, idx) => (
                <tr key={user._id}>
                    <td>{idx + 1}</td>
                    <td>
                        <Image
                            className="rounded-circle"
                            src={user.image}
                            width={50}
                            height={50}
                            alt="image"
                        />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
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

export default UserTable;
