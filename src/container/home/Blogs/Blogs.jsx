import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import EditBlogs from './EditBlog';
// import '../org/org.css';
import { ResponsiveFeaturedDataTable } from "./BlogsData";
import Alert from '../../dashboards/alert/Alert';

const Blogs = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);
  // const [listData, setListData] = useState([]);


  const [listData, setListData] = useState([
    {
      id: '101',
      title: 'How to Brew Perfect Coffee',
      author: 'John Doe',
    },
    {
      id: '102',
      title: 'Top 10 Morning Workouts',
      author: 'Jane Smith',
    },
    {
      id: '103',
      title: 'Best Practices for Yoga',
      author: 'Sam Wilson',
    },
    {
      id: '104',
      title: 'Healthy Breakfast Ideas',
      author: 'Emily Johnson',
    },
    {
      id: '105',
      title: 'The Art of Meditation',
      author: 'Michael Brown',
    },
    {
      id: '106',
      title: 'Exploring the Outdoors',
      author: 'Sarah Wilson',
    },
    {
      id: '107',
      title: 'Home Workout Tips',
      author: 'Chris Evans',
    },
    {
      id: '108',
      title: 'Cooking with Herbs',
      author: 'Jessica Lee',
    },
    {
      id: '109',
      title: 'Mindfulness Practices',
      author: 'David Garcia',
    },
    {
      id: '110',
      title: 'Benefits of Journaling',
      author: 'Laura Martinez',
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
      <Pageheader currentpage="Blogs" activepage="Home" mainpage="Blogs" />


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
                     <EditBlogs 
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

export default Blogs;
