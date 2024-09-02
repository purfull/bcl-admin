import React from 'react';
import './alert.css'; // Import the CSS file for styling

const Alert = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-container !bg-transparent !p-0 ">
        <div className="grid  ">
          <div className="box  dark:!bg-bodybg !border-0 !m-0">
            <div className="alert custom-alert1 alert-primary  dark:!bg-bodybg ">
              <button
                type="button"
                className="btn-close ms-auto"
                onClick={onClose}
                aria-label="Close"
              >
                <i className="bi bi-x"></i>
              </button>
              <div className="text-center px-[3rem] pb-0">
                <svg
                  className="custom-alert-icon svg-primary inline-flex"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                  width="1.5rem"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <h5 className="text-[1.25rem] !font-medium">CONFIRM ?</h5>
                <p>This alert is created to just show the related information.</p>
                <div className="">
                  <button
                    type="button"
                    className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-outline-danger m-1"
                    onClick={onClose}
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium bg-primary text-white m-1"
                    onClick={onConfirm}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
