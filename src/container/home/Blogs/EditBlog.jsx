import React, { useEffect, useRef, useState } from 'react';
import noImage from '../../../assets/images/no-images/no-image.png';
import { AppEnv } from '../../../../config';

const EditBlogs = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    author: '',
    publishDate: '',
    image: '',
  });
  const [logo, setLogo] = useState(null);
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
        console.log(result, " tttttttttttt");
        
        if (result) {
          setEditData(result.data);
          setLogo(result?.data?.image || noImage);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (row && row.Id) fetchData();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      id:  row.Id,
      title: editData.title,
      content: editData.content,
      author: editData.author,
      tags: editData.tags,
      publishDate: editData.publishDate,
      image: logo,
    };

    try {
      const response = await fetch(`${req ? AppEnv.baseUrl+'/blog/create-blog' : AppEnv.baseUrl+'/blog/update-blog'}`, {
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
      console.log('Blog created successfully:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label htmlFor="title" className="w-[15%] font-medium">Title*</label>
            <div className="w-[85%]">
              <input
                type="text"
                className="form-control custom-input"
                id="title"
                required
                value={editData?.title || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="author" className="w-[15%] font-medium">Author*</label>
            <div className="w-[85%]">
              <input
                type="text"
                className="form-control custom-input"
                id="author"
                required
                value={editData?.author || ''}
                onChange={handleChange}
              />
            </div>
          </div>


          <div className="flex col-span-full items-center justify-start">
            <label htmlFor="content" className="w-[8%] font-medium">Content*</label>
            <div className="w-[100%]">
              <textarea
                className="form-control custom-input"
                id="content"
                rows="6"
                required
                value={editData?.content || ''}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="flex col-span-full items-start justify-start">
            <label htmlFor="image" className="w-[15%] font-medium mt-2">Image*</label>
            <div className={`${logo ? 'w-[40vw]' : 'w-[10vw]'}`}>
              <img
                src={logo || noImage}
                className="form-control cursor-pointer"
                alt="Blog Image"
                
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
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

export default EditBlogs;
