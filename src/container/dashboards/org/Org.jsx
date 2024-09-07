import { Fragment, useEffect, useState } from 'react';
import Pageheader from "../../../components/common/pageheader/pageheader";
import { ResponsiveDataTable } from './Orgdata';
import EditOrg from './Editorg'; // Import your Edit component

const Org = () => {
  const [data, setData] = useState([]);
const [editingRow, setEditingRow] = useState(null);
const [listData, setListData] = useState([]);

useEffect(() => {
  const abortController = new AbortController();
  
  fetch(`https://hmsapi.appxes-erp.in/Organisation/GetOrganisationbycode?OrganisationId=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController.signal,
  })
    .then(result => result.json())
    .then(data => {
      setData(data.Data);
    })
    .catch(err => console.log(err));

  return () => {
    abortController.abort();
  };
}, []);

// Separate useEffect to update listData after data has been fetched
useEffect(() => {
  if (data.length > 0) {
    setListData(data.map(el => ({
      Company_Name: el.Company_Name,
      GST_NO: el.GST_NO,
      Address: `${el.Address_Line1} ${el.Address_Line2} ${el.Address_Line3}`,
      Country: `${el.Country} ${el.State} ${el.PostalCode}`,
      Email: el.Email_Address,
      Phone: el.Phone_No
    })));
  }
}, [data]); // This effect runs whenever 'data' is updated

  useEffect(() => {
    console.log(listData);
  }, []);

//   [
//     {
//         "OrgId": 2,
//         "ORG_Name": "AS ENTERPRISE EDITED",
//         "BusinessRegNo": "20230212",
//         "Address": "33, 1ST FLOOR T NAGAR CHENNAI SINGAPORE 600001"
//     }
// ]

  const handleEdit = (row) => {
    console.log(row);
    
    setEditingRow(row); // Set the row to be edited
  };

  const handleCancelEdit = () => {
    setEditingRow(null); // Cancel edit and return to view mode
    // setEditData(null); 
  };

  return (
    <Fragment>
      <>
        <Pageheader currentpage="Organization" activepage="Master" mainpage="Organization" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="box">
              {/* <div className="">
                <h5 className="box-title">Active</h5>
              </div> */}
              <div className="box-body space-y-3">
                <div className="overflow-hidden">
                  <div id="reactivity-table" className="ti-custom-table ti-striped-table ti-custom-table-hover">
                    {editingRow ? (
                      <EditOrg 
                        row={editingRow} 
                        onCancel={handleCancelEdit} 
                      />
                    ) : (
                      <ResponsiveDataTable 
                        data={listData} 
                        onEdit={handleEdit} // Pass the handleEdit function to ResponsiveDataTable
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Fragment>
  );
}

export default Org;
