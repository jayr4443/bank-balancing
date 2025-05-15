import DataTable from "react-data-table-component";
import {
    FaEdit,
    FaTrashAlt,
    FaCalendarAlt,
    FaUniversity,
    FaMapMarkerAlt,
    FaIndustry,
} from "react-icons/fa";
import { FiTag } from "react-icons/fi";
const BankTable = ({ banks, loading, handleEdit, handleDelete }) => {
    const columns = [
        {
            name: (
                <div className="flex items-center gap-2">
                    <FiTag className="text-blue-500" />
                    <strong>Type</strong>
                </div>
            ),
            selector: (row) => row.type || "N/A",
            sortable: true,
            wrap: true,
            cell: (row) => (
                <div style={{ minWidth: "150px" }}>{row.type || "N/A"}</div>
            ),
        },
        {
            name: (
                <div className="flex items-center gap-2">
                    <FaIndustry className="text-blue-500" />
                    <strong>Company</strong>
                </div>
            ),
            selector: (row) => row.company_type || "N/A",
            sortable: true,
            wrap: true,
            cell: (row) => (
                <div style={{ minWidth: "150px" }}>
                    {row.company_type || "N/A"}
                </div>
            ),
        },
        {
            name: (
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-500" />
                    <strong>Date Opened</strong>
                </div>
            ),
            selector: (row) => row.dateOpened || "N/A",
            sortable: true,
            wrap: true,
            cell: (row) => (
                <div style={{ minWidth: "150px" }}>
                    {row.dateOpened || "N/A"}
                </div>
            ),
        },
        {
            name: (
                <div className="flex items-center gap-2">
                    <FaUniversity className="text-purple-500" />
                    <strong>Bank Name</strong>
                </div>
            ),
            selector: (row) => row.name || "N/A",
            sortable: true,
            cell: (row) => (
                <div
                    style={{ minWidth: "200px" }}
                    className="truncate w-32 sm:w-auto"
                    title={row.name}
                >
                    {row.name}
                </div>
            ),
        },
        {
            name: (
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <strong>Branch Name</strong>
                </div>
            ),
            selector: (row) => row.branch || "N/A",
            sortable: true,
            cell: (row) => (
                <div
                    style={{ minWidth: "200px" }}
                    className="truncate w-32 sm:w-auto"
                    title={row.branch}
                >
                    {row.branch}
                </div>
            ),
        },
    ];

    const ExpandedComponent = ({ data }) => (
        <div className="p-4 bg-gray-50 border rounded-lg">
            <p>
                <strong>Account Number:</strong> {data.accountNumber || "N/A"}
            </p>
            <p>
                <strong>Account Type:</strong> {data.account_type || "N/A"}
            </p>
            <p>
                <strong>Currency:</strong> {data.currency || "PHP"}
            </p>
            <p>
                <strong>Maintaining Balance:</strong>{" "}
                {data.balance && !isNaN(data.balance)
                    ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: data.currency || "PHP",
                      }).format(Number(data.balance))
                    : "₱0.00"}
            </p>
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => handleEdit(data)}
                    className="flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                >
                    <FaEdit className="text-base" />
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(data.id)}
                    className="flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                >
                    <FaTrashAlt className="text-base" />
                    Delete
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-screen-xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
                {loading ? (
                    <p className="text-center text-gray-500 animate-pulse">
                        Loading...
                    </p>
                ) : (
                    <DataTable
                        columns={columns}
                        data={banks}
                        pagination
                        highlightOnHover
                        responsive
                        striped
                        persistTableHead
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        customStyles={{
                            table: {
                                style: {
                                    minWidth: "100%",
                                },
                            },
                            headRow: {
                                style: {
                                    backgroundColor: "#f3f4f6",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                },
                            },
                            rows: {
                                style: {
                                    minHeight: "50px",
                                    fontSize: "14px",
                                    padding: "10px",
                                },
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default BankTable;
