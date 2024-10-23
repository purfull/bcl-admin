import React, { useState } from 'react';
import noImage from '../../../assets/images/no-images/no-image.png';

const EditTestimonial = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [logo, setLogo] = useState(noImage);
  const req = row.newTestimonial ? true : false;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="flex items-center justify-start">
            <label htmlFor="name" className="w-[15%] font-medium">Name*</label>
            <div className="w-[85%]">
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={editData.name || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image Field */}
          <div className="flex items-center justify-start">
            <label htmlFor="image" className="w-[15%] font-medium">Image*</label>
            <div className="w-[85%]">
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                required
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="flex items-center justify-start">
            <label htmlFor="message" className="w-[15%] font-medium">Message*</label>
            <div className="w-[85%]">
              <textarea
                className="form-control"
                id="message"
                rows="4"
                required
                value={editData.message || ''}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Designation Field */}
          <div className="flex items-center justify-start">
            <label htmlFor="designation" className="w-[15%] font-medium">Designation*</label>
            <div className="w-[85%]">
              <input
                type="text"
                className="form-control"
                id="designation"
                required
                value={editData.designation || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[70%] flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="isActive" className="font-medium mr-[1vw]">Is Active</label>
            <label className="switch">
              <input
                type="checkbox"
                id="isActive"
                checked={editData.IsActive}
                onChange={(e) =>
                  setEditData({ ...editData, IsActive: e.target.checked })
                }
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

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

export default EditTestimonial;
