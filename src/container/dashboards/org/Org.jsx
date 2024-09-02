import { Fragment, useEffect, useState } from 'react';
import Pageheader from "../../../components/common/pageheader/pageheader";
import { ResponsiveDataTable } from './Orgdata';
import EditOrg from './Editorg'; // Import your Edit component

const Org = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited

  useEffect(() => {
    const abortController = new AbortController();
    
    fetch(`${import.meta.env.VITE_URL}/dashboards/organisation/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
    })
      .then(result => result.json())
      .then(data => setData(data))
      .catch(err => console.log(err));

    return () => {
      abortController.abort();
    };
  }, []);


  const handleEdit = (row) => {
    setEditingRow(row); // Set the row to be edited
  };

  const handleCancelEdit = () => {
    setEditingRow(null); // Cancel edit and return to view mode
    setEditData(null); // Clear the edit data
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
                        data={data} 
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
