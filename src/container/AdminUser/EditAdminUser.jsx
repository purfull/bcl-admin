import React, { useEffect, useRef, useState } from 'react';
import noImage from '../../assets/images/no-images/no-image.png';
import { AppEnv } from '../../../config';

const EditAdminUser = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [logo, setLogo] = useState(noImage);
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(noImage);
  const req = row.newAdminUser ? true : false;


  
  useEffect(() => {
    const fetchData = async () => {
      console.log("rowww ", row);
      
        try {
            const response = await fetch(`${AppEnv.baseUrl}/api/admin/user/get-user/${row.Id}`);
            const result = await response.json();
            console.log(result , "Filtered Data");

            if (result) {
              setEditData(result.data);
              setLogo(result?.data?.image);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);


const handleChange = (event) => {
  const { id, value } = event.target;
  setEditData((prevData) => ({
    ...prevData,
    [id]: value,
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

  const handlePasswordGenerate = () => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%&*';

    const getRandomChar = (chars) => chars.charAt(Math.floor(Math.random() * chars.length));

    // Ensure at least one character from each required category
    let password = [
      getRandomChar(upperChars),
      getRandomChar(lowerChars),
      getRandomChar(numbers),
      getRandomChar(specialChars),
    ];

    // Fill the remaining characters to reach 8 in total
    const allChars = upperChars + lowerChars + numbers + specialChars;
    for (let i = password.length; i < 12; i++) {
      password.push(getRandomChar(allChars));
    }

    // Shuffle the password array to avoid predictable patterns
    password = password.sort(() => Math.random() - 0.5).join('');

    setEditData((prevState) => ({
      ...prevState,
      password,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("dataaa ",editData);
    const dataToSend = {
      "id": row.Id,
      "name": editData.name,
      "email": editData.email,
      "phone": editData.phone,
      "role": editData.role,
      "password": editData.password,
      "image": logo,
      "isActive": editData.isActive
    }
      // console.log("data to send", dataToSend);
  
    
    try {
      const response = await fetch(`${req ? 'http://luxcycs.com:3000/api/admin/user/create-user' :  'http://luxcycs.com:3000/api/admin/user/update-user'}`, {
        method: req ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* <div className="flex items-center justify-start">
            <label htmlFor="id" className="w-[30%] font-medium">ID</label>
            <div className="w-[70%]">
              <input type="text" className="form-control custom-input" id="id" value={editData.id} onChange={handleChange} />
            </div>
          </div> */}

          <div className="flex items-center justify-start">
            <label htmlFor="name" className="w-[30%] font-medium">Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control custom-input" id="name" value={editData?.name || ''} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="email" className="w-[30%] font-medium">Email</label>
            <div className="w-[70%]">
              <input type="email" className="form-control custom-input" id="email" value={editData?.email} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="phone" className="w-[30%] font-medium">Phone</label>
            <div className="w-[70%]">
              <input type="tel" className="form-control custom-input" id="phone" value={editData?.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="role" className="w-[30%] font-medium">Role</label>
            <div className="w-[70%]">
              <input type="text" className="form-control custom-input" id="role" value={editData?.role} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="password" className="w-[30%] font-medium">Password</label>
            <div className="w-[70%] flex">
              <input type="text" className="form-control custom-input mr-2" id="password" value={editData?.password} onChange={handleChange} />
              <button type="button" onClick={handlePasswordGenerate} className='ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]' style={{minWidth:'220px'}} >Generate Password</button>
            </div>
          </div>
          {/* <div className="flex items-start justify-start">
            <label htmlFor="image" className="w-[30%] font-medium">Upload Image</label>
            <div className="w-[70%]">
              <input type="file" className="form-control custom-input" id="image" onChange={handleImageChange} accept="image/*" />
            </div>
          </div> */}
          <div className="flex items-center justify-start">
            <label className="w-[30%] font-medium">Image</label>
            <div className="w-[10vw]">
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
            <label htmlFor="isActive" className="font-medium mr-[1vw]">Is Active</label>
            <label className="switch">
              <input type="checkbox" id="isActive" checked={editData?.isActive === 1 ? true : false } onChange={(e) =>
                  setEditData({ ...editData, isActive: e.target.checked ? 1 : 0 })
                } />
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

export default EditAdminUser;
