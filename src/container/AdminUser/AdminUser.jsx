import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import EditAdminUser from "./EditAdminUser";
import './branch.css';
import { ResponsiveAdminUserDataTable } from "./AdminUserData";
import Alert from '../dashboards/alert/Alert';
const AdminUser = () => {

  
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const today = new Date();
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      userRole: "Admin",
      createdAt: formatDate(new Date(today.setDate(today.getDate()))),
    },
    {
      id: 2,
      name: "Jane Smith",
      userRole: "User",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 1))),
    },
    {
      id: 3,
      name: "Alice Johnson",
      userRole: "Moderator",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 2))),
    },
    {
      id: 4,
      name: "Bob Brown",
      userRole: "Editor",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 3))),
    },
    {
      id: 5,
      name: "Charlie Green",
      userRole: "User",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 4))),
    },
    {
      id: 6,
      name: "Diana White",
      userRole: "Admin",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 5))),
    },
    {
      id: 7,
      name: "Eve Black",
      userRole: "Moderator",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 6))),
    },
    {
      id: 8,
      name: "Frank Gray",
      userRole: "Editor",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 7))),
    },
    {
      id: 9,
      name: "Grace Blue",
      userRole: "User",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 8))),
    },
    {
      id: 10,
      name: "Hank Yellow",
      userRole: "Admin",
      createdAt: formatDate(new Date(today.setDate(today.getDate() - 9))),
    },
  ]);

  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${import.meta.env.VITE_URL}/dashboards/branch?isActive=${isActive}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
    })
      .then(result => result.json())
      .then(data => setData(data))
      .catch(err => console.log(err));

    return () => {
      abortController.abort();
    };
  }, [isActive]);

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

  // const handleAddClick = (row) => {
  //   setRowToAdd(row);
  //   setIsAlertOpen(true);
  // };

  const handleConfirmDelete = () => {
    // Create a new AbortController instance
    const abortController = new AbortController();
    
    const path = rowToDelete.add ? 'add' : 'delete'
    // Perform the delete action here, e.g., call an API to delete the row

    fetch(`${import.meta.env.VITE_URL}/branch/${path}`, {
      method: 'PUT', // Ensure this is the correct method for your API
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      body: JSON.stringify({ AdminUserCode: rowToDelete.row.AdminUserCode }) // Ensure the payload is correctly formatted
    })
      .then(result => result.json())
      .then(response => {
        if (response.success) { // Check if the response indicates a successful deletion
          // Remove the row from the data
          setData(prevData => prevData.filter(item => item.AdminUserCode !== rowToDelete.row.AdminUserCode));
        } else {
          console.error('Failed to delete the row:', response.message);
        }
        setIsAlertOpen(false); // Close the alert
        setRowToDelete(null); // Reset the rowToDelete state
      })
      .catch(err => {
        console.error('Error:', err);
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
      <Pageheader currentpage="AdminUser" activepage="Master" mainpage="AdminUser" />


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
                    <EditAdminUser 
                      row={editingRow} 
                      onCancel={handleCancelEdit} 
                      active={isActive}
                    />
                  ) : (
                    <ResponsiveAdminUserDataTable
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

export default AdminUser;
