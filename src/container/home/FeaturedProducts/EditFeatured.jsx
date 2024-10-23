import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';

const EditFeatured = ({row,  onCancel }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [logo, setLogo] = useState(noImage);
  const [state, setState] = useState(false)
  // console.log(row);
  
  const req = row.newBranch ? true : false


  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editData);
    

  };



  const products = [
    {
      title: "Aruba Instant On",
      subtitle: "By Hewlett Packard",
      image: "https://via.placeholder.com/150", // Replace with actual image URLs
      price: "9,430",
      tags: ["BEST SELLER"]
    },
    {
      title: "Quick Heal Antivirus Pro",
      subtitle: "By Quick Heal",
      image: "https://via.placeholder.com/150",
      price: "360",
      tags: ["NEWLY ADDED"]
    },
    {
      title: "Smartflo — Cloud Telephony Solutions",
      subtitle: "By Tata Teleservices",
      image: "https://via.placeholder.com/150",
      price: "8,950",
      tags: ["SPONSORED"]
    },
    {
      title: "Busy Accounting Software",
      subtitle: "By Busy Infotech",
      image: "https://via.placeholder.com/150",
      price: "9,000",
      tags: ["SPONSORED"]
    },
  ];


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-start">
          <label htmlFor="role" className="w-[10%] font-medium">Product Name</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="role" onChange={handleChange} />
          </div>
        </div>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-1">
            {products.map((product, index) => (
              <div className="border rounded-lg shadow-md p-4 m-4 flex flex-col justify-between bg-white">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-yellow-200 text-yellow-800 font-medium text-xs px-2 py-1 rounded-md mr-2">{tag}</span>
                ))}
                <img src={product.image} alt={product.title} className="w-full h-40 object-contain my-2" />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <h4 className="text-gray-500">{product.subtitle}</h4>
                <p className="mt-2 text-xl font-bold">{`Starting at INR ${product.price}`}</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  View Details
                </button>
              </div>
            ))}
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

export default EditFeatured;
