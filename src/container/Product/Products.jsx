import React, { Fragment, useState, useEffect } from 'react';
import Pageheader from '../../components/common/pageheader/pageheader';
import EditProducts from "./EditProducts";
import { ResponsiveProductsDataTable } from "./Productsdata";
import Alert from '../dashboards/alert/Alert';

const Products = () => {
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited
  const [isActive, setIsActive] = useState(true); // State to track the checkbox
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [rowToDelete, setRowToDelete] = useState(null); // State to keep track of the row to delete
  const [rowToAdd, setRowToAdd] = useState(null);


  const [data, setData] = useState([
    {
      "Product id" : 1,
      "Product Name": "200ml mini bottle",
      "Stock Quantity": 400,
      "Selling Price": "₹400",

    },
    {
      "Product id" : 2,
      "Product Name": "500ml regular bottle",
      "Stock Quantity": 300,
      "Selling Price": "₹700",

    },
    {
      "Product id" : 3,
      "Product Name": "1Lt large bottle",
      "Stock Quantity": 200,
      "Selling Price": "₹1100",

    },]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};


  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await fetch('http://luxcycs.com:3000/api/admin/products');
  //             const result = await response.json();
  //             console.log(result , "Filtered Data");

  //             if (result) {
  //                 // Filter the data to only include the specified fields
  //                 const filteredData = result.map(item => ({
  //                     Product_name: item.product_name,
  //                     Type: item.type,
  //                     Logo: item.marketing_defaultImage_content,
  //                     CreatedAt: formatDate(item.createdAt),
  //                   }));
  //                 setData(filteredData);
  //             }
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //     };

  //     fetchData();
  // }, []);


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
      body: JSON.stringify({ ProductsCode: rowToDelete.row.ProductsCode }) // Ensure the payload is correctly formatted
    })
      .then(result => result.json())
      .then(response => {
        if (response.success) { // Check if the response indicates a successful deletion
          // Remove the row from the data
          setData(prevData => prevData.filter(item => item.ProductsCode !== rowToDelete.row.ProductsCode));
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
      <Pageheader currentpage="Products" activepage="Master" mainpage="Products" />


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
          <div className="box ">
            <div className="box-body space-y-3">
              
              <div className="overflow-hidden">
                <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                
                  {editingRow ? (
                    <EditProducts 
                      row={editingRow} 
                      onCancel={handleCancelEdit} 
                      active={isActive}
                    />
                  ) : (
                    <ResponsiveProductsDataTable
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

export default Products;
