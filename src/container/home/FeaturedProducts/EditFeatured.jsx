import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';
import { AppEnv } from '../../../../config';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import Chip from '@mui/material/Chip';

const EditFeatured = ({row,  onCancel }) => {

  const [data , setData ]  = useState();
  
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [apiResponse, setApiResponse] = useState(null); // State to store the API response

  const handleChange = (event) => {
    setSearchTerm(event.target.value); // Update the searchTerm state with input value
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      if (searchTerm) {
        try {
          const response = await fetch(`http://luxcycs.com:3000/api/admin/search/${searchTerm}`);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          if(data){
            setApiResponse(data); 
          }
        } catch (error) {
          console.error('Error fetching search data:', error);
          setApiResponse(null); // Optionally reset the response on error
        }
      } else {
        setApiResponse(null); // Clear response if searchTerm is empty
      }
    };

    fetchSearchData();
  }, [searchTerm])

  console.log(data , "ooooooooooooo")

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


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${AppEnv.baseUrl}/api/admin/products`);
            const result = await response.json();
            console.log(result , "Filtered Data");
            if (result) {
              setData(result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);



const handleSubmit = (event) => {
  event.preventDefault();    

};

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-start">
          <label htmlFor="search" className="w-[10%] font-medium">Product Name</label>
          <div className="w-[90%]">
            <input type="text" className="form-control" id="search" onChange={handleChange} />
          </div>
        </div>
        </div>
        <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data?.length && data.map((item, index) => (
            <div key={index} className="py-2">
              <div
                className="bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                {item.isBestSeller && (
                  <div className="flex justify-end">
                    <Chip
                      label="BEST SELLER"
                      className="bg-yellow-400 text-black font-bold rounded-tl-lg rounded-tr-lg"
                    />
                  </div>
                )}
                <CardMedia
                  component="img"
                  image={item.marketing_defaultImage_content || "https://www.smartflowsheet.com/Images/smartflow/smartflow-logo.png"}
                  sx={{maxWidth:'60%'}}
                  alt={item.product_name}
                  className="object-contain w-1/2 mx-auto max-h-40 transition-transform duration-500 transform hover:scale-125"
                />
                <CardContent className="px-1">
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    className="font-bold min-h-[50px] text-sm sm:text-base md:text-lg lg:text-lg flex items-center"
                  >
                    {item.marketing_displayName.length > 40 ? 
                      `${item.marketing_displayName.substring(0, 40)}...` : 
                      item.marketing_displayName}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500 text-sm sm:text-base" sx={{wordBreak:'break-word'}}>
                    {item.type}
                  </Typography>
                  <div className="min-h-[50px] max-h-[50px] pt-2">
                    <Typography variant="caption" className="text-gray-500 text-xs sm:text-sm">
                      {item.marketing_caption.length > 60 ? 
                        `${item.marketing_caption.substring(0, 60)}...` : 
                        item.marketing_caption}
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm">Starting at</span>
                      <div className="flex items-center text-sm sm:text-base">
                        <span className="font-bold mr-1">INR</span>
                        <span className="font-bold">{item.amount || "-"}</span>
                      </div>
                    </div>
                    <div>
                      <KeyboardArrowRight className="text-[#62c3da] border-2 border-[#62c3da] rounded-full" />
                    </div>
                  </div>
                  <div className="w-full flex justify-center" style={{marginTop:'5px'}}>
                    <button type="button" className="ti-btn ti-btn-primary-full w-full !px-[20px] !py-[2px] !text-[18px]">
                      Add to Featured
                    </button>
                  </div>
                </CardContent>
              </div>
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
