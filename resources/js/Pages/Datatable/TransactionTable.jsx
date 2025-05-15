import DataTable from "react-data-table-component";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useMemo } from "react";
import TransferModal from "../Modal/TransferModal";

const TransactionTable = ({
    transactions,
    loading,
    handleEdit,
    handleDelete,
    bankList = [], // make sure to pass this when using the component
}) => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const columns = [
        {
            name: "Date",
            selector: (row) => new Date(row.created_at).toLocaleDateString(),
            sortable: true,
            wrap: true,
            // Hide on small screens
            grow: 1,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
            wrap: true,
            grow: 1,
        },
        {
            name: "Company Type",
            selector: (row) => row.company_type,
            sortable: true,
            wrap: true,
            grow: 1,
        },
        {
            name: "Bank Name",
            selector: (row) => row.bank_name,
            sortable: true,
            wrap: true,
            grow: 1,
        },
        {
            name: "Beginning",
            selector: (row) =>
                `₱${new Intl.NumberFormat().format(
                    row.beginning_balance.toFixed(2)
                )}`,
            sortable: true,
            wrap: true,
            grow: 1,
        },
        {
            name: "Maintaining",
            selector: (row) =>
                `₱${new Intl.NumberFormat().format(
                    row.maintaining_balance.toFixed(2)
                )}`,
            sortable: true,
            wrap: true,
            grow: 1,
        },
        {
            name: "Account Type",
            selector: (row) => row.account_type,
            sortable: true,
            wrap: true,
            grow: 1,
        },
        {
            name: "Account No.",
            selector: (row) => row.account_number,
            sortable: true,
            wrap: true,
            grow: 1,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2 flex-wrap justify-start">
                    <button
                        onClick={() => handleEdit(row)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit Transaction"
                    >
                        <FaEdit className="text-lg" />
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Transaction"
                    >
                        <FaTrashAlt className="text-lg" />
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const expandedRowContent = (row) => (
        <div className="p-4 bg-gray-100">
            <button
                onClick={() => {
                    setSelectedTransaction(row);
                    setShowModal(true);
                }}
                className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors"
                title="Transfer Transaction"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h6.75A2.25 2.25 0 0015.75 18.75V15"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12l-4.5-4.5M19.5 12l-4.5 4.5M19.5 12H9"
                    />
                </svg>
                <span>Transfer</span>
            </button>
        </div>
    );

    // Filtered bank list based on selected transaction's company type
    const filteredBankList = useMemo(() => {
        if (!selectedTransaction) return [];
        return bankList.filter(
            (bank) => bank.company_type === selectedTransaction.company_type
        );
    }, [selectedTransaction, bankList]);

    return (
        <>
            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={transactions}
                    progressPending={loading}
                    pagination
                    responsive
                    noDataComponent="No transactions available"
                    expandableRows
                    expandableRowsComponent={expandedRowContent}
                    onRowExpandToggled={(expanded, row) => {
                        setExpandedRows((prev) =>
                            expanded
                                ? [...prev, row.id]
                                : prev.filter((id) => id !== row.id)
                        );
                    }}
                    expandedRows={expandedRows}
                    customStyles={{
                        table: {
                            style: {
                                width: "100%",
                            },
                        },
                        headRow: {
                            style: {
                                backgroundColor: "#f3f4f6",
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
            </div>

            <TransferModal
                showModal={showModal}
                setShowModal={setShowModal}
                transaction={selectedTransaction}
                bankList={filteredBankList}
                handleSubmitTransfer={(data) => {
                    console.log("Transfer submitted:", data);
                    setShowModal(false);
                }}
            />
        </>
    );
};

export default TransactionTable;
