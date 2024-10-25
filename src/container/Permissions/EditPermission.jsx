import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../assets/images/no-images/no-image.png';

const EditPermission = ({row,  onCancel }) => {

  const [editData, setEditData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    image: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
    console.log(editData); // Log or send the data as needed
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label htmlFor="id" className="w-[30%] font-medium">ID</label>
            <div className="w-[70%]">
              <input type="text" className="form-control custom-input" id="id" value={editData.id} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="name" className="w-[30%] font-medium">Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control custom-input" custom-inputid="name" value={editData.name} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="email" className="w-[30%] font-medium">Email</label>
            <div className="w-[70%]">
              <input type="email" className="form-control custom-input" id="email" value={editData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="phone" className="w-[30%] font-medium">Phone</label>
            <div className="w-[70%]">
              <input type="tel" className="form-control custom-input" id="phone" value={editData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="role" className="w-[30%] font-medium">Role</label>
            <div className="w-[70%]">
              <input type="text" className="form-control custom-input" id="role" value={editData.role} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="image" className="w-[30%] font-medium">Image URL</label>
            <div className="w-[70%]">
              <input type="text" className="form-control custom-input" id="image" value={editData.image} onChange={handleChange} />
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

export default EditPermission;
