import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { AppEnv } from '../../../config';

const EditCustomer = ({ row, onCancel }) => {
  console.log(row, "ooooooooooo");

  const [editData, setEditData] = useState({
    customerOrganization: "",
    customerAddress: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    customerName: "",
    customerEmail: "",
    customerTitle: "",
    customerPhone: "",
    customerDomain: "",
  });


  const [custId , setCustId] = useState(null);

  useEffect(()=>{
    if(row?.newCustomer){
    }else{
      setCustId('572724')
    }
  },[row])

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (custId) {
        try {
          const response = await fetch(`http://luxcycs.com:3000/api/admin/customer/get_customer/${custId}`);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          if(data){
            console.log(data , "pppppppppppppppppppppp")
          }
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      }
    };

    fetchCustomerData();
  }, [custId]);

  const [countryOptions] = useState(countryList().getData());


  const handleChange = (event) => {
    const { id, value } = event.target;

    // Check if id is for customerAddress
    if (id.startsWith('customerAddress.')) {
      const addressField = id.split('.')[1]; // Get the specific address field
      setEditData(prevData => ({
        ...prevData,
        customerAddress: {
          ...prevData.customerAddress,
          [addressField]: value,
        },
      }));
    } else {
      setEditData(prevData => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleCountryChange = (value) => {
    setEditData(prevData => ({
      ...prevData,
      customerAddress: {
        ...prevData.customerAddress,
        country: value.value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      ...editData,
      languageCode: "EN"
    };
    console.log(req);

    fetch(`${AppEnv.baseUrl}/api/admin/customer/create`, {
      method: 'POST',
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
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label htmlFor="customerOrganization" className="w-[30%] font-medium">Customer Organization</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerOrganization" value={editData.customerOrganization} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerName" className="w-[30%] font-medium">Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerName" value={editData.customerName} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerAddress.street" className="w-[30%] font-medium">Address Line/Street</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerAddress.street" value={editData.customerAddress.street} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerAddress.city" className="w-[30%] font-medium">City</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerAddress.city" value={editData.customerAddress.city} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerAddress.state" className="w-[30%] font-medium">State</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerAddress.state" value={editData.customerAddress.state} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerAddress.zip" className="w-[30%] font-medium">Postal Code</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerAddress.zip" value={editData.customerAddress.zip} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerAddress.country" className="w-[30%] font-medium">Country</label>
            <div className="w-[70%]">
              <Select
                id="customerAddress.country"
                value={countryOptions.find(option => option.value === editData.customerAddress.country)}
                onChange={handleCountryChange}
                options={countryOptions}
                isClearable
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerPhone" className="w-[30%] font-medium">Phone</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerPhone" value={editData.customerPhone} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerEmail" className="w-[30%] font-medium">Email</label>
            <div className="w-[70%]">
              <input type="email" className="form-control" id="customerEmail" value={editData.customerEmail} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerTitle" className="w-[30%] font-medium">Title</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerTitle" value={editData.customerTitle} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerDomain" className="w-[30%] font-medium">Domain</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerDomain" value={editData.customerDomain} onChange={handleChange} />
            </div>
          </div>
        </div>
        {/* <div className="w-1/2 flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="IsActive" className="font-medium mr-[1vw]">Is Active</label>
            <label className="switch">
              <input type="checkbox" id="IsActive" checked={editData.IsActive} onChange={(e) => setEditData(prevData => ({ ...prevData, IsActive: e.target.checked }))} />
              <span className="slider round"></span>
            </label>
          </div>
        </div> */}
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

export default EditCustomer;
