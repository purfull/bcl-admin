import React from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';

// Function to dynamically generate columns from data
const generateColumns = (data, onEdit) => {
  if (data.length === 0) return [];

  const keys = Object.keys(data[0]);
  const columns = keys.map(key => ({
    Header: key,
    accessor: key,
  }));

  // Add the "Action" column
  columns.push({
    Header: 'Action',
    accessor: 'edit',
    Cell: ({ row }) => (
      // <button
      //   className='px-4 py-1 bg-violet-700 text-white'
      //   onClick={() => onEdit(row.original)} // Use the onEdit prop
      // >
      //   Edit
      // </button>
        <div className="">
          <button
            className='px-4 py-1 bg-violet-700 text-white'
            onClick={() => onEdit(row.original)} // Use the onEdit prop
          >
            Edit
          </button>
          <button
            className='px-4 ti-btn ti-btn-outline-danger !py-1 !mx-2'
            onClick={() => onDelete(row.original,{add: false})} // Use the onDelete prop
          >
            Delete
          </button>
        </div>
    ),
  });

  return columns;
};

const handleEdit = (row) => {
  console.log('Edit button clicked for row:', row);
};

export const GlobalFilter = ({ filter, setFilter }) => (
  <span className="flex ms-auto">
    <input
      value={filter || ''}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control mb-4"
      placeholder="Search..."
    />
  </span>
);

export const ResponsiveDataTable = ({ data, onEdit, filters }) => {
  // Generate columns and table instance based on props.data
  const columns = React.useMemo(() => generateColumns(data, onEdit), [data, onEdit]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageSize } = state;

  return (
    <>
      <div className="e-table pb-5">
        <div className="">
          
        </div>
        <div className={`${filters ? 'flex' : 'hidden' }`}>
          <div className="flex items-center justify-between mb-4">
            <span>show</span>
            <select
              className="selectpage border text-[16px] mx-2"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entities</span>
          </div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
        <div className="table-responsive table-bordered text-center">
          <table
            {...getTableProps()}
            className="!border-t-0 !border-x-0  table-bordered text-nowrap !border-b-0 w-full"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={Math.random()}
                      className={column.className}
                    >
                      <span className="tabletitle">{column.render('Header')}</span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fa fa-angle-down"></i>
                          ) : (
                            <i className="fa fa-angle-up"></i>
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={Math.random()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={Math.random()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={`${filters ? 'block sm:flex' : 'hidden' }  mt-4 px-4`}>
          <span className="">
            Showing {page.length} of {data.length} entries
          </span>
          <span className="sm:ms-auto">
            <button
              className="btn-outline-light tablebutton me-2 my-2 sm:inline block"
              onClick={() => gotoPage(0)}
              disabled={!canNextPage}
            >
              {' Previous '}
            </button>
            <button
              className="tablebutton me-2 my-2"
              onClick={previousPage}
              disabled={!canNextPage}
            >
              {' Previous Page '}
            </button>
            <button
              className="btn-outline-light tablebutton me-2 my-2"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {' Next Page '}
            </button>
            <button
              className="btn-outline-light tablebutton me-2 my-2"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {' Next '}
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

// [
//   {
//       "TaxID": 1,
//       "OrganisationID": 1,
//       "CountryCode": "IND",
//       "RegionCode": "IND",
//       "TaxType": "E",
//       "TaxName": "EXCLUSIVE",
//       "TaxRate": 9,
//       "TaxApplicationType": "",
//       "IsStateWiseTaxApplicable": true,
//       "IsProductWiseTaxApplicable": true,
//       "EffectiveDate": "2024-09-05T00:00:00",
//       "ExpiryDate": "2024-09-05T00:00:00",
//       "IsActive": true,
//       "Description": "",
//       "CreatedBy": "admin",
//       "CreatedDate": "2024-09-05T21:19:28.617",
//       "ModifiedBy": null,
//       "ModifiedDate": "2024-09-05T21:19:28.617",
//       "StateTaxDetails": null
//   },
//   {
//       "TaxID": 5,
//       "OrganisationID": 1,
//       "CountryCode": "IND",
//       "RegionCode": "TN",
//       "TaxType": "E",
//       "TaxName": "EXCLUSIVE 18",
//       "TaxRate": 18,
//       "TaxApplicationType": "E",
//       "IsStateWiseTaxApplicable": true,
//       "IsProductWiseTaxApplicable": false,
//       "EffectiveDate": "2024-09-07T00:00:00",
//       "ExpiryDate": "2024-09-07T00:00:00",
//       "IsActive": true,
//       "Description": "STANDARD",
//       "CreatedBy": "ADMIN",
//       "CreatedDate": "2024-09-07T13:48:24.153",
//       "ModifiedBy": null,
//       "ModifiedDate": "2024-09-07T13:48:24.153",
//       "StateTaxDetails": null
//   }
// ]