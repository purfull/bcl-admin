import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';

const EditCustomer =({row,  onCancel }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [logo, setLogo] = useState(noImage);
  // console.log(row);
  
  const req = row.newBranch ? 'POST' : 'PUT'

  useEffect(() => {
    const abortController = new AbortController();
    console.log(row);
    
    
    fetch(`${import.meta.env.VITE_URL}/customer/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      body: JSON.stringify({ Code: row.Code })
    })
      .then(result => result.json())
      .then(data => {
        setCountry(data.countries);
        setEditData(data.branch[0]);
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
      ...editData
    };
    console.log(req);
    
    fetch(`${import.meta.env.VITE_URL}/customer/update`, {
      method: `${req}`,
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
            <label htmlFor="OrgId" className="w-[30%] font-medium">Code</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="OrgId" defaultValue={editData.BranchCode || ''} onChange={handleChange} disabled />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="ORG_Name" defaultValue={editData.BranchName || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
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
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="CountryId" className="w-[30%] font-medium ">Country</label>
            <div className="w-[70%]">
              <select
                className="form-control"
                id="CountryId"
                defaultValue={editData.CountryId || ''}
                onChange={handleCountryChange}
              >
                {country.length > 0 ? (
                  country.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No Country Available</option>
                )}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="PostalCode" className="w-[30%] font-medium ">Postal Code</label>
            <div className="w-[70%] flex">
              <input type="text" className="form-control" id="PostalCode" defaultValue={editData.PostalCode || ''} onChange={handleChange} />
                {
                  editData.CountryId === 'SINGAPORE' ? <button className='px-[2vw] py-[1vh] bg-violet-700 text-white ml-[1vw] rounded-md' onClick={handleAddress}>Address</button> : ''
                }
                  

                
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Phone" className="w-[30%] font-medium ">Phone</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Phone" defaultValue={editData.Phone || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Mobile" className="w-[30%] font-medium ">Mobile</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Mobile" defaultValue={editData.Mobile || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Fax" className="w-[30%] font-medium ">Fax No</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Fax" defaultValue={editData.Fax || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Mail" className="w-[30%] font-medium ">Email</label>
            <div className="w-[70%]">
              <input type="email" className="form-control" id="Mail" defaultValue={editData.Mail || ''} onChange={handleChange} />
            </div>
          </div>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="BusinessRegNo" className="w-[30%] font-medium ">Business Reg No</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="BusinessRegNo" defaultValue={editData.BusinessRegNo || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="TaxRegNo" className="w-[30%] font-medium ">Tax Reg No</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="TaxRegNo" defaultValue={editData.TaxRegNo || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="TaxName" className="w-[30%] font-medium ">Tax Name</label>
            <div className="w-[70%]">
              <select
                className="form-control"
                id="TaxName"
                defaultValue={editData.TaxName || ''}
                onChange={handleTaxChange}
              >
                {taxName.length > 0 ? (
                  taxName.map((el, index) => (
                    <option key={index} defaultValue={el}>
                      {el}
                    </option>
                  ))
                ) : (
                  <option defaultValue="" disabled>No Tax Available</option>
                )}
              </select>
            </div>
          </div> */}
        </div>
        {/* <div className="w-full grid grid-cols-2 gap-4 py-[8vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="Logo" className="w-[30%] font-medium ">Logo</label>
            <div className="w-[10vw]">
              <img
                src={logo}
                className="form-control cursor-pointer"
                id="Logo"
                alt='logo'
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="QR" className="w-[30%] font-medium ">QR</label>
            <div className="w-[10vw]">
              <img
                src={qrCode}
                className="form-control cursor-pointer"
                id="QR"
                alt='QR code'
                onClick={handleQrImageClick}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={qrFileInputRef}
                onChange={handleQrFileChange}
              />
            </div>
          </div>
        </div> */}
        <div className="w-1/2 flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="ERP" className="font-medium  mr-[1vw]">Is Active</label>
            <label className="switch">
              <input type="checkbox" id="ERP" checked={editData.IsActive || true} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="POS" className="font-medium  mr-[1vw]">Have Stock</label>
            <label className="switch">
              <input type="checkbox" id="POS" checked={editData.HaveStock || true} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="B2B" className="font-medium  mr-[1vw]">Is Default</label>
            <label className="switch">
              <input type="checkbox" id="B2B" checked={editData.IsDefault || false} onChange={handleChange} />
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

export default EditCustomer;
