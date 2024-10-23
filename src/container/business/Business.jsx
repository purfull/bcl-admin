import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from "../../components/common/pageheader/pageheader";
import EditBusiness from './EditBusiness';
// import '../org/org.css';
import { ResponsiveBusinessDataTable } from "./BusinessData";
import Alert from '../dashboards/alert/Alert';

const Business = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);
  // const [listData, setListData] = useState([]);


  const [listData, setListData] = useState([
    {
      businessId: '001',
      businessName: 'Coffee Shop',
      category: 'Café',
      email: 'contact@coffeeshop.com',
      mobileNo: '123-456-7890',
      openTime: '07:00 AM',
      closeTime: '07:00 PM',
    },
    {
      businessId: '002',
      businessName: 'Bookstore',
      category: 'Retail',
      email: 'info@bookstore.com',
      mobileNo: '098-765-4321',
      openTime: '09:00 AM',
      closeTime: '08:00 PM',
    },
    {
      businessId: '003',
      businessName: 'Flower Shop',
      category: 'Florist',
      email: 'sales@flowershop.com',
      mobileNo: '555-123-4567',
      openTime: '08:00 AM',
      closeTime: '06:00 PM',
    },
    {
      businessId: '004',
      businessName: 'Gym',
      category: 'Fitness',
      email: 'support@gym.com',
      mobileNo: '444-567-8901',
      openTime: '05:00 AM',
      closeTime: '11:00 PM',
    },
    {
      businessId: '005',
      businessName: 'Bakery',
      category: 'Food',
      email: 'hello@bakery.com',
      mobileNo: '333-789-0123',
      openTime: '06:00 AM',
      closeTime: '05:00 PM',
    },
  ]);
  

  const handleEdit = (row) => {
    setEditingRow(row); // Set the row to be edited
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



  
  return (
    <Fragment>
      <Pageheader currentpage="Business" activepage="Business" mainpage="Business" />


      <div id="a1" className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className={`${editingRow ? 'hidden' : 'flex'} items-center justify-start mb-[2vh]`}>
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
          </div>
          <div className="box">
            <div className="box-body space-y-3">
              
              <div className="overflow-hidden">
                <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                
                  {editingRow ? (
                    <EditBusiness 
                      row={editingRow} 
                      onCancel={handleCancelEdit} 
                      active={isActive}
                    />
                  ) : (
                    <ResponsiveBusinessDataTable
                      data={listData}
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

export default Business;
