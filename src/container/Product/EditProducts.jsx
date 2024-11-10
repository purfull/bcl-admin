import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../assets/images/no-images/no-image.png';

const EditProducts = ({row,  onCancel }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [logo, setLogo] = useState(noImage);
  // console.log(row);
  
  const fileInputRef = useRef(null);
  const req = row.newProducts ? 'POST' : 'PUT'

  useEffect(() => {
    const abortController = new AbortController();
    // console.log(row);
    
    
    fetch(`${import.meta.env.VITE_URL}/branch/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      body: JSON.stringify({ ProductsCode: row.ProductsCode })
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
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
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
    
    fetch(`${import.meta.env.VITE_URL}/branch/update`, {
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
        <div className="grid grid-cols-2 gap-4 mb-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="OrgId" className="w-[30%] font-medium">Products Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="OrgId" defaultValue={editData.ProductsCode || ''} onChange={handleChange} />
            </div>
          </div>
         
          <div className="flex items-center justify-start">
            <label htmlFor="CountryId" className="w-[30%] font-medium ">Bottle Size</label>
            <div className="w-[70%]">
              <select
                className="form-control"
                id="CountryId"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
              >
                  <option value="" >200 ml</option>
                  <option value="" >300 ml</option>
                
              </select>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="PostalCode" className="w-[30%] font-medium ">Description</label>
            <div className="w-[70%] flex">
              <input type="text" className="form-control" id="PostalCode" defaultValue={editData.PostalCode || ''} onChange={handleChange} />
                {
                  editData.CountryId === 'SINGAPORE' ? <button className='px-[2vw] py-[1vh] bg-violet-700 text-white ml-[1vw] rounded-md' onClick={handleAddress}>Address</button> : ''
                }
                  

                
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Phone" className="w-[30%] font-medium ">Actual Price</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Phone" defaultValue={editData.Phone || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Mobile" className="w-[30%] font-medium ">Offer Price</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Mobile" defaultValue={editData.Mobile || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Fax" className="w-[30%] font-medium ">Stock Quantity</label>
            <div className="w-[70%]">
              <input type="number" className="form-control" id="Fax" defaultValue={editData.Fax || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-start justify-start">
            <label htmlFor="name" className="w-[30%] font-medium mt-4">Product Image</label>
            <div className="w-[15vw] mt-4">
              <img
                src={logo || noImage}
                className="form-control cursor-pointer"
                id="Logo"
                alt="logo"
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

          
          
        </div>
        
        <div className="w-1/2 flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="ERP" className="font-medium  mr-[1vw]">Is Active</label>
            <label className="switch">
              <input type="checkbox" id="ERP" checked={editData.IsActive || true} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="fixed bottom-0 right-0 bg-white w-full py-4 px-6 flex justify-end mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="ti-btn !border !border-[#046E3D] text-[#046E3D] !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ti-btn bg-[#046E3D] text-white !px-[20px] !py-[2px] !text-[18px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProducts;
