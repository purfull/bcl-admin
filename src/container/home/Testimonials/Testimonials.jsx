import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import EditTestimonial from './EditTestimonial';
// import '../org/org.css';
import { ResponsiveTestimonialDataTable } from "./TestimonialsData";
import Alert from '../../dashboards/alert/Alert';

const Testimonials = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);
  // const [listData, setListData] = useState([]);


  const [listData, setListData] = useState([
    {
      testimonialId: '101',
      customerName: 'John Doe',
      feedback: 'Amazing service! The staff were very friendly and helpful.',
      designation: 'Manager',
      date: '2024-08-15',
    },
    {
      testimonialId: '102',
      customerName: 'Jane Smith',
      feedback: 'The software product portal is intuitive and easy to navigate. I found everything I needed without any hassle!',
      designation: 'Software Engineer',
      date: '2024-08-10',
    },
    {
      testimonialId: '103',
      customerName: 'Sam Wilson',
      feedback: 'Great tools available on the portal, but I wish the load times were a bit faster for some features.',
      designation: 'Product Designer',
      date: '2024-08-08',
    },
    {
      testimonialId: '104',
      customerName: 'Emily Davis',
      feedback: 'The support team was super accommodating. They helped me troubleshoot an issue quickly through the portal.',
      designation: 'Marketing Director',
      date: '2024-08-05',
    },
    {
      testimonialId: '105',
      customerName: 'Michael Brown',
      feedback: 'Good experience overall, but it would be great to have more tutorials available on the software product portal.',
      designation: 'Business Analyst',
      date: '2024-07-30',
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
      <Pageheader currentpage="Testimonials" activepage="Home" mainpage="Testimonials" />


      <div id="a1" className="grid grid-cols-12 gap-6">
        <div className="col-span-12">

          <div className="box">
            <div className="box-body space-y-3">
              
              <div className="overflow-hidden">
                <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                
                  {editingRow ? (
                    <EditTestimonial 
                      row={editingRow} 
                      onCancel={handleCancelEdit} 
                      active={isActive}
                    />
                  ) : (
                    <ResponsiveTestimonialDataTable
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

export default Testimonials;
