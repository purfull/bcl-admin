import React, { Fragment, useState, useEffect } from "react";
import Pageheader from "../../components/common/pageheader/pageheader";
import EditProducts from "./EditProducts";
import { ResponsiveProductsDataTable } from "./Productsdata";
import Alert from "../dashboards/alert/Alert";
import { AppEnv } from "../../../config";

const Products = () => {
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);
  const [listData, setListData] = useState([]);
  const [run, setRun] = useState(true);
  const [isEditMode, setIsEditMode] = useState(null); // state to Close edit mode and return to view mode

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${AppEnv.baseUrl}/product/get-all-product`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        console.log(result, "Filtered Data");

        if (result) {
          setData(result.data);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [run]);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };

  useEffect(() => {
    if (data.length > 0) {
      setListData(
        data.map((el) => ({
          id: el.id,
          category: el.category,
          //name: el.name,
          quantity_available: el.quantity_available,
          Price: el.price,
          "Offer Price": el.offer_price,
          "Created At": el.createdAt.split("T")[0],
        }))
      );
    }
  }, [data]);

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleCancelEdit = () => {
    setEditingRow(null); // Cancel edit and return to view mode
    setRun(!run);
  };

  const handleDataSave = () => {
    setEditingRow(null);
    //setIsEditMode(null); // save  and return to view mode
    setRun(!run);
  };

  const handleCheckboxChange = () => {
    setIsActive(!isActive); // Toggle the checkbox state
  };

  // const handleDeleteClick = (row, add) => {
  //   const deleteData = { row: row, add: add.add };

  //   setRowToDelete(deleteData);
  //   setIsAlertOpen(true);
  // };

  // const handleAddClick = (row) => {
  //   setRowToAdd(row);
  //   setIsAlertOpen(true);
  // };

  // const handleConfirmDelete = () => {
  //   // Create a new AbortController instance
  //   const abortController = new AbortController();
  //   console.log("ddddddddd", rowToDelete);

  //   const path = rowToDelete.add ? "add" : "delete";
  //   // Perform the delete action here, e.g., call an API to delete the row

  //   fetch(`${AppEnv.baseUrl}/admin/products/${rowToDelete.row.id}`, {
  //     method: "DELETE", // Ensure this is the correct method for your API
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     signal: abortController.signal,
  //     body: JSON.stringify({ ProductsCode: rowToDelete.row.ProductsCode }), // Ensure the payload is correctly formatted
  //   })
  //     .then((result) => result.json())
  //     .then((response) => {
  //       if (response.success) {
  //         // Check if the response indicates a successful deletion
  //         // Remove the row from the data
  //         setRun(!run);
  //       } else {
  //         console.error("Failed to delete the row:", response.message);
  //       }
  //       setIsAlertOpen(false); // Close the alert
  //       setRowToDelete(null); // Reset the rowToDelete state
  //     })
  //     .catch((err) => {
  //       console.error("Error:", err);
  //       setIsAlertOpen(false); // Close the alert
  //       setRowToDelete(null); // Reset the rowToDelete state
  //     });
  // };

  // const handleCloseAlert = () => {
  //   setIsAlertOpen(false);
  //   setRowToDelete(null);
  // };

  return (
    <Fragment>
      <Pageheader
        currentpage="Products"
        activepage="Master"
        mainpage="Products"
      />

      <div id="a1" className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          {/* <div className={`${editingRow ? 'hidden' : 'flex'} items-center justify-start mb-[2vh]`}>
            <label htmlFor="B2B" className="font-medium mr-[1vw]">Is Active</label>
            <label className="switch">
              <input 
                type="checkbox" 
                id="B2B" 
                checked={isActive} 
                onChange={handleCheckboxChange} 
              />
              <span className="slider round"></span>
            </label>
          </div> */}
          <div className="box ">
            <div className="box-body space-y-3">
              <div className="overflow-hidden">
                <div
                  id="reactivity-table"
                  className="ti-custom-table ti-striped-table ti-custom-table-hover"
                >
                  {editingRow ? (
                    <EditProducts
                      row={editingRow}
                      onEdit={handleEdit}
                      onSave={handleDataSave}
                      onCancel={handleCancelEdit}
                      active={isActive}
                    />
                  ) : (
                    <ResponsiveProductsDataTable
                      data={listData}
                      onEdit={handleEdit}
                      // onSave={handleDataSave}
                      //onDelete={handleDeleteClick} // Pass the delete handler
                      // onAdd={handleAddClick}
                      active={isActive}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Alert
        isOpen={isAlertOpen}
        onCancel={() => setIsAlertOpen(false)}
        onClose={handleCloseAlert}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      /> */}
    </Fragment>
  );
};

export default Products;
