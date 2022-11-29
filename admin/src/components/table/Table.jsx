import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./table.scss";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "./../../hooks/axios";
import formatter from "./../../hooks/formatter";
import { toast } from "react-toastify";
const List = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/checkouts");
      console.log(data);
      setCheckouts(data);
    };
    fetchData();
  }, [refresh]);

  const handleCheckout = async (id) => {
    try {
      await axios.patch(`/checkouts/${id}`, {
        isPaid: true,
      });
      toast.success("Confirm Checkout Success");
      setRefresh(!refresh);
    } catch (error) {
      console.log("Confirm Checkout Fail");
    }
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Delivery Address</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkouts.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{`${row._id.slice(
                0,
                10
              )}...`}</TableCell>
              <TableCell className="tableCell">{`${row.user.slice(
                0,
                10
              )}...`}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {`${row.deliveryAddress.address}, ${row.deliveryAddress.ward}, ${row.deliveryAddress.distinct}, ${row.deliveryAddress.province}`}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {formatter.format(new Date(row.createdAt.substring(0, 10)))}
              </TableCell>
              <TableCell className="tableCell">${row.totalCost}</TableCell>
              <TableCell className="tableCell">{row.paymentMethod}</TableCell>
              <TableCell className="tableCell">
                <span
                  className={`status ${row.isPaid ? "Approved" : "Pending"}`}
                >
                  {row.isPaid ? "Approved" : "Pending"}
                </span>
              </TableCell>
              <TableCell className="tableCell">
                <Button variant="light" onClick={() => handleCheckout(row._id)}>
                  <i class="fa-regular fa-money-bill-1 money"></i>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const res = await axios.get("/products");
  //       const myArr = res.data.map((item) => {
  //         return {
  //           id: item._id,
  //           name: item.name,
  //           color: item.color,
  //           size: item.size.join(", "),
  //           price: item.price,
  //           description: item.description,
  //           imgPath: item.imgPath,
  //         };
  //       });
  //       setData(myArr);
  //     };
  //     fetchData();
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/products/${id}`);
  //     alert("Delete product successfully");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           <Link
  //             to={`/dashboard/products/edit/${params.row.id}`}
  //             style={{ textDecoration: "none" }}
  //           >
  //             <div className="viewButton">Edit</div>
  //           </Link>
  //           <div
  //             className="deleteButton"
  //             onClick={() => handleDelete(params.row.id)}
  //           >
  //             Delete
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  // return (
  //   <div className="datatable">
  //     <div className="datatableTitle">
  //       Products
  //       <Link to="/dashboard/products/new" className="link">
  //         Add New
  //       </Link>
  //     </div>
  //     {data && (
  //       <DataGrid
  //         className="datagrid"
  //         rows={data}
  //         columns={productColumns.concat(actionColumn)}
  //         pageSize={9}
  //         rowsPerPageOptions={[9]}
  //         // checkboxSelection
  //       />
  //     )}
  //   </div>
  // );
};

export default List;
