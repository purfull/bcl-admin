import React, { useState, useEffect } from 'react';
import noImage from '../../assets/images/no-images/no-image.png';
import { ResponsiveIndividualDataTable } from './commonTables';

const EditIndividuals = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('memberInfo'); // Default active tab
  const [favouriteSpecialist, setFavouriteSpecialist] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [favouriteBusiness, setFavouriteBusiness] = useState([]);

  useEffect(() => {
    const initialSpecialists = [
      { sNo: 1, specialistId: 'SP001', specialistName: 'Alice Johnson', displayName: 'Alice', ratingValue: 4.5 },
      { sNo: 2, specialistId: 'SP002', specialistName: 'Bob Smith', displayName: 'Bob', ratingValue: 4.0 },
      { sNo: 3, specialistId: 'SP003', specialistName: 'Catherine Lee', displayName: 'Cathy', ratingValue: 5.0 },
      { sNo: 4, specialistId: 'SP004', specialistName: 'David Brown', displayName: 'Dave', ratingValue: 3.8 },
      { sNo: 5, specialistId: 'SP005', specialistName: 'Emma Wilson', displayName: 'Emma', ratingValue: 4.7 },
    ];
  
    setFavouriteSpecialist(initialSpecialists);
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
    const initialBusinesses = [
      { sNo: 1, businessId: 'BUS001', businessName: 'Coffee Shop', displayName: 'Coffee Co.', ratingValue: 4.5 },
      { sNo: 2, businessId: 'BUS002', businessName: 'Bookstore', displayName: 'The Book Nook', ratingValue: 4.0 },
      { sNo: 3, businessId: 'BUS003', businessName: 'Flower Shop', displayName: 'Blooms & Petals', ratingValue: 5.0 },
      { sNo: 4, businessId: 'BUS004', businessName: 'Gym', displayName: 'Fit Life', ratingValue: 3.8 },
      { sNo: 5, businessId: 'BUS005', businessName: 'Bakery', displayName: 'Sweet Treats', ratingValue: 4.7 },
    ];
  
    setFavouriteBusiness(initialBusinesses);
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
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'memberInfo' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('memberInfo')}
              type="button"
            >
              Business Info
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
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'favspecialist' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('favspecialist')}
              type="button"
            >
              Favourite Business
            </button>
          </li>
          <li role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'favbusiness' ? 'border-purple-600 text-purple-600' : 'hover:text-gray-600'}`}
              onClick={() => setActiveTab('favbusiness')}
              type="button"
            >
              Favourite Specialist
            </button>
          </li>
        </ul>
      </div>
      <div id="default-styled-tab-content">
        {activeTab === 'memberInfo' && (
          <form onSubmit={handleSubmitBusinessInfo}>
            {/* Business Info form fields here */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-start">
                  <label htmlFor="memberName" className="w-[30%] font-medium">Member Name</label>
                  <div className="w-[70%]">
                    <input type="text" className="form-control" id="memberName" onChange={handleChange} />
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
              </div>
            </div>
            </div>
            <button type="submit">Save Business Info</button>
          </form>
        )}
        {activeTab === 'appointments' && (
          <ResponsiveIndividualDataTable
            data={appointments}
            // active={isActive}
          />
        )}
        {activeTab === 'favspecialist' && (
          <ResponsiveIndividualDataTable
            data={favouriteSpecialist}
            // active={isActive}
          />
        )}
        {activeTab === 'favbusiness' && (
          <ResponsiveIndividualDataTable
            data={favouriteBusiness}
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

export default EditIndividuals;
