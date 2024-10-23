import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';

const EditUserPermission = ({row,  onCancel }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [logo, setLogo] = useState(noImage);
  const [state, setState] = useState(false)
  // console.log(row);
  
  const req = row.newBranch ? true : false

  useEffect(() => {
    const abortController = new AbortController();
    // console.log(".............",row);
    
    
    // fetch(`${import.meta.env.VITE_URL}/branch/edit`, {
    fetch(`https://hmsapi.appxes-erp.in/Bank/GetBankbycode?OrganisationId=${row.OrgId}&BankCode=${row.BankCode}` , {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal
    })
      .then(result => result.json())
      .then(data => {
        // setCountry(data.countries);
        setEditData(data.Data[0]);
        console.log(data.Data[0]);
        
        // Check if images are present in the response and set them
      })
      
      .catch(err => console.log(err));

    return () => {
      abortController.abort();
    };
  }, []);


  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleStateButtonChange = (e) => {
    setState(!state)
  }

  const handleCountryChange = (event) => {
    setEditData(prevData => ({
      ...prevData,
      CountryId: event.target.value,
    }));
  };


  const handleAddress = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_URL}/address`,{
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editData);
    
    const dataToSend = {
        OrgId: row.OrgId,
        BankCode: editData.BankCode,
        BankName: editData.BankName,
        DisplayOrder: editData.DisplayOrder || 0,
        Remarks: editData.Remarks || "",
        IsActive: editData.IsActive || false,
        CreatedBy: editData.CreatedBy || "admin",
        CreatedOn: new Date().toISOString(),
        ChangedBy: "admin",
        ChangedOn: new Date().toISOString()
      };
    console.log(req);
    
    // fetch(`${import.meta.env.VITE_URL}/branch/update`, {
    fetch('https://hmsapi.appxes-erp.in/Bank/CreateBank',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-start">
          <label htmlFor="role" className="w-[10%] font-medium">Role</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="role" onChange={handleChange} />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="name" className="w-[10%] font-medium">Name*</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="name" onChange={handleChange} required />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="username" className="w-[10%] font-medium">User Name*</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="username" onChange={handleChange} required />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="password" className="w-[10%] font-medium">Password*</label>
          <div className="w-[90%]">
            <input type="password" className="form-control" id="password" onChange={handleChange} required />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="email" className="w-[10%] font-medium">Email</label>
          <div className="w-[90%]">
            <input type="email" className="form-control" id="email" onChange={handleChange} />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="addressLine1" className="w-[10%] font-medium">Address Line 1</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="addressLine1" onChange={handleChange} />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="addressLine2" className="w-[10%] font-medium">Address Line 2</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="addressLine2" onChange={handleChange} />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="addressLine3" className="w-[10%] font-medium">Address Line 3</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="addressLine3" onChange={handleChange} />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="country" className="w-[10%] font-medium">Country</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="country" onChange={handleChange} />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="postalCode" className="w-[10%] font-medium">Postal Code</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="postalCode" onChange={handleChange} />
          </div>
        </div>
        <div className="flex items-center justify-start">
          <label htmlFor="mobileNo" className="w-[10%] font-medium">Mobile No</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="mobileNo" onChange={handleChange} />
          </div>
        </div>
      </div>
        <div className="w-full sm:w-[70%] flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="ERP" className="font-medium  mr-[1vw]">Is Active</label>
            <label className="switch">
              <input type="checkbox" id="isActive" checked={editData.IsActive} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        <div className="fixed bottom-0 right-0 bg-white w-full py-4 px-6 flex justify-end mt-8">
          <button type="button" onClick={onCancel} className="ti-btn ti-btn-outline-primary !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]">
            Cancel
          </button>
          <button type="submit" className='ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPermission;
