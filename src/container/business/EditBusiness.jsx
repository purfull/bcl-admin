import React, { useState, useEffect } from 'react';
import noImage from '../../assets/images/no-images/no-image.png';
import { ResponsiveBusinessDataTable } from './commonTables';

const EditBusiness = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('businessInfo'); // Default active tab
  const [businessServices, setBusinessServices] = useState([]);
  const [businessSpecialists, setBusinessSpecialists] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [specialistTransfers, setSpecialistTransfers] = useState([]);


  useEffect(() => {
    const initialServices = [
      { id: 1, serviceCode: 'SVC001', serviceName: 'Service One', duration: 30, tokens: 10 },
      { id: 2, serviceCode: 'SVC002', serviceName: 'Service Two', duration: 45, tokens: 15 },
      { id: 3, serviceCode: 'SVC003', serviceName: 'Service Three', duration: 60, tokens: 20 },
      { id: 4, serviceCode: 'SVC004', serviceName: 'Service Four', duration: 90, tokens: 25 },
      { id: 5, serviceCode: 'SVC005', serviceName: 'Service Five', duration: 120, tokens: 30 },
    ];

    setBusinessServices(initialServices);
  }, []);

  useEffect(() => {
    const initialSpecialists = [
      { id: 1, specialistId: 'SP001', specialistName: 'Dr. Alice', ratingValue: 4.5, status: 'Active' },
      { id: 2, specialistId: 'SP002', specialistName: 'Dr. Bob', ratingValue: 4.0, status: 'Inactive' },
      { id: 3, specialistId: 'SP003', specialistName: 'Dr. Charlie', ratingValue: 5.0, status: 'Active' },
      { id: 4, specialistId: 'SP004', specialistName: 'Dr. David', ratingValue: 3.5, status: 'Active' },
      { id: 5, specialistId: 'SP005', specialistName: 'Dr. Eve', ratingValue: 4.2, status: 'Inactive' },
    ];

    setBusinessSpecialists(initialSpecialists);
  }, []);

  useEffect(() => {
    const initialAppointments = [
      { id: 1, appointmentNo: 'APT001', appointmentDate: '2024-09-15', appointmentTime: '10:00 AM', totalCoinsPaid: 50, appointmentStatus: 'Confirmed', paymentStatus: 'Paid', member: 'John Doe', specialist: 'Dr. Alice' },
      { id: 2, appointmentNo: 'APT002', appointmentDate: '2024-09-16', appointmentTime: '11:00 AM', totalCoinsPaid: 30, appointmentStatus: 'Pending', paymentStatus: 'Unpaid', member: 'Jane Smith', specialist: 'Dr. Bob' },
      { id: 3, appointmentNo: 'APT003', appointmentDate: '2024-09-17', appointmentTime: '01:00 PM', totalCoinsPaid: 20, appointmentStatus: 'Cancelled', paymentStatus: 'Refunded', member: 'Alice Johnson', specialist: 'Dr. Charlie' },
      { id: 4, appointmentNo: 'APT004', appointmentDate: '2024-09-18', appointmentTime: '02:00 PM', totalCoinsPaid: 40, appointmentStatus: 'Confirmed', paymentStatus: 'Paid', member: 'David Wilson', specialist: 'Dr. David' },
      { id: 5, appointmentNo: 'APT005', appointmentDate: '2024-09-19', appointmentTime: '03:00 PM', totalCoinsPaid: 60, appointmentStatus: 'Completed', paymentStatus: 'Paid', member: 'Eve Thompson', specialist: 'Dr. Eve' },
    ];

    setAppointments(initialAppointments);
  }, []);

  useEffect(() => {
    const initialTransfers = [
      { id: 1, transferNo: 'TRF001', transferDate: '2024-09-15', points: 100, action: 'Transferred' },
      { id: 2, transferNo: 'TRF002', transferDate: '2024-09-16', points: 200, action: 'Received' },
      { id: 3, transferNo: 'TRF003', transferDate: '2024-09-17', points: 150, action: 'Pending' },
      { id: 4, transferNo: 'TRF004', transferDate: '2024-09-18', points: 300, action: 'Transferred' },
      { id: 5, transferNo: 'TRF005', transferDate: '2024-09-19', points: 250, action: 'Cancelled' },
    ];

    setSpecialistTransfers(initialTransfers);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmitBusinessInfo = (event) => {
    event.preventDefault();
    console.log("Business Info Data:", editData);
  };

  const handleSubmitBusinessServices = (event) => {
    event.preventDefault();
    console.log("Business Services Data:", editData);
  };

  const handleSubmitBusinessSpecialist = (event) => {
    event.preventDefault();
    console.log("Business Specialist Data:", editData);
  };

  const handleSubmitAppointments = (event) => {
    event.preventDefault();
    console.log("Appointments Data:", editData);
  };

  const handleSubmitReviewsAndRatings = (event) => {
    event.preventDefault();
    console.log("Reviews and Ratings Data:", editData);
  };

  const handleSubmitSpecialistTransfer = (event) => {
    event.preventDefault();
    console.log("Specialist Transfer Data:", editData);
  };

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'businessInfo' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('businessInfo')}
              type="button"
            >
              Business Info
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'businessServices' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('businessServices')}
              type="button"
            >
              Business Services
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'businessSpecialist' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('businessSpecialist')}
              type="button"
            >
              Business Specialist
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'appointments' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('appointments')}
              type="button"
            >
              Appointments
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'reviewsAndRatings' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('reviewsAndRatings')}
              type="button"
            >
              Reviews and Ratings
            </button>
          </li>
          <li role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'specialistTransfer' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('specialistTransfer')}
              type="button"
            >
              Specialist Transfer
            </button>
          </li>
        </ul>
      </div>
      <div id="default-styled-tab-content">
        {activeTab === 'businessInfo' && (
          <form onSubmit={handleSubmitBusinessInfo}>
            {/* Business Info form fields here */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-start">
                  <label htmlFor="businessName" className="w-[30%] font-medium">Business Name</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="businessName" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="displayName" className="w-[30%] font-medium">Display Name</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="displayName" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="category" className="w-[30%] font-medium">Category</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="category" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="mobileNo" className="w-[30%] font-medium">Mobile No</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="mobileNo" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="email" className="w-[30%] font-medium">Mail</label>
                  <div className="w-[70%]">
                    <input type="email" className="form-control" id="email" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="regNo" className="w-[30%] font-medium">Reg No</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="regNo" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="addressLine1" className="w-[30%] font-medium">Address Line 1</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="addressLine1" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="addressLine2" className="w-[30%] font-medium">Address Line 2</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="addressLine2" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="addressLine3" className="w-[30%] font-medium">Address Line 3</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="addressLine3" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="city" className="w-[30%] font-medium">City</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="city" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="postalCode" className="w-[30%] font-medium">Postal Code</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="postalCode" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="countryCode" className="w-[30%] font-medium">Country Code</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="countryCode" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="country" className="w-[30%] font-medium">Country</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="country" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="openTime" className="w-[30%] font-medium">Open Time</label>
                  <div className="w-[70%]">
                    <input type="time" className="form-control" id="openTime" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="closeTime" className="w-[30%] font-medium">Close Time</label>
                  <div className="w-[70%]">
                    <input type="time" className="form-control" id="closeTime" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="latitude" className="w-[30%] font-medium">Latitude</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="latitude" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="longitude" className="w-[30%] font-medium">Longitude</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="longitude" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="rating" className="w-[30%] font-medium">Rating</label>
                  <div className="w-[70%]">
                    <input type="number" className="form-control" id="rating" min="0" max="5" step="0.1" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <label htmlFor="bioInfo" className="w-[30%] font-medium">Bio Info</label>
                  <div className="w-[70%]">
                    <textarea className="form-control" id="bioInfo" onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-[70%] my-[4vh]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex justify-start items-center">
                  <label htmlFor="isActive" className="font-medium mr-[1vw]">Is Active</label>
                  <label className="switch">
                    <input type="checkbox" id="isActive" checked={editData.IsActive} onChange={handleChange} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <label htmlFor="allowOnlineApp" className="font-medium mr-[1vw]">Allow Online App</label>
                  <label className="switch">
                    <input type="checkbox" id="allowOnlineApp" checked={editData.AllowOnlineApp} onChange={handleChange} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex justify-end items-center">
                  <label htmlFor="businessPlace" className="font-medium mr-[1vw]">Business Place</label>
                  <label className="switch">
                    <input type="checkbox" id="businessPlace" checked={editData.BusinessPlace} onChange={handleChange} />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="flex justify-start items-center">
                  <label htmlFor="customerPlace" className="font-medium mr-[1vw]">Customer Place</label>
                  <label className="switch">
                    <input type="checkbox" id="customerPlace" checked={editData.CustomerPlace} onChange={handleChange} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <label htmlFor="allowIndividualTip" className="font-medium mr-[1vw]">Allow Individual Tip</label>
                  <label className="switch">
                    <input type="checkbox" id="allowIndividualTip" checked={editData.AllowIndividualTip} onChange={handleChange} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex justify-end items-center">
                  <label htmlFor="isApproved" className="font-medium mr-[1vw]">Is Approved</label>
                  <label className="switch">
                    <input type="checkbox" id="isApproved" checked={editData.IsApproved} onChange={handleChange} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            </div>
            <button type="submit">Save Business Info</button>
          </form>
        )}
        {activeTab === 'businessServices' && (
          <ResponsiveBusinessDataTable
            data={businessServices}
            // active={isActive}
          />
        )}
        {activeTab === 'businessSpecialist' && (
          <ResponsiveBusinessDataTable
            data={businessSpecialists}
            // active={isActive}
          />
        )}
        {activeTab === 'appointments' && (
          <ResponsiveBusinessDataTable
            data={appointments}
            // active={isActive}
          />
        )}
        {activeTab === 'reviewsAndRatings' && (
          <form onSubmit={handleSubmitReviewsAndRatings}>
            {/* Reviews and Ratings form fields here */}
            <div>
              <label htmlFor="review">Review</label>
              <input type="text" id="review" value={editData.review || ''} onChange={handleChange} />
            </div>
          </form>
        )}
        {activeTab === 'specialistTransfer' && (
          <ResponsiveBusinessDataTable
            data={specialistTransfers}
            // active={isActive}
          />
        )}
      </div>
      <div className="fixed bottom-0 right-0 bg-white w-full py-4 px-6 flex justify-end mt-8">
        <button type="button" onClick={onCancel} className="ti-btn ti-btn-outline-primary !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditBusiness;
