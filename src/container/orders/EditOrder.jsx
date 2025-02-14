import React, { useEffect, useRef, useState } from 'react';
import noImage from '../../assets/images/no-images/no-image.png';
import { AppEnv } from '../../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useReactToPrint } from "react-to-print";

const EditTestimonial = ({ data, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [logo, setLogo] = useState(noImage);
  const [row, setRow] = useState()
  const fileInputRef = useRef(null);
  const req = data.newOrder ? true : false;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("rowww ", data);
      setRow(data[0])
      try {
        const response = await fetch(`${AppEnv.baseUrl}/admin/products-by-sku/${data[0].sku}`);
        const result = await response.json();
        console.log(result, "Filtered Data");

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
    console.log("dataaa ", editData);
    const dataToSend = {
      // "name",
      // "message": editData.message,
      // "image": logo,
      // "designation": editData.designation,
      // "isActive": editData.isActive,
      "status": data[0]?.status,
      "orderId": data[0]?.orderId
    }
    console.log("data to send", dataToSend);

  
    try {
      // const response = await fetch(`${AppEnv.baseUrl}/order/create-order'`, {
      const response = await fetch(`${AppEnv.baseUrl}/order/update-status`, {
        method: 'POST',
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
    <div className='pb-[10vh]'>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <ToastContainer />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label htmlFor="name" className="w-[20%] font-medium">Customer</label>
            <div className="w-[80%]">
              <input
                type="text"
                className="form-control"
                id="name"
                disabled={row ? true : false}
                required
                value={row?.buyerName || ''}
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
                disabled={row ? true : false}
                value={row?.orderId || ''}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          {/* <div className="flex items-center justify-start">
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
          </div> */}

          {/* <div className="flex items-center justify-start">
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
          </div> */}

          <div className="flex items-center justify-start">
            <label htmlFor="address" className="w-[20%] font-medium">Address</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                className="form-control"
                id="address"
                value={row?.address || ""}
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="address_type" className="w-[20%] font-medium">Address Type</label>
            <div className="w-[80%]">
              <input
                className="form-control"
                disabled={row ? true : false}
                value={row?.address_type || ""}
                id="address_type"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="phone" className="w-[20%] font-medium">Mobile No</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.phone || ""}
                className="form-control"
                id="phone"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="postal_code" className="w-[20%] font-medium">Pin</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.pin || ""}
                className="form-control"
                id="postal_code"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="country" className="w-[20%] font-medium">Country</label>
            <div className="w-[80%]">
              <select
                disabled={row ? true : false}
                value={row?.country || ""}
                className="form-control"
                id="country"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              >
                <option >India</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="shipping_mode" className="w-[20%] font-medium">Shipping mode</label>
            <div className="w-[80%]">
              <select
                disabled={row ? true : false}
                value={row?.shipping_mode || ""}
                className="form-control"
                id="shipping_mode"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              >
                <option >Surface</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="invoice_number" className="w-[20%] font-medium">invoice Number</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.invoiceNumber || ""}
                className="form-control"
                id="invoice_number"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="transactionType" className="w-[20%] font-medium">Transaction type</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.transactionType || ""}
                className="form-control"
                id="transaction_type"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="City" className="w-[20%] font-medium">City</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.city || ""}
                className="form-control"
                id="City"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="state" className="w-[20%] font-medium">State</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.state || ""}
                className="form-control"
                id="state"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="sku" className="w-[20%] font-medium">Sku</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.sku || ""}
                className="form-control"
                id="sku"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="invoice_date" className="w-[20%] font-medium">Invoice Date</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.invoiceDate || ""}
                className="form-control"
                id="invoice_date"
                type="date"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="invoice_amount" className="w-[20%] font-medium">Invoice Amount</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.invoiceAmount || ""}
                className="form-control"
                id="state"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="tax_exclusive_gross" className="w-[20%] font-medium">Tax Exclusive Gross</label>
            <div className="w-[80%]">
              <input
                className="form-control"
                id="state"
                disabled={row ? true : false}
                value={row?.taxExclusiveGross || ""}
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="total_cost_amount" className="w-[20%] font-medium">Total Tax amount</label>
            <div className="w-[80%]">
              <input
                className="form-control"
                id="state"
                disabled={row ? true : false}
                value={row?.totalTaxAmount || ""}
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="cgs_tax" className="w-[20%] font-medium">Cgs Tax</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.cgstTax || ""}
                className="form-control"
                id="cgs_tax"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="sgst_tax" className="w-[20%] font-medium">Sgst Tax</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.sgstTax || ""}
                className="form-control"
                id="sgst_tax"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="utgst_tax" className="w-[20%] font-medium">utgst Tax</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.utgstTax || ""}
                className="form-control"
                id="utgst_tax"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="igst_tax" className="w-[20%] font-medium">igst Tax</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.igstTax || ""}
                className="form-control"
                id="igst_tax"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="customer_bill_to_gst" className="w-[20%] font-medium">Customer Bill To Gst</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.customerBillToGST || ""}
                className="form-control"
                id="customer_bill_to_gst"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="total_product_cost" className="w-[20%] font-medium">Total Product Cost</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.total_product_cost || ""}
                className="form-control"
                id="total_product_cost"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="total_shipment_cost" className="w-[20%] font-medium">Total Shipment Cost</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.total_shipment_cost || ""}
                className="form-control"
                id="total_shipment_cost"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="way_bill" className="w-[20%] font-medium">Way Bill</label>
            <div className="w-[80%]">
              <input
                className="form-control"
                id="way_bill"
                disabled={row ? true : false}
                value={row?.waybill || ""}
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="payment" className="w-[20%] font-medium">Payment</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.payment || ""}
                className="form-control"
                id="payment"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-start">
            <label htmlFor="remarks" className="w-[20%] font-medium">Remarks</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.remarks || ""}
                className="form-control"
                id="remarks"
                // defaultValue={editData.CountryId || ''}
                // onChange={handleCountryChange}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* <div className="flex items-center justify-start">
            <label htmlFor="designation" className="w-[20%] font-medium">Order Status</label>
            <div className="w-[80%]">
              <select
                disabled={row ? true : false}
                value={row?.cgstTax || ""}
                className="form-control"
                id="CountryId"
              // defaultValue={editData.CountryId || ''}
              // onChange={handleCountryChange}
              >
                <option value="" >Shipped</option>
                <option value="" >Delivered</option>

              </select>
            </div>
          </div> */}

          <div className="flex items-center justify-start">
            <label htmlFor="designation" className="w-[20%] font-medium">Total Amount</label>
            <div className="w-[80%]">
              <input
                disabled={row ? true : false}
                value={row?.invoiceAmount || ""}
                type="text"
                className="form-control"
                id="designation"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          {/* <div className="flex items-center justify-start">
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
          </div> */}

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
      {/* invoice container  */}
      {/* <div className="mx-auto my-[10vh] w-full">
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


      </div> */}
      {/* 
      {
    "id": 1,
    "address": "54",
    "address_type": "home",
    "phone": "9360389903",
    "name": "s.n. sanjay",
    "pin": 629002,
    "order": "CUST_ORDER_202501193909",
    "country": "India",
    "shipping_mode": "Surface",
    "invoiceNumber": "202501193909",
    "invoiceDate": "2025-01-19",
    "transactionType": "Pre-paid",
    "orderId": "CUST_ORDER_202501193909",
    "quantity": 1,
    "sku": "id123",
    "city": "Nagercoil",
    "state": "Tamil Nadu",
    "invoiceAmount": "200",
    "taxExclusiveGross": "132",
    "totalTaxAmount": "18",
    "cgstTax": "9",
    "sgstTax": "9",
    "utgstTax": "0",
    "igstTax": "0",
    "customerBillToGST": "",
    "buyerName": "s.n. sanjay",
    "total_product_cost": "150",
    "total_shipment_cost": "50",
    "waybill": "34202610000383",
    "payment": "Pre-paid",
    "remarks": "",
    "status": "Success",
    "createdAt": "2025-01-19T07:06:00.000Z",
    "updatedAt": "2025-01-19T07:06:00.000Z"
}
       */}
      <div ref={componentRef} style={{ width: "100%" }}>
        <div style={{ textAlign: "center", width: "100%", border: "1px solid #ccc", padding: "0.5rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>Thailash</h1>
          <p style={{ fontSize: "1.125rem" }}>THAILASH ORIGINAL THENNAMARAKUDI OIL</p>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            3/127, Madhura Nagar, Plot No. 144, Sirangudi Puliyur, <br /> Nagapattinam - 611 104
          </p>
        </div>

        <table style={{ borderCollapse: "collapse", border: "1px solid #d1d5db", width: "100%", textAlign: "left" }}>
          <tbody>
            <tr>
              <td colSpan="6" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                Invoice Number: {row?.invoiceNumber}
              </td>
              <td colSpan="6" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                Invoice Date: {row?.invoiceDate}
              </td>
            </tr>
            <tr>
              <td colSpan="6" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                <span style={{ fontWeight: "bold" }}>Billing Address:</span> <br />
                <p style={{ fontWeight: "500" }}>
                  {row?.address} <br /> {row?.city}, {row?.state}, {row?.country}
                </p>
              </td>

              <td colSpan="6" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                <span style={{ fontWeight: "bold" }}>Place Of Supply:</span> <br />
                <p style={{ fontWeight: "500" }}>
                  {row?.address} <br /> {row?.city}, {row?.state}, {row?.country}
                </p>
              </td>
            </tr>
            <tr>
              <td colSpan="12" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                GSTIN: {row?.customerBillToGST}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ width: "100%" }}>
          <table style={{ borderCollapse: "collapse", border: "1px solid #d1d5db", width: "100%", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#e5e7eb" }}>
                <th style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>S.No</th>
                <th style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>Particulars</th>
                <th style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>Qty</th>
                <th style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>Rate</th>
                <th style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>Discount</th>
                <th style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>Amount</th>
                <th style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>Taxable Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>1</td>
                <td style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>{editData?.name}</td>
                <td style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>{row?.quantity}</td>
                <td style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                  {/* {parseInt(row?.offer_price || 0) - parseInt(row?.totalTaxAmount || 0)} */}
                  {parseInt(editData?.offer_price || 0)}
                </td>
                <td style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>{row?.transactionType == "Pre-paid" ? "10%":"-"}</td>
                <td style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                  {/* {row?.taxExclusiveGross} */}
                  {(((parseInt(editData?.offer_price) / 112 ) * 100) * parseInt(row?.quantity)).toFixed(2)}
                </td>
                <td style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                  {/* {row?.taxExclusiveGross} */}
                  {(((parseInt(editData?.offer_price) / 112 ) * 100) * row?.quantity).toFixed(2)}
                  {/* {parseInt(row?.invoiceAmount) - parseInt(row?.totalTaxAmount)} */}
                  </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right", fontWeight: "bold" }}>
                  SGST :
                </td>
                <td colSpan="2" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                  {row?.sgstTax}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right", fontWeight: "bold" }}>
                  CGST :
                </td>
                <td colSpan="2" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                  {row?.cgstTax}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right", fontWeight: "bold" }}>
                  IGST:
                </td>
                <td colSpan="2" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                  {row?.igstTax}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right", fontWeight: "bold" }}>
                  UTGST:
                </td>
                <td colSpan="2" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                  {row?.utgstTax}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right", fontWeight: "bold" }}>
                  Total GST Amount:
                </td>
                <td colSpan="2" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                  {row?.totalTaxAmount}
                </td>
              </tr>
              <tr>
                <td colSpan="5" style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right", fontWeight: "bold" }}>
                  Roundoff:
                </td>
                <td colSpan="2" style={{ border: "1px solid #d1d5db", padding: "0.5rem" }}>
                 {(Math.abs(parseFloat(row?.invoiceAmount) - (
  (Number(row?.totalTaxAmount) || 0) + 
  (((parseInt(editData?.offer_price) || 0) / 112) * 100 * (Number(row?.quantity) || 0))
))).toFixed(2)}


                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "center", fontWeight: "bold" }}>
                  HSN Code: 30049011 GST: 12%
                </td>
                <td colSpan="2" style={{ border: "1px solid #d1d5db", padding: "0.5rem", textAlign: "right", fontWeight: "bold" }}>
                  Total Invoice Amount:
                </td>
                <td colSpan="4" style={{ border: "1px solid #d1d5db", padding: "0.5rem", fontWeight: "bold" }}>
                  {row?.invoiceAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div className="flex items-center justify-center mt-5">

        <button
          type="button"
          onClick={handlePrint}
          className="ti-btn bg-[#046E3D] text-white !px-[20px] !py-[2px] !text-[18px]"
        >
          Download Invoice
        </button>
      </div>

      {/* <button
        type="button"
        onClick={handlePrint}
        className="ti-btn bg-[#046E3D] text-white !px-[20px] !py-[2px] !text-[18px]"
      >
        Download Invoice
      </button> */}

    </div>
  );
};

export default EditTestimonial;