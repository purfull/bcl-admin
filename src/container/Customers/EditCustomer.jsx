import React, { useEffect, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { AppEnv } from "../../../config";
import { CleaningServices } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCustomer = ({
  row,
  onCancel,
  createMessage,
  setCreateMessage,
  //handleEdit,
}) => {
  console.log(row, "ooooooooooo");

  const [editData, setEditData] = useState({
    name: "",
    email: "",

    // city: "",
    // state: "",
    address: {
      address: "",
      zip_code: "",
      country: "",
      location: "",
    },

    status: "",
  });
  const [locationStr, setLocationStr] = useState("");

  console.log(editData);

  const [custId, setCustId] = useState(null);

  useEffect(() => {
    if (row) {
      console.log("Prepopulating form with row:", row);
      console.log("row.address.location actual value:", row.address?.location);
      const latLng =
        typeof row.address?.location === "object"
          ? row.address.location
          : { lat: "", lng: "" };

      console.log("latLng KKKK extracted from row.address.location:", latLng);
      setEditData({
        name: row.name || "",
        email: row.email || "",

        address: {
          address: row.address?.address || "",
          zip_code: row.address?.zip_code || "",
          country: row.address?.country || "",
          location: latLng || "",
        },
        //city: row.city || "",
        //state: row.state || "",

        status: row?.status?.toLowerCase() === "active" ? "Active" : "Inactive",
      });
      if (latLng.lat && latLng.lng) {
        setLocationStr(`${latLng.lat} ${latLng.lng}`);
      } else {
        setLocationStr("");
      }
      console.log("latLng extracted from row.location:", latLng);
    }
  }, [row]);
  console.log(row);

  useEffect(() => {
    if (row?.newCustomer) {
    } else {
      setCustId(row.Id);
    }
  }, [row]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (custId) {
        try {
          const response = await fetch(
            //`${AppEnv.baseUrl}/user/get-user/${row.Id}`,
            `https://api.purfull.com/user/get-user/${custId}`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          if (data) {
            console.log(data, "pppppppppppppppppppppp");
            setEditData(data?.data); //prepopulate
            toast.success("successfully fetched customer data.");
          } else {
            toast.error("Error fetching customer data.");
          }
        } catch (error) {
          toast.error("Error fetching customer data.");
          console.error("Error fetching customer data:", error);
        }
      }
    };

    fetchCustomerData();
  }, [custId]);

  const [] = useState(countryList().getData());

  const [countryOptions] = useState("India");

  // const handleChange = (event) => {
  //   const { id, value } = event.target;

  //   console.log(id, value);

  //   // Check if id is for customerAddress
  //   if (id.startsWith("customerAddress.")) {
  //     const addressField = id.split(".")[1]; // Get the specific address field
  //     setEditData((prevData) => ({
  //       ...prevData,
  //       customerAddress: {
  //         ...prevData.customerAddress,
  //         [addressField]: value,
  //       },
  //     }));
  //   } else {
  //     setEditData((prevData) => ({
  //       ...prevData,
  //       [id]: value,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "lat" || id === "lng") {
      setEditData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          location: {
            ...prev.address.location,
            [id]: value,
          },
        },
      }));
    } else if (["address", "zip_code", "country"].includes(id)) {
      setEditData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [id]: value,
        },
      }));
    } else {
      setEditData((prev) => ({
        ...prev,
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
  };
  //   fetch(`${AppEnv.baseUrl}/customer/create-customer`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataToSend),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setCreateMessage(data.message))
  //     .catch((error) => console.error("Error:", error));
  // };

  // useEffect(() => {
  //   if (createMessage) {
  //     console.log(createMessage);
  //     alert(createMessage);
  //   }
  // }, [createMessage]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label htmlFor="name" className="w-[30%] sm:w-[25%] font-medium">
              Name
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="name"
                value={editData.name}
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
                value={editData.address.address}
                onChange={handleChange}
                disabled={row?.newCustomer != true ? true : false}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label
              htmlFor="zip_code"
              className="w-[30%] sm:w-[25%] font-medium"
            >
              Zip Code
            </label>
            <div className="w-[70%]">
              <input
                type="number"
                className="form-control"
                id="zip_code"
                value={editData.address.zip_code}
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
              <input
                type="text"
                className="form-control"
                id="country"
                value={editData.address.country}
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
          <div className="flex items-center justify-start">
            <label
              htmlFor="status"
              className="w-[30%] sm:w-[25%] ml-0  font-medium "
            >
              Status
            </label>
            <div className="w-[70%]">
              <select
                id="status"
                value={editData.status || ""}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-start w-full sm:col-span-1">
            <label
              htmlFor="location"
              className="w-[30%] sm:w-[25%] font-medium"
            >
              Location
            </label>
            <div className="w-[70%]">
              <input
                //type="text"
                id="location"
                className="form-control"
                value={locationStr}
                onChange={(e) => {
                  const [lat, lng] = value.trim().split(" ");
                  setLocationStr(e.target.value);
                  setEditData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      location: {
                        lat: lat || "",
                        lng: lng || "",
                      },
                    },
                  }));
                }}
                disabled={!row?.newCustomer}
                //placeholder="Enter as: latitude longitude"
              />
            </div>
          </div>

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
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
