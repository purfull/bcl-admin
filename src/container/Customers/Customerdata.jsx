import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Function to dynamically generate columns from data
const generateColumns = (data, onEdit, onDelete, active) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  // Safely get keys from the first object in the array
  const firstItem = data[0];
  const keys = Object.keys(firstItem);

  const columns = keys.map((key) => {
    // If the key is 'Logo', render an image
    if (key === "Logo") {
      return {
        Header: key,
        accessor: key,
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="Product Logo" style={{ width: "100px" }} />
        ),
      };
    }

    return {
      Header: key,
      accessor: key,
    };
  });

  // Add the "Action" column
  columns.push({
    Header: "Action",
    accessor: "edit",
    Cell: ({ row }) =>
      active ? (
        <div className="">
          <button
            className="px-4 py-1 bg-[#2EAF4B] text-white"
            onClick={() => onEdit(row.original)} // Use the onEdit prop
          >
            {/* Edit */}
            View
          </button>
          {/* <button
            className='px-4 ti-btn ti-btn-outline-danger !py-1 !mx-2'
            onClick={() => onDelete(row.original,{add: false})} // Use the onDelete prop
          >
            Delete
          </button> */}
        </div>
      ) : (
        <div className="">
          <button
            className="px-4 py-1 bg-[#2EAF4B] text-white mx-2"
            onClick={() => onDelete(row.original, { add: true })}
          >
            Recover
          </button>
        </div>
      ),
  });

  return columns;
};

export const GlobalFilter = ({ filter, setFilter }) => (
  <span className="flex ms-auto">
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control mb-4"
      placeholder="Search..."
    />
  </span>
);

export const ResponsiveCustomerDataTable = ({
  data = [],
  onEdit,
  onDelete,
  active,
}) => {
  // Handle null or undefined data

  // Generate columns and table instance based on props.data
  const columns = React.useMemo(
    () => generateColumns(data, onEdit, onDelete, active),
    [data, onEdit, onDelete, active]
  );

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
      <div className="e-table pb-5  ">
        <div className=""></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="order-2 sm:order-1 flex items-center sm:justify-between mb-2 sm:mb-0 ">
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
          {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
          <div className="order-1 sm:order-2 sm:flex justify-start sm:mb-0 mb-2 w-[70%] sm:w-full">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="table-responsive table-bordered text-center ">
          <table
            {...getTableProps()}
            className="!border-t-0 !border-x-0 table-bordered text-nowrap !border-b-0 w-full"
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
                      <span className="tabletitle">
                        {column.render("Header")}
                      </span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fa fa-angle-down"></i>
                          ) : (
                            <i className="fa fa-angle-up"></i>
                          )
                        ) : (
                          ""
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
                      <td
                        {...cell.getCellProps()}
                        key={Math.random()}
                        style={{ textAlign: "left" }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4">
          {/* <div className="block sm:flex mt-4 px-4"> */}
          <span className="">
            Showing {page.length} of {data.length} entries
          </span>
          <span className="sm:ms-auto flex gap-2 mt-2 sm:mt-0">
            <button
              // className="tablebutton me-2 my-2"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2EAF4B] text-white disabled:opacity-50"
              onClick={previousPage}
              disabled={!canNextPage}
            >
              {/* {" Previous Page "} */}
              <i className="fa fa-angle-left"></i>
            </button>
            <button
              // className="btn-outline-light tablebutton me-2 my-2 bg-[#2EAF4B]"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2EAF4B] text-white disabled:opacity-50"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {/* {" Next Page "} */}
              <i className="fa fa-angle-right"></i>
            </button>
            {/* <button
              className="btn-outline-light tablebutton me-2 my-2"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {" Next "}
            </button> */}
          </span>
        </div>
      </div>
    </>
  );
};
