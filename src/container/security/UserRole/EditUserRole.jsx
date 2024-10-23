import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';

const EditUserRole = ({row,  onCancel }) => {
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
            <label htmlFor="OrgId" className="w-[10%] font-medium">User Role Code</label>
            <div className="w-[90%]">
              <input type="text" className="form-control" id="bankCode" defaultValue={editData.BankCode || ''} onChange={handleChange} disabled />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[10%] font-medium ">User Role Name</label>
            <div className="w-[90%]">
              <input type="text" className="form-control" id="bankName" defaultValue={editData.BankName || ''} onChange={handleChange} />
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

export default EditUserRole;
