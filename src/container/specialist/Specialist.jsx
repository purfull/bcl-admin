import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from "../../components/common/pageheader/pageheader";
import EditSpecialist from './EditSpecialist';
// import '../org/org.css';
import { ResponsiveSpecialistDataTable } from './SpecialistData';
import Alert from '../dashboards/alert/Alert';

const Specialist = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);
  // const [listData, setListData] = useState([]);


  const [listData, setListData] = useState([
    {
      specialistId: '001',
      specialistName: 'Coffee Shop',
      category: 'Café',
      email: 'contact@coffeeshop.com',
      mobileNo: '123-456-7890',
      city: 'New York',
    },
    {
      specialistId: '002',
      specialistName: 'Bookstore',
      category: 'Retail',
      email: 'info@bookstore.com',
      mobileNo: '098-765-4321',
      city: 'Los Angeles',
    },
    {
      specialistId: '003',
      specialistName: 'Flower Shop',
      category: 'Florist',
      email: 'sales@flowershop.com',
      mobileNo: '555-123-4567',
      city: 'Chicago',
    },
    {
      specialistId: '004',
      specialistName: 'Gym',
      category: 'Fitness',
      email: 'support@gym.com',
      mobileNo: '444-567-8901',
      city: 'Houston',
    },
    {
      specialistId: '005',
      specialistName: 'Bakery',
      category: 'Food',
      email: 'hello@bakery.com',
      mobileNo: '333-789-0123',
      city: 'Phoenix',
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
      <Pageheader currentpage="Specialist" activepage="Specialist" mainpage="Specialist" />


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
                    <EditSpecialist 
                      row={editingRow} 
                      onCancel={handleCancelEdit} 
                      active={isActive}
                    />
                  ) : (
                    <ResponsiveSpecialistDataTable
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

export default Specialist;
