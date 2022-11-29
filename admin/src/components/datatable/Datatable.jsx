import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { userColumns } from "../../datatablesource";
import axios from "./../../hooks/axios";
import "./datatable.scss";
const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/users");
        const myArr = res.data.map((item) => {
          return {
            id: item._id,
            name: item.name,
            address: item.address.replaceAll("%", ", "),
            avatar: item.avatar,
            email: item.email,
          };
        });
        setData(myArr);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      alert("Delete user successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">User</div>
      {data && (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      )}
    </div>
  );
};

export default Datatable;
