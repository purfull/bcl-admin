import React, { Fragment, useState, useEffect } from "react";
import Pageheader from "../../components/common/pageheader/pageheader";
import EditDelivery from "./EditDelivery";
import { ResponsiveDeliveryDataTable } from "./Deliverydata";
import Alert from "../dashboards/alert/Alert";
import { AppEnv } from "../../../config";

const Deliveries = () => {
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);
  const [listData, setListData] = useState([]);
  const [run, setRun] = useState(true);
  const [isEditMode, setIsEditMode] = useState(null); // state to Close edit mode and return to view mode

  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           `${AppEnv.baseUrl}/product/get-all-product`,
  //           {
  //             method: "POST",
  //           }
  //         );
  //         const result = await response.json();
  //         console.log(result, "Filtered Data");

  //         if (result) {
  //           setData(result.data);
  //         }
  //       } catch (error) {
  //         console.log("Error fetching data:", error);
  //       }
  //     };
  //     fetchData();
  //   }, [run]);

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
          name: el.name,
          phone: el.phone,
          state: el.state,
          country: el.country,
          "Delivery Area": el.areas,
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

  const handleDeleteClick = (row, add) => {
    const deleteData = { row: row, add: add.add };

    setRowToDelete(deleteData);
    setIsAlertOpen(true);
  };

  // const handleAddClick = (row) => {
  //   setRowToAdd(row);
  //   setIsAlertOpen(true);
  // };

  const handleConfirmDelete = () => {
    // Create a new AbortController instance
    const abortController = new AbortController();
    console.log("ddddddddd", rowToDelete);

    const path = rowToDelete.add ? "add" : "delete";
    // Perform the delete action here, e.g., call an API to delete the row

    fetch(`${AppEnv.baseUrl}/admin/Deliveries/${rowToDelete.row.id}`, {
      method: "DELETE", // Ensure this is the correct method for your API
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
      body: JSON.stringify({ DeliveriesCode: rowToDelete.row.DeliveriesCode }), // Ensure the payload is correctly formatted
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.success) {
          // Check if the response indicates a successful deletion
          // Remove the row from the data
          setRun(!run);
        } else {
          console.error("Failed to delete the row:", response.message);
        }
        setIsAlertOpen(false); // Close the alert
        setRowToDelete(null); // Reset the rowToDelete state
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsAlertOpen(false); // Close the alert
        setRowToDelete(null); // Reset the rowToDelete state
      });
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setRowToDelete(null);
  };

  return (
    <Fragment>
      <Pageheader
        currentpage="Delivery"
        activepage="Master"
        mainpage="Delivery"
      />

      <div id="a1" className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box ">
            <div className="box-body space-y-3">
              <div className="overflow-hidden">
                <div
                  id="reactivity-table"
                  className="ti-custom-table ti-striped-table ti-custom-table-hover"
                >
                  {editingRow ? (
                    <EditDelivery
                      row={editingRow}
                      onEdit={handleEdit}
                      onSave={handleDataSave}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <ResponsiveDeliveryDataTable
                      data={listData}
                      onEdit={handleEdit}
                      // onSave={handleDataSave}
                      onDelete={handleDeleteClick} // Pass the delete handler
                      // onAdd={handleAddClick}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Alert
        isOpen={isAlertOpen}
        onCancel={() => setIsAlertOpen(false)}
        onClose={handleCloseAlert}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />
    </Fragment>
  );
};

export default Deliveries;
