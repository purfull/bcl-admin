import React, { useEffect, useRef, useState } from 'react';
import noImage from '../../../assets/images/no-images/no-image.png';
import { AppEnv } from '../../../../config';

const EditBlog = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [logo, setLogo] = useState(noImage);
  const fileInputRef = useRef(null);
  const req = row.newBlogs ? true : false;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("rowww ", row);
      
        try {
            const response = await fetch(`${AppEnv.baseUrl}/blog/${row.Id}`);
            const result = await response.json();
            console.log(result , "Filtered Data");

            if (result.data) {

              // console.log(result , "kkkkkkkkkkkkkkkkkkkkkk")
              //   const filteredData = result.map(item => ({
              //       Product_name: item.product_name,
              //       Logo: item.marketing_defaultImage_content,
              //       Type: item.type,
              //       Price: item.amount,
              //       CreatedAt: formatDate(item.createdAt),
              //     }));
              //   setData(filteredData);
              // setListData(result.data);
              setEditData(result?.data);
              setLogo(result.data?.image || null);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  const handleImageChange = (event) => {
    const logoFile = event.target.files[0];
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setLogo(base64String);
        setEditData((prevData) => ({
          ...prevData,
          image: base64String,
        }));
      };
      reader.readAsDataURL(logoFile);
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("dataaa ",editData);
    const dataToSend = {
      "id": row.Id,
      "author": editData.author,
      "title": editData.title,
      "content": editData.content,
      "image":  logo,
      "isActive": editData.isActive || false
  }
  console.log("data to send", dataToSend);
  
    
    try {
      const response = await fetch(`${req ? 'http://luxcycs.com:3000/blog/create-blog' : 'http://luxcycs.com:3000/blog/update-blog'}`, {
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
          <div className="flex items-center justify-start">
            <label htmlFor="author" className="w-[15%] font-medium">Author</label>
            <div className="w-[85%]">
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={editData.author || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="title" className="w-[15%] font-medium">Title*</label>
            <div className="w-[85%]">
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={editData.title || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="content" className="w-[15%] font-medium">Content</label>
            <div className="w-[85%]">
              <textarea
                className="form-control"
                id="content"
                rows="4"
                required
                value={editData.content || ''}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

            
          <div className="flex items-center justify-start">
            <label htmlFor="name" className="w-[15%] font-medium">Image*</label>
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

        <div className="w-full sm:w-[70%] flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="isActive" className="font-medium mr-[1vw]">Is Active</label>
            <label className="switch">
              <input
                type="checkbox"
                id="isActive"
                checked={editData.isActive || false}
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
            className="ti-btn ti-btn-outline-primary !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
