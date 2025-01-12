import { Fragment, useState, useEffect } from "react";
import Pageheader from "../../../components/common/pageheader/pageheader";
import EditBranch from "./SuplierData";
import ResponsiveBranchDataTable from "./SuplierData";
import { AppEnv } from '../../../../config';


const Suplier = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // State to keep track of the row being edited

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${AppEnv.baseUrl}/dashboards/branch/`, {
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
      <Pageheader currentpage="Suplier" activepage="Master" mainpage="Suplier" />
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
                    <EditBranch
                      row={editingRow}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <ResponsiveBranchDataTable
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
    </Fragment>
  );
}

export default Suplier;