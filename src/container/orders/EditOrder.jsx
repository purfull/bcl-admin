import React, { useEffect, useRef, useState } from "react";
import noImage from "../../assets/images/no-images/no-image.png";
import { AppEnv } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { map } from "leaflet";

const EditTestimonial = ({ data = [], onCancel }) => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    customer_detials: {
      address: {
        city: "",
        country: "",
        postal_code: "",
        line1: "",
        line2: "",
        state: "",
      },
      email: "",
      name: "",
      phone: "",
    },

    order_detials: {
      description: "",
      quantity: "",
      object: "",
      amount_total: "",
    },
    asign_to: "",
    remarks: "",
    status: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => {
      // Custom logic for nested fields
      if (id.includes(".")) {
        const keys = id.split(".");
        const updatedData = { ...prevData };
        let temp = updatedData;
        for (let i = 0; i < keys.length - 1; i++) {
          temp[keys[i]] = { ...temp[keys[i]] };
          temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;
        return updatedData;
      }

      return { ...prevData, [id]: value };
    });
  };

  const mapToFormData = (source) => ({
    customer_detials: {
      address: {
        city: source?.customer_detials?.address?.city || "",
        country: source?.customer_detials?.address?.country || "",
        postal_code: source?.customer_detials?.address?.postal_code || "",
        line1: source?.customer_detials?.address?.line1 || "",
        line2: source?.customer_detials?.address?.line2 || "",
        state: source?.customer_detials?.address?.state || "",
      },
      email: source?.customer_detials?.email || "",
      name: source?.customer_detials?.name || "",
      phone: source?.customer_detials?.phone || "",
    },
    order_detials: {
      description: source?.order_detials?.description || "",
      quantity: source?.order_detials?.quantity || "",
      object: source?.order_detials?.object || "",
      amount_total: source?.order_detials?.amount_total || "",
    },
    asign_to: source?.asign_to || "",
    remarks: source?.remarks || "",
    status: source?.status || "",
  });

  useEffect(() => {
    if (data?.length > 0) {
      const incoming = mapToFormData(data[0]);
      setFormData(incoming);
    }
  }, [data]);

  // get by id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${AppEnv.baseUrl}/order/get-order/${id}`);
        const result = await res.json();
        if (result?.data) {
          console.log("Raw API result.data:", result.data); // before mapping
          const transformedData = mapToFormData(result.data);
          console.log(" Transformed formData:", transformedData); // after mapping
          setFormData(transformedData);
          toast.success("order Fetched success");
        } else {
          toast.error("Fetching failed");
        }
      } catch (error) {
        console.error("Error fetching order by ID:", error);
        toast.error("Failed to fetch order details.");
      }
    };

    if ((!data || data.length === 0) && id) {
      fetchData();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="pb-[10vh]">
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <ToastContainer />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label htmlFor="name" className="w-[25%] sm:w-[20%] font-medium">
              Name
            </label>
            <div className="w-[80%]">
              <input
                type="text"
                className="form-control"
                id="customer_detials.name"
                //disabled={row ? true : false}
                required
                value={formData.customer_detials.name || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="email" className="w-[25%] sm:w-[20%] font-medium">
              Email
            </label>
            <div className="w-[80%]">
              <input
                className="form-control"
                id="customer_detials.email"
                rows="4"
                required
                //disabled={row ? true : false}
                value={formData.customer_detials.email || ""}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="line1" className="w-[25%] sm:w-[20%] font-medium">
              Line1
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                className="form-control"
                id="customer_detials.address.line1"
                value={formData.customer_detials.address.line1 || ""}
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="line2" className="w-[25%] sm:w-[20%] font-medium">
              Line2
            </label>
            <div className="w-[80%]">
              <input
                className="form-control"
                //disabled={row ? true : false}
                value={formData.customer_detials.address.line2 || ""}
                id="customer_detials.address.line2"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="phone" className="w-[25%] sm:w-[20%] font-medium">
              Mobile No
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.customer_detials.phone || ""}
                className="form-control"
                id="customer_detials.phone"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label
              htmlFor="postal_code"
              className="w-[25%] sm:w-[20%] font-medium"
            >
              Pin
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.customer_detials.address.postal_code || ""}
                className="form-control"
                id="customer_detials.address.postal_code"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="country" className="w-[25%] sm:w-[20%] font-medium">
              Country
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.customer_detials.address.country || ""}
                className="form-control"
                id="customer_detials.address.country"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="City" className="w-[25%] sm:w-[20%] font-medium">
              City
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.customer_detials.address.city || ""}
                className="form-control"
                id="customer_detials.address.city"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="state" className="w-[25%] sm:w-[20%] font-medium">
              State
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.customer_detials.address.state || ""}
                className="form-control"
                id="customer_detials.address.state"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="object" className="w-[25%] sm:w-[20%] font-medium">
              Object
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.order_detials.object || ""}
                className="form-control"
                id="order_detials.object"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label
              htmlFor="description"
              className="w-[25%] sm:w-[20%] font-medium"
            >
              Description
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.order_detials.description || ""}
                className="form-control"
                id="order_detials.description"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label
              htmlFor="quantity"
              className="w-[25%] sm:w-[20%] font-medium"
            >
              Quantity
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.order_detials.quantity || ""}
                className="form-control"
                id="order_detials.quantity"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="remarks" className="w-[25%] sm:w-[20%] font-medium">
              Remarks
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.remarks || ""}
                className="form-control"
                id="remarks"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="status" className="w-[25%] sm:w-[20%] font-medium ">
              Status
            </label>
            <div className="w-[80%]">
              <select
                id="status"
                value={formData.status || ""}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Status</option>
                <option value="failed">order-failed</option>
                <option value="received">order-received</option>
                <option value="shipped">shipped</option>
                <option value="out-for-delivery">out-for-delivery</option>
                <option value="delivered">delivered</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="amount" className="w-[25%] sm:w-[20%] font-medium">
              Total Amount
            </label>
            <div className="w-[80%]">
              <input
                //disabled={row ? true : false}
                value={formData.order_detials.amount_total || ""}
                type="number"
                className="form-control"
                id="order_detials.amount_total"
                required
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
            className="ti-btn bg-[#2EAF4B] text-white !px-[20px] !py-[2px] !text-[18px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTestimonial;
