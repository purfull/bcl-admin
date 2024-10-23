import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import EditFeatured from './EditFeatured';
// import '../org/org.css';
import { ResponsiveFeaturedDataTable } from "./FeaturedProductsData";
import Alert from '../../dashboards/alert/Alert';

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
      id: '001',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Espresso Machine',
      Price: '$199.99',
    },
    {
      id: '002',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Leather Notebook',
      Price: '$24.99',
    },
    {
      id: '003',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Bouquet of Roses',
      Price: '$49.99',
    },
    {
      id: '004',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Treadmill',
      Price: '$899.99',
    },
    {
      id: '005',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Croissant Pack',
      Price: '$14.99',
    },
    {
      id: '006',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Smartphone',
      Price: '$799.99',
    },
    {
      id: '007',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Scented Candle',
      Price: '$19.99',
    },
    {
      id: '008',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Wireless Headphones',
      Price: '$129.99',
    },
    {
      id: '009',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Yoga Mat',
      Price: '$39.99',
    },
    {
      id: '010',
      Logo: 'https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png',
      productName: 'Bluetooth Speaker',
      Price: '$59.99',
    }
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
      <Pageheader currentpage="Featured Products" activepage="Home" mainpage="Featured Products" />


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
                <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                
                  {editingRow ? (
                    <EditFeatured 
                      row={editingRow} 
                      onCancel={handleCancelEdit} 
                      active={isActive}
                    />
                  ) : (
                    <ResponsiveFeaturedDataTable
                      data={listData}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick} // Pass the delete handler
                      // onAdd={handleAddClick}
                      // active={isActive}
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
