import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
// import "./org.css";
import noImage from '../../../assets/images/no-images/no-image.png';
import { ResponsiveDataTable } from '../org/Orgdata';

const EditBranch = ({row,  onCancel }) => {
  const [editData, setEditData] = useState({});
  const [country, setCountry] = useState([]);
  const [data, setData] = useState([]);
  const [logo, setLogo] = useState(noImage);
  const [state, setState] = useState(false)
  // console.log(row);
  const [addTaxData, setAddTaxData] = useState({
    StateName: '',
    TaxPercentage: '',
    EffectiveDate: ''
  });
  
  const req = row.newBranch ? true : false

  useEffect(() => {
    const abortController = new AbortController();
    console.log("frommmmmmmmmmm",row);
    
    
    // fetch(`${import.meta.env.VITE_URL}/branch/edit`, {
    fetch(`https://hmsapi.appxes-erp.in/Tax/GetTaxbycode?OrganisationId=1&TaxID=${row.TaxID}` , {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      // body: JSON.stringify({ BranchCode: row.BranchCode })
    })
      .then(result => result.json())
      .then(data => {
        setEditData(data.Data[0])
        console.log("''''''''''''''''''",data.Data[0]);
        
        // setCountry(data.countries);
        // setEditData(data.branch[0]);
        // Check if images are present in the response and set them
      })
      
      .catch(err => console.log(err));

    return () => {
      abortController.abort();
    };
  }, []);


  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  
  const handleStateTaxChange = (e) => {
    const { id, value } = e.target;
    setAddTaxData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };
  const handleAddTax = () => {
    if (addTaxData.StateName && addTaxData.TaxPercentage && addTaxData.EffectiveDate) {
      setData(prevData => [
        ...prevData,
        {
          "State Name": addTaxData.StateName,
          "Tax Percentage": addTaxData.TaxPercentage,
          "Effective Date": addTaxData.EffectiveDate
        }
      ]);
      // Reset the addTaxData state after adding the tax
      setAddTaxData({
        StateName: '',
        TaxPercentage: '',
        EffectiveDate: ''
      });
    } else {
      console.log("Please fill all tax details.");
    }
  };

  const handleStateButtonChange = (e) => {
    setState(!state)
  }

  const handleCountryChange = (event) => {
    setEditData(prevData => ({
      ...prevData,
      CountryId: event.target.value,
    }));
  };


  const handleAddress = (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_URL}/address`,{
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      TaxID: editData.TaxID || 0,
      OrganisationID: 1,
      CountryCode: editData.CountryCode || 'IN',
      RegionCode: editData.RegionCode || 'KA',
      TaxType: editData.TaxType || 'GST',
      TaxName: editData.TaxName || 'GST',
      TaxRate: editData.TaxRate || 0,
      TaxApplicationType: editData.TaxApplicationType || 'Standard',
      IsStateWiseTaxApplicable: state,
      IsProductWiseTaxApplicable: editData.IsProductWiseTaxApplicable || false,
      EffectiveDate: editData.EffectiveDate || new Date().toISOString(),
      ExpiryDate: editData.ExpiryDate || new Date().toISOString(),
      IsActive: editData.IsActive || false,
      Description: editData.Description || '',
      CreatedBy: editData.CreatedBy || 'Admin',
      CreatedDate: editData.CreatedDate || new Date().toISOString(),
      ModifiedBy: editData.ModifiedBy || 'Admin',
      ModifiedDate: new Date().toISOString(),
      StateTaxDetails: data.map(taxDetail => ({
        StateTaxID: taxDetail.StateTaxID || 0,
        TaxID: taxDetail.TaxID || editData.TaxID,
        OrganisationID: 1,
        StateTaxCode: 'ST-' + taxDetail.StateName,
        StateName: taxDetail['State Name'],
        TaxPercentage: parseFloat(taxDetail['Tax Percentage']),
        IsSameState: true,
        IsDifferentState: false,
        EffectiveDate: taxDetail['Effective Date'],
        ExpiryDate: '',
        IsActive: true,
        CreatedBy: 'Admin',
        CreatedDate: new Date().toISOString(),
        ModifiedBy: 'Admin',
        ModifiedDate: new Date().toISOString()
      }))
    };
    console.log(dataToSend);
    {/* */}
    
    // fetch(`${import.meta.env.VITE_URL}/branch/update`, {
    fetch('https://hmsapi.appxes-erp.in/Tax/CreateTax',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-start">
            <label htmlFor="OrgId" className="w-[30%] font-medium">Tax ID</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="taxId" defaultValue={editData.TaxID || ''} onChange={handleChange} disabled />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Tax Name</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="taxName" defaultValue={editData.TaxName || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Tax Type</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="taxType" defaultValue={editData.TaxType || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Tax Rate</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="taxRate" defaultValue={editData.TaxRate || 0} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Tax Application Type</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="taxAppType" defaultValue={editData.TaxApplicationType || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Effective Date</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="taxEffDate" defaultValue={editData.EffectiveDate || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Description</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="description" defaultValue={editData.Description || ''} onChange={handleChange} />
            </div>
          </div>
          
        </div>
        
        
        <div className="w-full sm:w-[70%] flex justify-between my-[4vh]">
          <div className="flex items-center justify-start">
            <label htmlFor="ERP" className="font-medium  mr-[1vw]">Is Active</label>
            <label className="switch">
              <input type="checkbox" id="isActive" checked={editData.IsActive} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="POS" className="font-medium  mr-[1vw]">Is Product wise Tax Applicable</label>
            <label className="switch">
              <input type="checkbox" id="PTA" checked={editData.IsProductWiseTaxApplicable} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="B2B" className="font-medium  mr-[1vw]">Is State wise Tax Applicable</label>
            <label className="switch">
              <input type="checkbox" id="STA" checked={state} onChange={handleStateButtonChange} />
              <span className="slider round"></span>
            </label>
          </div>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="B2C" className="font-medium  mr-[1vw]">B2C</label>
            <label className="switch">
              <input type="checkbox" id="B2C" checked={editData.B2C || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div> */}
        </div>
        <div className={`${state ? 'grid' : 'hidden'} grid grid-cols-2 gap-4 `}>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">State Tax Code</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="ORG_Name" defaultValue={editData.BranchName || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">State Tax Code</label>
            <div className="w-[70%]">
              <input type="text" className="form-control" id="ORG_Name" defaultValue={editData.BranchName || ''} onChange={handleChange} />
            </div>
          </div> */}
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">State Name</label>
            <div className="w-[70%]">
            <input type="text" className="form-control" id="StateName" defaultValue={addTaxData.StateName} onChange={handleStateTaxChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Tax Percentage</label>
            <div className="w-[70%]">
            <input type="number" className="form-control" id="TaxPercentage" defaultValue={addTaxData.TaxPercentage} onChange={handleStateTaxChange} />
            </div>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Effective Date</label>
            <div className="w-[70%]">
            <input type="date" className="form-control" id="EffectiveDate" defaultValue={addTaxData.EffectiveDate} onChange={handleStateTaxChange} />
            </div>
          </div>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="ORG_Name" className="w-[30%] font-medium ">Expiry Date</label>
            <div className="w-[70%]">
              <input type="date" className="form-control" id="ORG_Name" defaultValue={editData.BranchName || ''} onChange={handleChange} />
            </div>
          </div> */}
          <div className="flex items-center justify-start">
            <button
              // type="submit"
              className="ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]"
              onClick={handleAddTax}
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
        <div className={`w-full sm:w-[70%] ${state ? 'flex' : 'hidden'} justify-between my-[4vh] mb-[10vh]`}>
          <div className="flex items-center justify-start">
            <label htmlFor="ERP" className="font-medium  mr-[1vw]">Is Active</label>
            <label className="switch">
              <input type="checkbox" id="ERP" checked={editData.IsActive} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="POS" className="font-medium  mr-[1vw]">Is Different State</label>
            <label className="switch">
              <input type="checkbox" id="POS" checked={editData.IsDifferentState} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-start">
            <label htmlFor="B2B" className="font-medium  mr-[1vw]">Is Same State</label>
            <label className="switch">
              <input type="checkbox" id="B2B" checked={editData.IsSameState} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          {/* <div className="flex items-center justify-start">
            <label htmlFor="B2C" className="font-medium  mr-[1vw]">B2C</label>
            <label className="switch">
              <input type="checkbox" id="B2C" checked={editData.B2C || false} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div> */}
        </div>
        
        <div className="fixed bottom-0 right-0 bg-white w-full py-4 px-6 flex justify-end mt-8">
          <button type="button" onClick={onCancel} className="ti-btn ti-btn-outline-primary !px-[20px] !py-[2px] !mr-[2vw] !text-[18px]">
            Cancel
          </button>
          <button type="submit" className='ti-btn ti-btn-primary-full !px-[20px] !py-[2px] !text-[18px]'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBranch;
