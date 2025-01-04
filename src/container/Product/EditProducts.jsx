import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
import { AppEnv } from '../../../config';
// import "./org.css";
import noImage from '../../assets/images/no-images/no-image.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { json } from 'react-router-dom';

const EditProducts = ({row,  onCancel }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [logo, setLogo] = useState(noImage);
  // console.log(row);
  
  const fileInputRef = useRef(null);
  const req = row.newProducts ? 'POST' : 'PUT'

  useEffect(() => {
    if (row.newProducts) return
    const abortController = new AbortController();
    console.log(row);
    
    
    fetch(`${AppEnv.baseUrl}/admin/products-detial/${row.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
    })
      .then(result => result.json())
      .then(data => {
        // setCountry(data.countries);
        setEditData(data.data);
        setLogo(data.data.image)
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
    setEditData((prevData) => ({
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
    fetch(`${AppEnv.baseUrl}/address`,{
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
      image: logo,
    };
    console.log(req);
    console.log("dataaa ", dataToSend);
    
    
    fetch(`${AppEnv.baseUrl}/admin/products`, {
      method: `${req}`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        if(data.success) {
          toast.success(data.message);

        }
        else {
          
          toast.error(data.message);
        }
      }
      )
      .catch(error => console.error('Error:', error));
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <ToastContainer />
        <div className="grid grid-cols-2 gap-4 mb-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="productName" className="w-[30%] font-medium">Products Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="name" defaultValue={editData.name || ''} onChange={handleChange} />
            </div>
          </div>
         
          <div className="flex items-center justify-start">
            <label htmlFor="size" className="w-[30%] font-medium ">Bottle Size</label>
            <div className="w-[70%]">
            <input type="number" className="form-control" id="bottle_size" defaultValue={editData.bottle_size || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="description" className="w-[30%] font-medium ">Description</label>
            <div className="w-[70%] flex">
              <input type="text" className="form-control" id="description" defaultValue={editData.description || ''} onChange={handleChange} />
                {
                  editData.CountryId === 'SINGAPORE' ? <button className='px-[2vw] py-[1vh] bg-violet-700 text-white ml-[1vw] rounded-md' onClick={handleAddress}>Address</button> : ''
                }
                  

                {/* 
                
          name: editData.name,
          bottle_size,
          description,
          actual_price,
          offer_price,
          stock_quantity,
          image,
          isActive, */}
                
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="actual_price" className="w-[30%] font-medium ">Actual Price</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="actual_price" defaultValue={editData.actual_price || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="offer_price" className="w-[30%] font-medium ">Offer Price</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="offer_price" defaultValue={editData.offer_price || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="stock_quantity" className="w-[30%] font-medium ">Stock Quantity</label>
            <div className="w-[70%]">
              <input type="number" className="form-control" id="stock_quantity" defaultValue={editData.stock_quantity || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-start justify-start">
            <label htmlFor="name" className="w-[30%] font-medium mt-4">Product Image</label>
            <div className="w-[15vw] mt-4">
              <img
                src={logo || noImage}
                className="form-control cursor-pointer"
                name="image"
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
        
        <div className="w-full sm:w-[70%] flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="isActive" className="font-medium mr-[1vw]">Is Active</label>
            <label className="switch">
              <input
                type="checkbox"
                id="isActive"
                checked={editData?.isActive || false}
                onChange={(e) =>
                  setEditData({ ...editData, isActive: e.target.checked })
                }
              />
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
