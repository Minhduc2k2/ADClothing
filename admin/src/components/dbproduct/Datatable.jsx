import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productColumns } from "../../datatablesource";
import axios from "./../../hooks/axios";
import "./datatable.scss";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/products");
        const myArr = res.data.map((item) => {
          return {
            id: item._id,
            name: item.name,
            color: item.color,
            size: item.size.join(", "),
            price: item.price,
            description: item.description,
            imgPath: item.imgPath,
          };
        });
        setData(myArr);
      };
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      alert("Delete product successfully");
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
            <Link
              to={`/dashboard/products/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
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
      <div className="datatableTitle">
        Products
        <Link to="/dashboard/products/new" className="link">
          Add New
        </Link>
      </div>
      {data && (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={productColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      )}
    </div>
  );
};

export default Datatable;
