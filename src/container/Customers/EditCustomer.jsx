import React, { useEffect, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { AppEnv } from "../../../config";
import { CleaningServices } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

const EditCustomer = ({
  row,
  onCancel,
  createMessage,
  setCreateMessage,
  //handleEdit,
}) => {
  console.log(row, "ooooooooooo");

  const [editData, setEditData] = useState({
    // customerOrganization: "",
    // customerAddress: {
    //   street: "",
    //   city: "",
    //   state: "",
    //   zip: "",
    //   country: ""
    // },
    // customerName: "",
    // customerEmail: "",
    // customerTitle: "",
    // customerPhone: "",
    // customerDomain: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
    email: "",
    gst: "",
  });

  console.log(editData);

  const [custId, setCustId] = useState(null);

  useEffect(() => {
    if (row) {
      console.log("Prepopulating form with row:", row);
      setEditData({
        name: row.first_name || "",
        last_name: row.last_name || "",
        address: row.address || "",
        city: row.city || "",
        state: row.state || "",
        postal_code: row.postal_code || "",
        //country: row.country || "India",
        phone: row.phone || "",
        email: row.email || "",
        gst: row.gst || "",
      });
    }
  }, [row]);
  console.log(row);

  useEffect(() => {
    if (row?.newCustomer) {
    } else {
      setCustId(row.Id);
    }
  }, [row]);

  // useEffect(() => {
  //   const fetchCustomerData = async () => {
  //     if (custId) {
  //       try {
  //         const response = await fetch(
  //           // `${AppEnv.baseUrl}/user/get-user/${row.Id}`,
  //           `https://api.purfull.com/user/get-user/${custId}`,
  //           {
  //             method: "GET",
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }

  //         const data = await response.json();

  //         if (data) {
  //           console.log(data, "pppppppppppppppppppppp");
  //           setEditData(data?.data); //prepopulate
  //         }
  //       } catch (error) {
  //         console.error("Error fetching customer data:", error);
  //       }
  //     }
  //   };

  //   fetchCustomerData();
  // }, [custId]);

  const [] = useState(countryList().getData());

  const [countryOptions] = useState("India");

  const handleChange = (event) => {
    const { id, value } = event.target;

    console.log(id, value);

    // Check if id is for customerAddress
    if (id.startsWith("customerAddress.")) {
      const addressField = id.split(".")[1]; // Get the specific address field
      setEditData((prevData) => ({
        ...prevData,
        customerAddress: {
          ...prevData.customerAddress,
          [addressField]: value,
        },
      }));
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleCountryChange = (value) => {
    setEditData((prevData) => ({
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
      languageCode: "EN",
    };

    fetch(`${AppEnv.baseUrl}/customer/create-customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => setCreateMessage(data.message))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (createMessage) {
      console.log(createMessage);
      alert(createMessage);
    }
  }, [createMessage]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label
              htmlFor="first_name"
              className="w-[30%] sm:w-[25%] font-medium"
            >
              First Name
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="first_name"
                value={editData.first_name}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="last_name"
              className="w-[30%] sm:w-[25%] font-medium"
            >
              Last Name
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="last_name"
                value={editData.last_name}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="address" className="w-[30%] sm:w-[25%] font-medium">
              Address Line/Street
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="address"
                value={editData.address}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="city" className="w-[30%] sm:w-[25%] font-medium">
              City
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="city"
                value={editData.city}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="state" className="w-[30%] sm:w-[25%] font-medium">
              State
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="state"
                value={editData.state}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="postal_code"
              className="w-[30%] sm:w-[25%] font-medium"
            >
              Postal Code
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="postal_code"
                value={editData.postal_code}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="country" className="w-[30%] sm:w-[25%] font-medium">
              Country
            </label>
            <div className="w-[70%]">
              {/* <Select
                id="country"
                // value={countryOptions.find(option => option.value === editData.country)}
                value={"India"}
                onChange={handleCountryChange}
                options={countryOptions}
                isClearable
                disabled={row?.newCustomer != true ? true : false}
              /> */}
              <select
                disabled={row?.newCustomer != true ? true : false}
                className="form-control"
                id="country"
                // value={editData.CountryId || ''}
                onChange={handleChange}
              >
                <option value={"India"}>{"India"}</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="phone" className="w-[30%] sm:w-[25%] font-medium">
              Phone
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="phone"
                value={editData.phone}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="email" className="w-[30%] sm:w-[25%] font-medium">
              Email
            </label>
            <div className="w-[70%]">
              <input
                type="email"
                className="form-control"
                id="email"
                value={editData.email}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="customerTitle" className="w-[30%] font-medium">Age</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerTitle" value={editData.customerTitle} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="customerDomain" className="w-[30%] font-medium">Gender</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="customerDomain" value={editData.customerDomain} onChange={handleChange} />
            </div>
          </div> */}
          <div className="flex items-center justify-start">
            <label htmlFor="gst" className="w-[30%] sm:w-[25%] font-medium">
              GST
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="gst"
                value={editData.gst}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
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
            className="ti-btn !border !border-[#2EAF4B] text-[#2EAF4B] !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]"
          >
            Cancel
          </button>
          {row?.newCustomer && (
            <button
              type="submit"
              className="ti-btn bg-[#2EAF4B] text-white !px-[20px] !py-[2px] !text-[18px]"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
