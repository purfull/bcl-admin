import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import EditTestimonial from './EditTestimonial';
// import '../org/org.css';
import { ResponsiveTestimonialDataTable } from "./TestimonialsData";
import Alert from '../../dashboards/alert/Alert';
import { AppEnv } from '../../../../config';

const Testimonials = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [reRun, setReRun] = useState(false);
  // const [listData, setListData] = useState([]);


  const [listData, setListData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${AppEnv.baseUrl}/testimonial`);
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
}, [reRun]);

  

  const handleEdit = (row) => {
    setEditingRow(row); // Set the row to be edited
  };

  const handleCancelEdit = () => {
    setEditingRow(null); // Cancel edit and return to view mode
    setReRun(!reRun)
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
    const abortController = new AbortController();
        console.log("ddddddddd", rowToDelete);
        
        const path = rowToDelete.add ? 'add' : 'delete'
        // Perform the delete action here, e.g., call an API to delete the row
        fetch(`${AppEnv.baseUrl}/testimonial/delete-testimonial/${rowToDelete.row.Id}`, {
          method: 'DELETE', // Ensure this is the correct method for your API
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortController.signal,
          body: JSON.stringify({ ProductsCode: rowToDelete.row.ProductsCode }) // Ensure the payload is correctly formatted
        })
          .then(result => result.json())
          .then(response => {
            if (response.success) { // Check if the response indicates a successful deletion
              // Remove the row from the data
              setReRun(!run)
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

  useEffect(() => {
    if (listData?.length > 0) {
      setData(listData.map(el => ({
        Id: el.id,
        Name: el.name,
        Message: el.message
      })));
    }
  }, [listData]);

  
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

export default Testimonials;
