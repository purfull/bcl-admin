import React, { useEffect, useState, useRef } from "react";
import { Buffer } from "buffer";
import { AppEnv } from "../../../config";
// import "./org.css";
import noImage from "../../assets/images/no-images/no-image.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json } from "react-router-dom";
import axios from "axios";

const EditDelivery = ({ row, onCancel, onSave }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [logo, setLogo] = useState(noImage);
  //console.log(onSave);

  const fileInputRef = useRef(null);
  const req = row.newDelivery ? "POST" : "PUT";

  useEffect(() => {
    if (row.newDelivery) return;

    const abortController = new AbortController();
    // console.log(row);

    fetch(`${AppEnv.baseUrl}/product/get-product/${row.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setEditData(data.data);
        //setLogo(data.data.image);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error fetching product:", err);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  // useEffect(() => {
  //       if (editData && editData.Logo) {
  //           // Convert the buffer data to a Base64 string
  //           const bufferData = editData.Logo.data;
  //           const base64String = Buffer.from(bufferData).toString('base64');
  //           setLogo(`data:image/png;base64,${base64String}`);
  //       }
  //   }, [editData]);

  // console.log(editData);

  // if (editData.Logo) {
  //   setLogo(`data:image/png;base64,${editData.Logo.data}`);
  // }
  // if (data.organisation[0].QR) {
  //   setQrCode(`data:image/png;base64,${data.organisation[0].QR}`);
  // }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCountryChange = (event) => {
    setEditData((prevData) => ({
      ...prevData,
      CountryId: event.target.value,
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

  // const handleAddress = (event) => {
  //   event.preventDefault();
  //   fetch(`${AppEnv.baseUrl}/address`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (row.newDelivery) {
      handleSave();
    } else {
      handleUpdate();
    }
  };

  //payload for product creation
  const handleSave = async () => {
    const createdProduct = {
      name: editData.name || "",
      phone: editData.phone || "",
      email: editData.email || "",
      country: editData.country || "",
      state: editData.state || "",
      areas: editData.areas || "",
    };

    // console.log("API base URL:", AppEnv.baseUrl);
    // console.log("Payload:", createdProduct);

    // try {
    //   const response = await axios.post(
    //     `${AppEnv.baseUrl}/product/create-product`,
    //     createdProduct,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log("Data saved successfully", response.data);
    //   toast.success("delivery done successfully");

    //   if (response.data.success) {
    //     onSave();
    //     console.log("saved");
    //   }
    // } catch (error) {
    //   console.error("Error creating delivery:", error);
    //   toast.error("Failed delivery");
    // }
  };

  //update
  const handleUpdate = async () => {
    const updateProduct = {
      name: editData.name || "",
      phone: editData.phone || "",
      email: editData.email || "",
      country: editData.country || "",
      state: editData.state || "",
      areas: editData.areas || "",
    };
    console.log("updatedProduct", updateProduct);

    try {
      const response = await axios.put(
        `${AppEnv.baseUrl}/delivery/update-delivery/${row.id}`,
        updateProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Product updated successfully", response.data);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
    // After save is successful, call onSave prop
    if (response.data.success) {
      onSave();
      console.log("updated");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[4vh]">
          <div className="flex items-center justify-start">
            <label
              htmlFor="Name"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5  font-medium"
            >
              Name
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="name"
                value={editData.name || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label
              htmlFor="phone"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5  font-medium "
            >
              Phone
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="phone"
                value={editData.phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="email"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Email
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="email"
                value={editData.email || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="country"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Country
            </label>
            <div className="w-[70%]">
              <input
                type="number"
                className="form-control"
                id="country"
                value={editData.country || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="state"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              State
            </label>
            <div className="w-[70%]">
              <input
                className="form-control"
                id="state"
                value={editData.state || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="areas"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Delivery Areas
            </label>
            <div className="w-[70%]">
              <input
                type="number"
                className="form-control"
                id="areas"
                value={editData.areas || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="password"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Password
            </label>
            <div className="w-[70%]">
              <input
                className="form-control"
                id="password"
                value={editData.password || ""}
                onChange={handleChange}
              />
            </div>
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
          <button
            type="submit"
            onClick={handleSubmit}
            className="ti-btn bg-[#2EAF4B] text-white !px-[20px] !py-[2px] !text-[18px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDelivery;
