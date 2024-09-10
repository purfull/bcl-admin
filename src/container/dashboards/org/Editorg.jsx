import React, { useEffect, useState, useRef } from 'react';
import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';
import { ResponsiveDataTable } from './Orgdata';

const EditOrg = ({ row, onCancel }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [taxName, setTaxName] = useState([]);
  const [logo, setLogo] = useState(noImage);
  const [qrCode, setQrCode] = useState('https://i.pinimg.com/236x/1f/70/5f/1f705f24e1949ac2cf24c252e469af8d.jpg');
  const [selectedCountry, setSelectedCountry] = useState();
  const [data, setData] = useState([]);
  const [editCertificateData, setEditCertificateData] = useState({
    certificateName: '',
    issuingAuthority: '',
    issuingDate: '',
    expiryDate: '',
    attachment: ''
  });
  const fileInputRef = useRef(null);
  const qrFileInputRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`https://hmsapi.appxes-erp.in/Organisation/GetOrganisationbycode?OrganisationId=${row[0].ID}`, {
      method: 'GET',
      signal: abortController.signal,
    })
      .then(result => result.json())
      .then(data => {
        setEditData(data.Data[0]);
        // setCountry(data.countries);
        // setTaxName(data.taxNames);
      })
      .catch(err => console.log(err));
    console.log('from edit',row);
    

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`https://hmsapi.appxes-erp.in/Country/GetAllCountry`, {
      method: 'GET',
      signal: abortController.signal,
    })
      .then(result => result.json())
      .then(data => {
        setCountry(data.Data);
        // setCountry(data.countries);
        // setTaxName(data.taxNames);
        console.log("============",data);
        
      })
      .catch(err => console.log(err));
    // console.log('from edit',row);
    

    return () => {
      abortController.abort();
    };
  }, []);

  
  useEffect(() => {
    const abortController = new AbortController();

    fetch(`https://hmsapi.appxes-erp.in/Tax/GetAllTax`, {
      method: 'GET',
      signal: abortController.signal,
    })
      .then(result => result.json())
      .then(data => {
        setTaxName(data.Data);
        // setCountry(data.countries);
        // setTaxName(data.taxNames);
        console.log("//////////////////",data.Data);
        
      })
      .catch(err => console.log(err));
    // console.log('from edit',row);
    

    return () => {
      abortController.abort();
    };
  }, []);
  
  useEffect(() => {
    const abortController = new AbortController();

    fetch(`https://hmsapi.appxes-erp.in/State/GetStatebyCountrycode?OrganisationId=${row[0].ID}&CountryCode=${selectedCountry}`, {
      method: 'GET',
      signal: abortController.signal,
    })
      .then(result => result.json())
      .then(data => {
        setState(data.Data);
        // setCountry(data.countries);
        // setTaxName(data.taxNames);
      })
      .catch(err => console.log(err));
    console.log('from edit country',selectedCountry);
    

    return () => {
      abortController.abort();
    };
  }, [country]);

  useEffect(() => {
    if (editData[0]?.LogoString) {
      // const bufferData = editData.LogoString.data;
      // const base64String = Buffer.from(bufferData).toString('base64');
      setLogo(`data:image/png;base64,${data[0].LogoString}`);
    }
  }, [editData]);

  const handleCertificateChange = (e) => {
    const { id, value } = e.target;
    setEditCertificateData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleAddCertificate = () => {
    if (editCertificateData.certificateName && editCertificateData.issuingAuthority) {
      setData(prevData => [
        ...prevData,
        {
          "Certificate Name": editCertificateData.certificateName,
          "Issuing Authority": editCertificateData.issuingAuthority,
          "Issuing Date": editCertificateData.issuingDate,
          "Expiry Date": editCertificateData.expiryDate,
          "Attachment": editCertificateData.attachment
        }
      ]);
      setEditCertificateData({
        certificateName: '',
        issuingAuthority: '',
        issuingDate: '',
        expiryDate: '',
        attachment: ''
      });
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCountryChange = (event) => {
    setEditData(prevData => ({
      ...prevData,
      CountryId: event.target.value,
    }));
    setSelectedCountry(event.target.value)
    console.log("selectedCountry", event.target.value);
    
  };

  const handleTaxChange = (event) => {
    setEditData(prevData => ({
      ...prevData,
      TaxName: event.target.value,
    }));
  };

  const handleAddress = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_URL}/address`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const dataToSend = {
      ...editData,
      Logo: logo,
      QR: qrCode,
    };

    fetch(`${import.meta.env.VITE_URL}/org/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCode(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleQrImageClick = () => {
    qrFileInputRef.current?.click();
  };

//   const data = [{
//     "Certificate Name": "HMS HALAL",
//     "Issuing Authority": "768578",
//     "Issuing Date": "CHENNAI  ",
//     "Expiry Date": "INDIA TAMIL NADU 600002",
//     "Attachment": "ABC@GMAIL.COM"
// }]

  return (
    <div>
      <form onSubmit={ handleSubmitForm } className=' mb-[10vh]'>
        <div className="grid grid-cols-2 gap-4">
          {/* <div className="flex items-center justify-start">
            <label htmlFor="OrgId" className="w-[30%] font-medium text-black">Organization ID</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="OrgId" value={editData.OrgId || ''} onChange={handleChange} />
            </div>
          </div> */}
          
          <div className="flex col-span-full items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[17%] font-medium text-black">Company Name</label>
            <div className="w-[100%]">
              <input type="text" className="form-control" id="ORG_Name" value={editData.Company_Name || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine1" className="w-[30%] font-medium text-black">Bussiness Reg No</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine1" value={editData.REG_NO || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine1" className="w-[30%] font-medium text-black">Tax Reg No</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine1" value={editData.GST_NO || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine1" className="w-[30%] font-medium text-black">Address Line 1</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine1" value={editData.Address_Line1 || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine2" className="w-[30%] font-medium text-black">Address Line 2</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine2" value={editData.Address_Line2 || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="AddressLine3" className="w-[30%] font-medium text-black">Address Line 3</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="AddressLine3" value={editData.Address_Line3 || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="CountryId" className="w-[30%] font-medium text-black">Country</label>
            <div className="w-[70%]">
            <select
              className="form-control"
              id="CountryId"
              value={editData.CountryId || ''}
              onChange={handleCountryChange}
            >
              {country.length > 0 ? (
                country.map((el, index) => (
                  <option key={index} value={el.CountryCode}>
                    {el.CountryName}
                  </option>
                ))
              ) : (
                <option value="" disabled>No Country Available</option>
              )}
            </select>
            </div>
          </div>
          
          <div className="flex items-center justify-start">
            <label htmlFor="Phone" className="w-[30%] font-medium text-black">State</label>
            <div className="w-[70%]">
            <select
              className="form-control"
              id="CountryId"
              // value={editData.CountryId || ''}
              onChange={handleCountryChange}
            >
              {state.length > 0 ? (
                state.map((el, index) => (
                  <option key={index} value={el.StateCode}>
                    {el.StateName}
                  </option>
                ))
              ) : (
                <option value="" disabled>No Country Available</option>
              )}
            </select>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="PostalCode" className="w-[30%] font-medium text-black">Postal Code</label>
            <div className="w-[70%] flex">
              <input type="text" className="form-control" id="PostalCode" value={editData.PostalCode || ''} onChange={handleChange} />
                {
                  editData.CountryId === 'SINGAPORE' ? <button className='px-[2vw] py-[1vh] bg-violet-700 text-white ml-[1vw] rounded-md' onClick={handleAddress}>Address</button> : ''
                }
                  

                
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Phone" className="w-[30%] font-medium text-black">Phone</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Phone" value={editData.Phone_No || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Fax" className="w-[30%] font-medium text-black">Fax</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Fax" value={editData.Fax || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="Mail" className="w-[30%] font-medium text-black">Email</label>
            <div className="w-[70%]">
              <input type="email" className="form-control" id="Mail" value={editData.Email_Address || ''} onChange={handleChange} />
            </div>
          </div>
          {/* {
    "ID": 1,
    "Company_Name": "HMS HALAL",
    "GST_NO": "768578",
    "REG_NO": "645678",
    "Address_Line1": "CHENNAI",
    "Address_Line2": "",
    "Address_Line3": "",
    "State": "TAMIL NADU",
    "Country": "INDIA",
    "PostalCode": "600002",
    "Email_Address": "ABC@GMAIL.COM",
    "Phone_No": "7697",
    "Fax": "",
    "Logo": "",
    "LogoString": "data:image/png;base64,",
    "Tax": "1",
    "Currency": "IND",
    "CP_Name": "",
    "CP_Number": "",
    "CP_Email": "",
    "IsActive": true,
    "Created_By": "admin",
    "Created_On": "2024-09-06T04:39:32.923",
    "Modified_By": "admin",
    "Modified_On": "2024-09-06T04:39:32.927"
} */}
          <div className="flex items-center justify-start">
            <label htmlFor="BusinessRegNo" className="w-[30%] font-medium text-black">Currency</label>
            <div className="w-[70%]">
            <select
                className="form-control"
                id="TaxName"
                // value={}
                onChange={handleTaxChange}
              >
                {taxName.length > 0 ? (
                  taxName.map((el, index) => (
                    <option key={index} value={el}>
                      {el.TaxName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No Tax Available</option>
                )}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="TaxName" className="w-[30%] font-medium text-black">Tax Name</label>
            <div className="w-[70%]">
              <select
                className="form-control"
                id="TaxName"
                // value={}
                onChange={handleTaxChange}
              >
                {taxName.length > 0 ? (
                  taxName.map((el, index) => (
                    <option key={index} value={el}>
                      {el.TaxName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No Tax Available</option>
                )}
              </select>
            </div>
          </div>
        <div className="flex items-center justify-start">
          <label htmlFor="ORG_Name" className="w-[30%] font-medium text-black">Contact Person Name</label>
          <div className="w-[70%]">
            <input type="text" className="form-control" id="ORG_Name" value={editData.CP_Name || ''} onChange={handleChange} />
          </div>
        </div>
        
        <div className="flex items-center justify-start">
            <label htmlFor="Phone" className="w-[30%] font-medium text-black">Contact Person No</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="Phone" value={editData.CP_Number || ''} onChange={handleChange} />
            </div>
          </div>
        <div className="flex items-center justify-start">
            <label htmlFor="Mail" className="w-[30%] font-medium text-black">Contact Person Email</label>
            <div className="w-[70%]">
              <input type="email" className="form-control" id="Mail" value={editData.CP_Email || ''} onChange={handleChange} />
            </div>
          </div>
        </div>
        
        <div className="w-full grid grid-cols-2 ">
          <div className="flex items-center justify-start">
            <label htmlFor="Logo" className="w-[30%] font-medium text-black">Logo</label>
            <div className="w-[10vw]">
              <img
                src={logo}
                className="form-control cursor-pointer"
                id="Logo"
                alt='logo'
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-slate-200 p-2 mb-4">
          <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white dark:hover:text-white text-[1.125rem] font-semibold">Certificate</h3>
        </div>
        <div className="grid grid-cols-2 gap-4" >
          <div className="flex items-center justify-start">
            <label htmlFor="certificateName" className="w-[30%] font-medium text-black">Certificate Name</label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="certificateName"
                value={editCertificateData.certificateName}
                onChange={handleCertificateChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="issuingAuthority" className="w-[30%] font-medium text-black">Issuing Authority</label>
            <div className="w-[70%]">
              <input
                type="text"
                className="form-control"
                id="issuingAuthority"
                value={editCertificateData.issuingAuthority}
                onChange={handleCertificateChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="issuingDate" className="w-[30%] font-medium text-black">Issued Date</label>
            <div className="w-[70%]">
              <input
                type="date"
                className="form-control"
                id="issuingDate"
                value={editCertificateData.issuingDate}
                onChange={handleCertificateChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="expiryDate" className="w-[30%] font-medium text-black">Expiry Date</label>
            <div className="w-[70%]">
              <input
                type="date"
                className="form-control"
                id="expiryDate"
                min={editCertificateData.issuingDate}
                value={editCertificateData.expiryDate}
                onChange={handleCertificateChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="attachment" className="w-[30%] font-medium text-black">Attachment</label>
            <div className="w-[70%]">
              <input
                type="file"
                className="form-control"
                id="attachment"
                value={editCertificateData.attachment}
                onChange={handleCertificateChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <button
              // type="submit"
              className="ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]"
              onClick={handleAddCertificate}
            >
              Add
            </button>
          </div>
        </div>
        <div className="w-full mt-[5vh]">
          
          <ResponsiveDataTable 
                        data={data} 
                        filters={false}
                         // Pass the handleEdit function to ResponsiveDataTable
                      />
        </div>
        
        <div className="fixed bottom-0 right-0 bg-white w-full py-4 px-6 flex justify-end mt-8">
          <button type="button" onClick={onCancel} className="ti-btn ti-btn-outline-primary !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]">
            Back
          </button>
          <button type="submit" className='ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrg;
