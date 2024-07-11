// import React, { useEffect, useState } from "react";
// import List from "../../../components/List/List";
// import "./CustomerList.scss";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BASE_URL } from "../../../utils/config";
// import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
// import Loader from "../../../components/Loader/Loader";

// const CustomerList = () => {
//   const headers = ["Name", "Mobile No", "Address", "Category", "Status"];
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await adminRequest.post(`${BASE_URL}/customer/get`, {
//           firstRow: 1,
//           pageSize: 3,
//         });
//         const fetchedRows = response.data.data.records.map((vendor) => [
//           vendor.name,
//           vendor.phoneNumber,
//           vendor.address,
//           vendor.category.name,
//           vendor.status.name,
//         ]);
//         setRows(fetchedRows);
//       } catch (error) {
//         toast.error(error.message || "Failed to fetch data");
//       }
//     };
//     fetchData();
//   }, []);

//   updateAuthToken();

//   const getMenuItems = (row) => [
//     { link: `view/${row[1]}`, text: "View" },
//     { link: `delete/${row[1]}`, text: "Delete" },
//     { link: `block/${row[1]}`, text: "Block" },
//     { link: `reset-password/${row[1]}`, text: "Reset Password" },
//   ];

//   return (
//     <div className="customerListContainer">
//       {rows.length > 0 ? (
//         <List
//           title="Vendors List"
//           createButtonLabel="Create Vendor"
//           headers={headers}
//           rows={rows}
//           link="create"
//           showEyeViewIcon={true}
//           showFilterIcon={true}
//           getMenuItems={getMenuItems}
//         />
//       ) : (
//         <Loader />
//       )}
//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default CustomerList;
