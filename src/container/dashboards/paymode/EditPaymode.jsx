import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';

const EditBranch = ({row,  onCancel, active }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [logo, setLogo] = useState(noImage);
  const [state, setState] = useState(false)
  // console.log(row);
  
  const req = row.newBranch ? true : false

  useEffect(() => {
    const abortController = new AbortController();
    console.log("................",row.OrganisationID);
    
    
    // fetch(`${import.meta.env.VITE_URL}/branch/edit`, {
    fetch(`https://hmsapi.appxes-erp.in/Paymode/GetPaymodebycode?OrganisationId=${1}&PaymodeID=${row.PaymodeID}` , {

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


  // useEffect(() => {
  //       if (editData && editData.Logo) {
  //           // Convert the buffer data to a Base64 string
  //           const bufferData = editData.Logo.data;
  //           const base64String = Buffer.from(bufferData).toString('base64');
  //           setLogo(`data:image/png;base64,${base64String}`);
  //       }
  //   }, [editData]);
  
  // console.log(editData);
  
  // if (editData.Logo) {
  //   setLogo(`data:image/png;base64,${editData.Logo.data}`);
  // }
  // if (data.organisation[0].QR) {
  //   setQrCode(`data:image/png;base64,${data.organisation[0].QR}`);
  // }

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
    const dataToSend = {
        PaymodeID: editData.PaymodeID || 0,
        OrganisationID: row.OrganisationID || 0,
        PaymodeCode: editData.PaymodeCode || '',
        PaymodeName: editData.PaymodeName || '',
        Description: editData.Description || '',
        IsActive: editData.IsActive !== undefined ? editData.IsActive : true,
        CreatedBy: editData.CreatedBy || 'string',
        CreatedDate: editData.CreatedDate || new Date().toISOString(),
        ModifiedBy: editData.ModifiedBy || 'string',
        ModifiedDate: editData.ModifiedDate || new Date().toISOString(),
      };
    console.log(req);
    
    // fetch(`${import.meta.env.VITE_URL}/branch/update`, {
    fetch('https://hmsapi.appxes-erp.in/Paymode/CreatePaymode',{
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
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label htmlFor="OrgId" className="w-[30%] font-medium">Paymode Code</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="OrgId" defaultValue={editData.PaymodeID || ''} onChange={handleChange} disabled />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Paymode Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="ORG_Name" defaultValue={editData.PaymodeName || ''} onChange={handleChange} />
            </div>
          </div>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="AddressLine1" className="w-[30%] font-medium ">Address Line 1</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine1" defaultValue={editData.AddressLine1 || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine2" className="w-[30%] font-medium ">Address Line 2</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine2" defaultValue={editData.AddressLine2 || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine3" className="w-[30%] font-medium ">Address Line 3</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine3" defaultValue={editData.AddressLine3 || ''} onChange={handleChange} />
            </div>
          </div> */}
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Description</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="ORG_Name" defaultValue={editData.Description || ''} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[70%] flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="ERP" className="font-medium  mr-[1vw]">Is Active</label>
            <label className="switch">
              <input type="checkbox" id="ERP" checked={editData.IsActive} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="B2C" className="font-medium  mr-[1vw]">B2C</label>
            <label className="switch">
              <input type="checkbox" id="B2C" checked={editData.B2C || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div> */}
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

export default EditBranch;
