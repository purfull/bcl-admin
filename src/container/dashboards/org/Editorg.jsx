import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';

const EditOrg = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [taxName, setTaxName] = useState([]);
  const [logo, setLogo] = useState(noImage);
  const [qrCode, setQrCode] = useState('https://i.pinimg.com/236x/1f/70/5f/1f705f24e1949ac2cf24c252e469af8d.jpg');

  const fileInputRef = useRef(null);
  const qrFileInputRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${import.meta.env.VITE_URL}/org/edit`, {
      method: 'GET',
      signal: abortController.signal,
    })
      .then(result => result.json())
      .then(data => {
        setEditData(data.organisation[0]);
        setCountry(data.countries);
        setTaxName(data.taxNames);
        // Check if images are present in the response and set them
      })
      
      .catch(err => console.log(err));

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
        if (editData && editData.Logo) {
            // Convert the buffer data to a Base64 string
            const bufferData = editData.Logo.data;
            const base64String = Buffer.from(bufferData).toString('base64');
            setLogo(`data:image/png;base64,${base64String}`);
        }
    }, [editData]);
  
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

  const handleTaxChange = (event) => {
    setEditData(prevData => ({
      ...prevData,
      TaxName: event.target.value,
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
      ...editData,
      Logo: logo, // Include base64 image
      QR: qrCode, // Include base64 image
    };

    fetch(`${import.meta.env.VITE_URL}/org/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCode(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleQrImageClick = () => {
    if (qrFileInputRef.current) {
      qrFileInputRef.current.click();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-[4vh]">
          {/* <div className="flex items-center justify-start">
            <label htmlFor="OrgId" className="w-[30%] font-medium text-black">Organization ID</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="OrgId" value={editData.OrgId || ''} onChange={handleChange} />
            </div>
          </div> */}
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium text-black">Company Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="ORG_Name" value={editData.ORG_Name || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine1" className="w-[30%] font-medium text-black">Address Line 1</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine1" value={editData.AddressLine1 || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine2" className="w-[30%] font-medium text-black">Address Line 2</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine2" value={editData.AddressLine2 || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine3" className="w-[30%] font-medium text-black">Address Line 3</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine3" value={editData.AddressLine3 || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="CountryId" className="w-[30%] font-medium text-black">Country</label>
            <div className="w-[70%]">
              <select
                className="form-control"
                id="CountryId"
                value={editData.CountryId || ''}
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
            <label htmlFor="Phone" className="w-[30%] font-medium text-black">State</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Phone" value={editData.Phone || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="PostalCode" className="w-[30%] font-medium text-black">Postal Code</label>
            <div className="w-[70%] flex">
              <input type="text" className="form-control" id="PostalCode" value={editData.PostalCode || ''} onChange={handleChange} />
                {
                  editData.CountryId === 'SINGAPORE' ? <button className='px-[2vw] py-[1vh] bg-violet-700 text-white ml-[1vw] rounded-md' onClick={handleAddress}>Address</button> : ''
                }
                  

                
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Phone" className="w-[30%] font-medium text-black">Phone</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Phone" value={editData.Phone || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Fax" className="w-[30%] font-medium text-black">Fax</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Fax" value={editData.Fax || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Mail" className="w-[30%] font-medium text-black">Email</label>
            <div className="w-[70%]">
              <input type="email" className="form-control" id="Mail" value={editData.Mail || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="BusinessRegNo" className="w-[30%] font-medium text-black">Currency</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="BusinessRegNo" value={editData.BusinessRegNo || ''} onChange={handleChange} />
            </div>
          </div>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="TaxRegNo" className="w-[30%] font-medium text-black">Tax Reg No</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="TaxRegNo" value={editData.TaxRegNo || ''} onChange={handleChange} />
            </div>
          </div> */}
          <div className="flex items-center justify-start">
            <label htmlFor="TaxName" className="w-[30%] font-medium text-black">Tax Name</label>
            <div className="w-[70%]">
              <select
                className="form-control"
                id="TaxName"
                value={editData.TaxName || ''}
                onChange={handleTaxChange}
              >
                {taxName.length > 0 ? (
                  taxName.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No Tax Available</option>
                )}
              </select>
            </div>
          </div>
        <div className="flex items-center justify-start">
          <label htmlFor="ORG_Name" className="w-[30%] font-medium text-black">Cp Name</label>
          <div className="w-[70%]">
            <input type="text" className="form-control" id="ORG_Name" value={editData.ORG_Name || ''} onChange={handleChange} />
          </div>
        </div>
        
        <div className="flex items-center justify-start">
            <label htmlFor="Phone" className="w-[30%] font-medium text-black">Cp Number</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Phone" value={editData.Phone || ''} onChange={handleChange} />
            </div>
          </div>
        <div className="flex items-center justify-start">
            <label htmlFor="Mail" className="w-[30%] font-medium text-black">Cp Email</label>
            <div className="w-[70%]">
              <input type="email" className="form-control" id="Mail" value={editData.Mail || ''} onChange={handleChange} />
            </div>
          </div>
        </div>
        
        <div className="w-full grid grid-cols-2 gap-4 py-[8vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="Logo" className="w-[30%] font-medium text-black">Logo</label>
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
          {/* <div className="flex items-center justify-start">
            <label htmlFor="QR" className="w-[30%] font-medium text-black">QR</label>
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
          </div> */}
        </div>
        {/* <div className="w-1/2 flex justify-between">
          <div className="flex items-center justify-start">
            <label htmlFor="ERP" className="font-medium text-black mr-[1vw]">ERP</label>
            <label className="switch">
              <input type="checkbox" id="ERP" checked={editData.ERP || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="POS" className="font-medium text-black mr-[1vw]">POS</label>
            <label className="switch">
              <input type="checkbox" id="POS" checked={editData.POS || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="B2B" className="font-medium text-black mr-[1vw]">B2B</label>
            <label className="switch">
              <input type="checkbox" id="B2B" checked={editData.B2B || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="B2C" className="font-medium text-black mr-[1vw]">B2C</label>
            <label className="switch">
              <input type="checkbox" id="B2C" checked={editData.B2C || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
        </div> */}
        <div className="fixed bottom-0 right-0 bg-white w-full py-4 px-6 flex justify-end mt-8">
          <button type="button" onClick={onCancel} className="ti-btn ti-btn-outline-primary !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]">
            Back
          </button>
          <button type="submit" className='ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrg;
