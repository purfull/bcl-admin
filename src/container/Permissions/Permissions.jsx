import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import Alert from '../dashboards/alert/Alert';
import { Autocomplete, TextField, Button } from '@mui/material';
import { combinedMenu } from '../../components/common/sidebar/sidemenu/sidemenu';
import './branch.css';

// Sample data for users
const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
  // Add more users as needed
];

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="switch">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    <span className="slider round"></span>
  </label>
);

const Permission = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');


  useEffect(() => {
    // Load permissions for the selected user when they change
    if (selectedUser) {
      const existingPermissions = combinedMenu.map((menu) => ({
        id: menu.MenuId,
        module: menu.MenuName,
        isActive: false, // Initialize as inactive
      }));
      setUserPermissions(existingPermissions);
    } else {
      setUserPermissions([]);
    }
  }, [selectedUser]);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setRowToDelete(null);
  };

  const handleConfirmDelete = () => {
    // Logic for deleting permission (if needed), then close alert
    handleCloseAlert();
  };

  const handlePermissionChange = (permissionId) => {
    setUserPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.id === permissionId ? { ...perm, isActive: !perm.isActive } : perm
      )
    );
  };

  const handleSavePermissions = () => {
    // Logic to save user permissions
    console.log('Saving permissions for:', selectedUser);
    console.log('Permissions:', userPermissions);

    // Simulate a save action
    setFeedbackMessage(`Permissions saved for ${selectedUser.name}`);
  };

  return (
    <Fragment>
      <Pageheader currentpage="Permission" activepage="Master" mainpage="Permission" />

      <div id="a1" className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body space-y-3">
              {/* Autocomplete Dropdown for Users */}
              <div className="flex flex-col">
                <label htmlFor="user" className="font-medium mb-2">Select User:</label>
                <Autocomplete
                  options={users}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => setSelectedUser(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Users" variant="outlined" />
                  )}
                />
              </div>

              {/* Permission Management Table */}
              {selectedUser && (
                <div className="overflow-hidden mt-4" style={{marginBottom:'40px'}}>
                  <h5 className="font-medium" style={{ fontWeight: 'bold', margin: '20px 0' }}>
                    Manage Permissions for {selectedUser.name}
                  </h5>
                  <table className="ti-custom-table ti-striped-table ti-custom-table-hover">
                    <thead>
                      <tr>
                        <th>Module</th>
                        <th>Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPermissions.map((permission) => (
                        <tr key={permission.id}>
                          <td>{permission.module}</td>
                          <td>
                            <ToggleSwitch
                              checked={permission.isActive}
                              onChange={() => handlePermissionChange(permission.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedUser && (
                <div className="fixed bottom-0 right-0 bg-white w-full py-4 px-6 flex justify-end mt-8">
                  <button
                    type="button"
                    // onClick={onCancel}
                    className="ti-btn ti-btn-outline-primary !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSavePermissions}
                    className="ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]"
                  >
                    Save
                  </button>
                </div>
              )}

  
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

export default Permission;
