import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import EditTestimonial from './EditOrder';
// import '../org/org.css';
import { ResponsiveTestimonialDataTable } from "./OrderData";
import Alert from '../dashboards/alert/Alert';
import { AppEnv } from '../../../config';

const Order = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);
  // const [listData, setListData] = useState([]);


  const [listData, setListData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${AppEnv.baseUrl}/order/get-all-orders`);
            const result = await response.json();
            console.log(result , "Filtered Data");

            if (result) {

              // console.log(result , "kkkkkkkkkkkkkkkkkkkkkk")
              //   const filteredData = result.map(item => ({
              //       Product_name: item.product_name,
              //       Logo: item.marketing_defaultImage_content,
              //       Type: item.type,
              //       Price: item.amount,
              //       CreatedAt: formatDate(item.createdAt),
              //     }));
              //   setData(filteredData);
              setListData(result.data);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

  

  const handleEdit = (row) => {
    console.log("qqqqqqqqq",row, listData);
    const data = listData.filter(el => el.id === row.Id);
    setEditingRow(data); // Set the row to be edited
  };

  const handleCancelEdit = () => {
    setEditingRow(null); // Cancel edit and return to view mode
  };

  const handleCheckboxChange = () => {
    setIsActive(!isActive); // Toggle the checkbox state
  };

  const handleDeleteClick = (row, add) => {
    const deleteData = {row : row, add : add.add}
    
    setRowToDelete(deleteData);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    // setRowToAdd(row);
    // setIsAlertOpen(true);
  };


  


  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setRowToDelete(null);
  };

  useEffect(() => {
    if (listData.length > 0) {
      setData(listData.map(el => ({
        Id: el.id,
        "AWB": el.waybill,
        "Customer Name": el.name,
        "payment  method": el.transactionType,
        "Order date": el.createdAt?.split("T")[0],
        
      })));
    }
  }, [listData]);

  
  return (
    <Fragment>
      <Pageheader currentpage="Order" activepage="Home" mainpage="Order" />


      <div id="a1" className="grid grid-cols-12 gap-6">
        <div className="col-span-12">

          <div className="box">
            <div className="box-body space-y-3">
              
              <div className="overflow-hidden">
                <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                
                  {editingRow ? (
                    <EditTestimonial 
                      data={editingRow} 
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
