import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import Alert from '../dashboards/alert/Alert';
import { Autocomplete, TextField, Button } from '@mui/material';
import { combinedMenu } from '../../components/common/sidebar/sidemenu/sidemenu';
import { AppEnv } from '../../../config';
import './branch.css';



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
  const [users, setUser] = useState([])

  useEffect(() => {
    if (selectedUser) {
      const existingPermissions = combinedMenu.map((menu) => ({
        id: menu.MenuId,
        module: menu.MenuName,
        isViewActive: false,
        isFullAccess: false,
      }));
      setUserPermissions(existingPermissions);
    } else {
      setUserPermissions([]);
    }
  }, [selectedUser]);

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${AppEnv.baseUrl}/api/admin/user/list`);
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
              setUser(result.data);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setRowToDelete(null);
  };

  const handleConfirmDelete = () => {
    handleCloseAlert();
  };

  const handlePermissionChange = (permissionId, type) => {
    setUserPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.id === permissionId
          ? {
              ...perm,
              isViewActive: type === 'isViewActive' ? !perm.isViewActive : false,
              isFullAccess: type === 'isFullAccess' ? !perm.isFullAccess : false,
            }
          : perm
      )
    );
  };

  const handleSavePermissions = () => {
    console.log('Saving permissions for:', selectedUser);
    console.log('Permissions:', userPermissions);

    setFeedbackMessage(`Permissions saved for ${selectedUser.name}`);
  };

  return (
    <Fragment>
      <Pageheader currentpage="Permission" activepage="Master" mainpage="Permission" />

      <div id="a1" className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body space-y-3">
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

              {selectedUser && (
                <div className="overflow-hidden mt-4" style={{ marginBottom: '40px' }}>
                  <h5 className="font-medium" style={{ fontWeight: 'bold', margin: '20px 0' }}>
                    Manage Permissions for {selectedUser.name}
                  </h5>
                  <table className="ti-custom-table ti-striped-table ti-custom-table-hover">
                    <thead>
                      <tr>
                        <th>Module</th>
                        <th>View</th>
                        <th>Full Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPermissions.map((permission) => (
                        <tr key={permission.id}>
                          <td>{permission.module}</td>
                          <td>
                            <ToggleSwitch
                              checked={permission.isViewActive}
                              onChange={() => handlePermissionChange(permission.id, 'isViewActive')}
                            />
                          </td>
                          <td>
                            <ToggleSwitch
                              checked={permission.isFullAccess}
                              onChange={() => handlePermissionChange(permission.id, 'isFullAccess')}
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
