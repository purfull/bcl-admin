import React, { useEffect, useRef, useState } from 'react';
import noImage from '../../assets/images/no-images/no-image.png';
import { AppEnv } from '../../../config';

import { useReactToPrint } from "react-to-print";

const EditTestimonial = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [logo, setLogo] = useState(noImage);
  const fileInputRef = useRef(null);
  // const req = row.newTestimonial ? true : false;

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
            const response = await fetch(`${AppEnv.baseUrl}/testimonial/${row.Id}`);
            const result = await response.json();
            console.log(result , "Filtered Data");

            if (result) {

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
              setEditData(result.data);
              setLogo(result?.data?.image);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);


const componentRef = useRef(null);
const handlePrint = useReactToPrint({
  contentRef: componentRef,  
});

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
      // "name",
      "message": editData.message,
      "image":  logo,
      "designation": editData.designation,
      "isActive": editData.isActive
      }
      // console.log("data to send", dataToSend);
  
    
    try {
      const response = await fetch(`${req ? 'http://luxcycs.com:3000/testimonial/create-testimonial' :  'http://luxcycs.com:3000/testimonial/update-testimonial'}`, {
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
            <label htmlFor="name" className="w-[20%] font-medium">Customer</label>
            <div className="w-[80%]">
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={editData?.name || ''}
                onChange={handleChange}
              />
            </div>
          </div>

            
        

          <div className="flex items-center justify-start">
            <label htmlFor="message" className="w-[20%] font-medium">Order Id</label>
            <div className="w-[80%]">
              <input
                className="form-control"
                id="message"
                rows="4"
                required
                value={ ''}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-start">
          <label htmlFor="designation" className="w-[20%] font-medium">Order Type</label>
          <div className="w-[80%]">
              <select
                className="form-control"
                id="CountryId"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
              >
                  <option value="" >Online</option>
                  <option value="" >Cash On Delivery</option>
                
              </select>
              </div>
            </div>

          <div className="flex items-center justify-start">
            <label htmlFor="designation" className="w-[20%] font-medium">Payment Id</label>
            <div className="w-[80%]">
              <input
                type="text"
                className="form-control"
                id="designation"
                required
                value={editData?.designation || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-start">
          <label htmlFor="designation" className="w-[20%] font-medium">Order Status</label>
          <div className="w-[80%]">
              <select
                className="form-control"
                id="CountryId"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
              >
                  <option value="" >Shipped</option>
                  <option value="" >Delivered</option>
                
              </select>
              </div>
            </div>
          <div className="flex items-center justify-start">
            <label htmlFor="designation" className="w-[20%] font-medium">Total Amount</label>
            <div className="w-[80%]">
              <input
                type="text"
                className="form-control"
                id="designation"
                required
                value={editData?.designation || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="designation" className="w-[20%] font-medium">Ordered Date</label>
            <div className="w-[80%]">
              <input
                type="date"
                className="form-control"
                id="designation"
                required
                value={editData?.designation || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            
          <button
            type="button"
        onClick={handlePrint}
            className="ti-btn bg-[#046E3D] text-white !px-[20px] !py-[2px] !text-[18px]"
          >
            Download Invoice
          </button>
          </div>
        </div>

        {/* <div className="w-full sm:w-[70%] flex justify-between my-[4vh]">
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
        </div> */}

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
      <div className="mx-auto my-[10vh] w-full">
      <div className="w-[60%] mx-auto" ref={componentRef}>
          <div className="text-center w-full border">
            <h1 className="text-3xl font-bold">Thailash</h1>
            <p className="text-lg">THAILASH ORIGINAL THENNAMARAKUDI OIL</p>
            <p className="text-sm text-gray-500">3/127, Madhura Nagar, Plot No. 144, Sirangudi Puliyur, <br /> Nagapattinam - 611 104</p>
            <p className="text-sm text-gray-500 mb-2">Phone: 9597266083, 9003857938 | Email: thailashoil@gmail.com</p>
          </div>
          <table className="table-fixed border-collapse border border-gray-300 w-full text-left">
  <tbody>
    <tr>
      <td colSpan="6" className="border border-gray-300 px-4 py-2 break-words">
        <span className="font-bold">Invoice Number:</span>
      </td>
      <td colSpan="6" className="border border-gray-300 px-4 py-2 break-words">
        <span className="font-bold">Invoice Date:</span>
      </td>
    </tr>
    <tr>
      <td colSpan="6" className="border border-gray-300 px-4 py-2 !break-words" style={{wordWrap: 'break-word !important'}}>
        <span className="font-bold">Billing Address:</span> <br /><br />
        <p className="font-medium !break-words">Address Line 1, Address Line 2, <br />City, State, ZIP</p>
      </td>
      <td colSpan="6" className="border border-gray-300 px-4 py-2 !break-words">
        <span className="font-bold">Place Of Supply:</span> <br /><br />
        <p className="font-medium !break-words">Address Line 1, Address Line 2, <br /> City, State, ZIP</p>
      </td>
    </tr>
    <tr>
      <td colSpan="12" className="border border-gray-300 px-4 py-2 !break-words">
        <span className="font-bold">GSTIN: 33AAACFXXXXX1Z</span>
      </td>
    </tr>
  </tbody>
</table>


  <div className=" w-full">
  
    <table className="table-auto border-collapse border border-gray-300 w-full text-left max-w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">S.No</th>
          <th className="border border-gray-300 px-4 py-2">Particulars</th>
          <th className="border border-gray-300 px-4 py-2">Qty</th>
          <th className="border border-gray-300 px-4 py-2">Rate</th>
          <th className="border border-gray-300 px-4 py-2">Amount</th>
          <th className="border border-gray-300 px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">500ml bottle</td>
          <td className="border border-gray-300 px-4 py-2">10</td>
          <td className="border border-gray-300 px-4 py-2">120</td>
          <td className="border border-gray-300 px-4 py-2">1200</td>
          <td className="border border-gray-300 px-4 py-2" rowSpan="2">
            2200
          </td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">1L bottle</td>
          <td className="border border-gray-300 px-4 py-2">5</td>
          <td className="border border-gray-300 px-4 py-2">200</td>
          <td className="border border-gray-300 px-4 py-2">1000</td>
        </tr>
        <tr>
          <td colSpan="4" className="border border-gray-300 px-4 py-2 text-right font-bold">
            Tax 1 (10%):
          </td>
          <td colSpan="2" className="border border-gray-300 px-4 py-2">220</td>
        </tr>
        <tr>
          <td colSpan="4" className="border border-gray-300 px-4 py-2 text-right font-bold">
            Tax 2 (5%):
          </td>
          <td colSpan="2" className="border border-gray-300 px-4 py-2">110</td>
        </tr>
        <tr>
          <td colSpan="4" className="border border-gray-300 px-4 py-2 text-right font-bold">
            Tax 3 (2%):
          </td>
          <td colSpan="2" className="border border-gray-300 px-4 py-2">44</td>
        </tr>
        <tr>
          <td colSpan="4" className="border border-gray-300 px-4 py-2 text-right font-bold">
            Tax 4 (1%):
          </td>
          <td colSpan="2" className="border border-gray-300 px-4 py-2">22</td>
        </tr>
        <tr>
          <td colSpan="2" className="border border-gray-300 px-4 py-2 text-right font-bold">
            HSN Code: 30049011
          </td>
          <td colSpan="2" className="border border-gray-300 px-4 py-2 text-right font-bold">
            Total Amount:
          </td>
          <td colSpan="4" className="border border-gray-300 px-4 py-2 font-bold">2596</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


      </div>
    </div>
  );
};

export default EditTestimonial;
