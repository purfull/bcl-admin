import React, { useEffect, useState, useRef } from "react";
import { Buffer } from "buffer";
import { AppEnv } from "../../../config";
// import "./org.css";
import noImage from "../../assets/images/no-images/no-image.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json } from "react-router-dom";
import axios from "axios";

const EditProducts = ({ row, onCancel, onSave }) => {
  const [editData, setEditData] = useState({});
  const [logo, setLogo] = useState(noImage);
  //console.log(onSave);

  const fileInputRef = useRef(null);
  // const req = row.newProducts ? "POST" : "PUT";

  useEffect(() => {
    if (row.newProducts || !row?.id) return;

    const abortController = new AbortController();
    console.log(row);

    fetch(`${AppEnv.baseUrl}/product/get-product/${row?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        const normalizedStatus =
          data.data.status?.toLowerCase() === "active" ? "Active" : "Inactive";

        setEditData({ ...data.data, status: normalizedStatus });
        //setLogo(data.data.image);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error fetching product:", err);
        }
      });
    console.log("Product ID from row:", row?.id);

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

    if (id.includes(".")) {
      const [parent, child] = id.split(".");

      setEditData((prevData) => ({
        ...prevData,
        [parent]: {
          ...(prevData[parent] || {}),
          [child]: value,
        },
      }));
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
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
    if (row.newProducts) {
      handleSave();
    } else {
      handleUpdate();
    }
  };

  //payload for product creation
  const handleSave = async () => {
    const createdProduct = {
      //name: editData.name || "",
      name: {
        en: editData.name?.name_en || "",
        tn: editData.name?.name_tn || "",
      },
      description: {
        en: editData.description?.desc_en || "",
        tn: editData.description?.desc_tn || "",
      },
      thumbnail_image: editData.thumbnail_image || "",
      product_image: editData.product_image || "",
      price: editData.price || "",
      offer_price: editData.offer_price || "",
      category: editData.category || "",
      quantity_available: editData.quantity_available || "",
      status:
        editData.status?.toLowerCase() === "active" ? "Active" : "Inactive",
    };

    console.log("API base URL:", AppEnv.baseUrl);
    console.log("Payload:", createdProduct);

    try {
      const response = await axios.post(
        `${AppEnv.baseUrl}/product/create-product`,
        createdProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data saved successfully", response.data);
      toast.success("Product created successfully");

      if (response.data.success) {
        onSave();
        console.log("saved");
      }
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    }
  };

  //update
  const handleUpdate = async () => {
    const updateProduct = {
      name: {
        en: editData.name?.name_en || "",
        tn: editData.name?.name_tn || "",
      },
      description: {
        en: editData.description?.desc_en || "",
        tn: editData.description?.desc_tn || "",
      },
      thumbnail_image: editData.thumbnail_image || "",
      product_image: editData.product_image || "",
      price: editData.price || "",
      offer_price: editData.offer_price || "",
      category: editData.category || "",
      quantity_available: editData.quantity_available || "",
      status:
        editData.status?.toLowerCase() === "active" ? "Active" : "Inactive",
    };
    console.log("updatedProduct", updateProduct);

    try {
      const response = await axios.put(
        `${AppEnv.baseUrl}/product/update-product/${row?.id}`,
        updateProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.success) {
        console.log("Product updated successfully", response.data);
        toast.success("Product updated successfully");
      } else {
        toast.error("Failed to update product");
      }
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

        <div className="bg-slate-100 mb-[4vh] py-1 px-4 col-span-full">
          <h5>English</h5>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[4vh]">
          <div className="flex items-center justify-start">
            <label
              htmlFor="name"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Name
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="name?.en"
                value={editData.name?.en || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="description"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Description
            </label>
            <div className="w-[70%] flex">
              <input
                type="text"
                className="form-control"
                id="description?.desc_en"
                value={editData.description?.desc_en || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-100 mb-[4vh] py-1 px-4">
          <h5>Tamil</h5>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[4vh]">
          <div className="flex items-center justify-start">
            <label
              htmlFor="name"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5  font-medium "
            >
              Name
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="name?.name_tn"
                value={editData.name?.name_tn || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="description" className="w-[30%] font-medium ">
              Description
            </label>
            <div className="w-[70%] flex">
              <input
                type="text"
                className="form-control"
                id="description?.desc_tn"
                value={editData.description?.desc_tn || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start justify-start">
          <label
            htmlFor="name"
            className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium mt-4"
          >
            Product Image
          </label>
          <div className="w-[15vw] mt-4">
            <img
              src={logo || noImage}
              className="form-control cursor-pointer"
              name="image"
              value={editData.product_image}
              id="product_image"
              alt="logo"
              onClick={handleImageClick}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[4vh]">
          {/* <div className="flex items-center justify-start">
            <label
              htmlFor="productName"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5  font-medium"
            >
              Products Name
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
          </div> */}

          <div className="flex items-center justify-start">
            <label
              htmlFor="size"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Category
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="category"
                value={editData.category || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="price"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5  font-medium "
            >
              Price
            </label>
            <div className="w-[70%]">
              <input
                type="number"
                className="form-control"
                id="price"
                value={editData.price || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="offer_price"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Offer Price
            </label>
            <div className="w-[70%]">
              <input
                type="number"
                className="form-control"
                id="offer_price"
                value={editData.offer_price || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="quantity_available"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Quantity Available
            </label>
            <div className="w-[70%]">
              <input
                type="number"
                className="form-control"
                id="quantity_available"
                value={editData.quantity_available || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label
              htmlFor="status"
              className="w-[30%] sm:w-[25%] ml-0 sm:ml-5 font-medium "
            >
              Status
            </label>
            <div className="w-[70%]">
              {/* <input type="text" className="form-control" id="sku" value={editData.sku || ''} onChange={handleChange} /> */}
              <div className="w-[100%]">
                <select
                  id="status"
                  name="status"
                  className="form-control "
                  value={editData.status || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full sm:w-[70%] flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="isActive" className="font-medium mr-[1vw]">Is Featured</label>
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

export default EditProducts;
