import React, { Fragment, useState, useEffect } from "react";
import Pageheader from "../../components/common/pageheader/pageheader";
import EditTestimonial from "./EditOrder";
// import '../org/org.css';
import { ResponsiveTestimonialDataTable } from "./OrderData";
import Alert from "../dashboards/alert/Alert";
import { AppEnv } from "../../../config";

const Order = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [editingData, setEditData] = useState(null);
  const [listData, setListData] = useState([]);

  //get/order
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${AppEnv.baseUrl}/api/orders`, {
          method: "GET",
        });

        const result = await response.json();
        console.log(result, "Fetched orders Data");

        if (result) {
          setListData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (row) => {
    console.log("qqqqqqqqq", row, listData);
    const data = listData.filter((el) => el.id === row.Id);
    setEditingRow(data); // Set the row to be edited

    // try {
    //   const response = await fetch(
    //     `${AppEnv.baseUrl}/admin/products-by-sku/${data[0].sku}`
    //   );
    //   const result = await response.json();
    //   console.log(result, "Filtered Data");

    //   if (result) {
    //     setEditData(result.data);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  const handleCancelEdit = () => {
    setEditingRow(null); // Cancel edit and return to view mode
  };

  const handleCheckboxChange = () => {
    setIsActive(!isActive); // Toggle the checkbox state
  };

  const handleDeleteClick = (row, add) => {
    const deleteData = { row: row, add: add.add };

    setRowToDelete(deleteData);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    // setRowToAdd(row);
    // setIsAlertOpen(true);
    console.log("ddddddddd", rowToDelete);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setRowToDelete(null);
  };

  useEffect(() => {
    if (listData.length > 0) {
      setData(
        listData.map((el) => ({
          Id: el.id,
          AWB: el.waybill,
          "Customer Name": el.name,
          "payment  method": el.transactionType,
          "Order date": el.createdAt?.split("T")[0],
          Status: el.status,
        }))
      );
    }
  }, [listData]);

  console.log("editingRow==>", editingRow);
  return (
    <Fragment>
      <Pageheader currentpage="Order" activepage="Home" mainpage="Order" />

      {editingRow && (
        <div
          className="flex items-center justify-start"
          style={{ marginBottom: "10px" }}
        >
          <label htmlFor="ERP" className="font-medium  mr-[1vw]">
            Refund
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="ERP"
              onChange={(e) =>
                setEditingRow([
                  {
                    ...editingRow[0],
                    status: e.target.checked ? "Closed" : "Success",
                  },
                ])
              }
              checked={editingRow[0]?.status == "Closed" ? true : false}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}

      <div id="a1" className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body space-y-3">
              <div className="overflow-hidden">
                <div
                  id="reactivity-table"
                  className="ti-custom-table ti-striped-table ti-custom-table-hover"
                >
                  {editingRow ? (
                    <EditTestimonial
                      data={editingRow}
                      editData={editingData}
                      onCancel={handleCancelEdit}
                      active={isActive}
                    />
                  ) : (
                    <ResponsiveTestimonialDataTable
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

export default Order;
