import React, { Fragment, useState, useEffect } from "react";
import Pageheader from "../../components/common/pageheader/pageheader";
import EditCustomer from "./EditCustomer";
import { ResponsiveCustomerDataTable } from "./Customerdata";
import Alert from "../dashboards/alert/Alert";
import { AppEnv } from "../../../config";

const Customer = () => {
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);
  const [createMessage, setCreateMessage] = useState(null);

  const [data, setData] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const customerApi = async () => {
      try {
        const response = await fetch(`${AppEnv.baseUrl}/user/get-all-user`, {
          method: "POST",
        });
        const result = await response.json();
        console.log(result, "get all users ");

        if (result) {
          // const filteredData =
          //   result?.data?.length &&
          //   result.data.map((item) => ({
          //     Id: item.id,
          //     Name: item.first_name + " " + item.last_name,
          //     Email: item.email,
          //     Phone: item.phone,
          //     CreatedAt: formatDate(item.createdAt),
          //   }));
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    customerApi();
  }, []);

  useEffect(() => {
    if (createMessage == "Customer created successfully") {
      console.log("inside hooks Customer created successfully");

      //customerApi();
      setEditingRow(null);
      setCreateMessage(null);
    }
  }, [createMessage]);

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   fetch(
  //     `${import.meta.env.VITE_URL}/dashboards/branch?isActive=${isActive}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       signal: abortController.signal,
  //     }
  //   )
  //     .then((result) => result.json())
  //     .then((data) => setData(data))
  //     .catch((err) => console.log(err));

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [isActive]);

  const handleEdit = (row) => {
    console.log("row==>", row);
    setEditingRow(row); // Set the row to be edited
  };

  const handleCancelEdit = () => {
    setEditingRow(null); // Cancel edit and return to view mode
    setCreateMessage(null);
  };

  const handleCheckboxChange = () => {
    setIsActive(!isActive); // Toggle the checkbox state
  };

  const handleDeleteClick = (row, add) => {
    console.log("row==>", row, "add", add);

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

    const path = rowToDelete.add ? "add" : "delete";
    // Perform the delete action here, e.g., call an API to delete the row

    fetch(`${import.meta.env.VITE_URL}/branch/${path}`, {
      // fetch(`${AppEnv.baseUrl}/customer/get-customer-detial/${rowToDelete?.row?.Id}`, {
      method: "PUT", // Ensure this is the correct method for your API
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
      // body: JSON.stringify({ CustomerCode: rowToDelete.row.CustomerCode }) // Ensure the payload is correctly formatted
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.success) {
          // Check if the response indicates a successful deletion
          // Remove the row from the data
          setData((prevData) =>
            prevData.filter(
              (item) => item.CustomerCode !== rowToDelete.row.CustomerCode
            )
          );
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
        currentpage="Customer"
        activepage="Master"
        mainpage="Customer"
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
          <div className="box">
            <div className="box-body space-y-3">
              <div className="overflow-hidden">
                <div
                  id="reactivity-table"
                  className="ti-custom-table ti-striped-table ti-custom-table-hover"
                >
                  {editingRow ? (
                    <EditCustomer
                      row={editingRow}
                      onCancel={handleCancelEdit}
                      active={isActive}
                      createMessage={createMessage}
                      setCreateMessage={setCreateMessage}
                    />
                  ) : (
                    <ResponsiveCustomerDataTable
                      data={data}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick} // Pass the delete handler
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

      <Alert
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
        onConfirm={handleConfirmDelete}
      />
    </Fragment>
  );
};

export default Customer;
