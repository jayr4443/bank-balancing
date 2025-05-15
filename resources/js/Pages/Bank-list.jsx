import { useState, useEffect, useCallback } from "react";
import { Head } from "@inertiajs/react";
import {
    FaPlus,
    FaUniversity,
    FaSearch,
    FaTimes,
    FaList,
} from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BankModal, DeleteBankModal } from "./Modal/BankModal";
import BankTable from "./Datatable/BankTable";
import bankService from "../Services/bank-service";

export default function Banklist() {
    const [banks, setBanks] = useState([]);
    const [filteredBanks, setFilteredBanks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bankToDelete, setBankToDelete] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [newBank, setNewBank] = useState({
        type: "Local",
        dateOpened: "",
        company_type: "",
        name: "",
        branch: "",
        accountNumber: "",
        balance: "",
    });
    const [errors, setErrors] = useState({});

    const fetchBanks = async () => {
        setLoading(true);
        try {
            const response = await bankService.getAllBanks();
            if (!Array.isArray(response)) {
                console.warn("Unexpected data structure:", response);
                setBanks([]);
                setFilteredBanks([]);
                return;
            }
            setBanks(response);
            setFilteredBanks(response);
        } catch (error) {
            console.error(
                "Error fetching banks:",
                error.response?.data || error.message
            );
            setBanks([]);
            setFilteredBanks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanks();
    }, []);

    const handleSearch = useCallback(
        (e) => {
            const value = e.target.value.toLowerCase();
            setSearch(value);
            setFilteredBanks(
                banks.filter((bank) =>
                    Object.values(bank).some(
                        (field) =>
                            field &&
                            field.toString().toLowerCase().includes(value)
                    )
                )
            );
        },
        [banks]
    );

    const clearSearch = () => {
        setSearch("");
        setFilteredBanks(banks);
    };

    const handleSubmitAdd = async () => {
        if (validateForm()) {
            try {
                await bankService.createBank(newBank);
                toast.success("Bank added successfully!");
                setShowModal(false);
                fetchBanks();
            } catch (error) {
                console.error("Error saving bank:", error);
                toast.error("Failed to save bank.");
            }
        }
    };

    const handleSubmitUpdate = async (bank) => {
        try {
            await bankService.updateBank(bank.id, bank);
            toast.success("Bank updated successfully!");
            setShowModal(false);
            setShowEditModal(false);
            fetchBanks();
        } catch (error) {
            toast.error("Failed to update bank.");
        }
    };

    const handleEdit = (bank) => {
        setSelectedBank(bank);
        setNewBank({ ...bank });
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        setBankToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteBank = async () => {
        if (!bankToDelete) return;

        try {
            await bankService.deleteBank(bankToDelete);
            toast.success("Bank deleted successfully!");
            fetchBanks();
        } catch (error) {
            console.error("Error deleting bank:", error);
            toast.error("Failed to delete bank.");
        } finally {
            setShowDeleteModal(false);
            setBankToDelete(null);
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!newBank.dateOpened)
            tempErrors.dateOpened = "Date Opened is required.";
        if (!newBank.name) tempErrors.name = "Bank Name is required.";
        if (!newBank.branch) tempErrors.branch = "Branch Name is required.";
        if (!newBank.accountNumber)
            tempErrors.accountNumber = "Account Number is required.";
        if (!newBank.balance)
            tempErrors.balance = "Maintaining Balance is required.";
        if (!newBank.company_type)
            tempErrors.company_type = "Company is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    return (
        <AuthenticatedLayout header={<Header setShowModal={setShowModal} />}>
            <Head title="Bank List" />
            <div className="py-10 px-6 sm:px-8 lg:px-12">
                <div className="max-w-screen-xl mx-auto bg-white shadow-2xl rounded-2xl p-8 lg:p-12">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
                        <FaList className="text-blue-600 text-3xl lg:text-4xl" />
                        List of Banks
                    </h3>

                    {/* Search Bar */}
                    <div className="relative mb-8 flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-sm w-full sm:w-96 mx-auto px-4 py-2">
                        <FaSearch className="text-gray-500 mr-3 text-lg" />
                        <input
                            type="text"
                            placeholder="Search banks..."
                            value={search}
                            onChange={handleSearch}
                            className="w-full bg-transparent outline-none text-base px-2 py-1 text-gray-800 placeholder-gray-500"
                            aria-label="Search banks"
                        />
                        {search && (
                            <button
                                onClick={clearSearch}
                                className="ml-2 text-gray-500 hover:text-red-600 transition"
                                aria-label="Clear search"
                            >
                                <FaTimes className="text-lg" />
                            </button>
                        )}
                    </div>

                    {/* Add Modal */}
                    <BankModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        newBank={newBank}
                        setNewBank={setNewBank}
                        handleSubmitAdd={handleSubmitAdd}
                        errors={errors}
                    />

                    {/* Edit Modal */}
                    <BankModal
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        selectedBank={selectedBank}
                        setNewBank={setNewBank}
                        setSelectedBank={setSelectedBank}
                        errors={errors}
                        handleSubmitUpdate={handleSubmitUpdate}
                        isEdit={true}
                    />

                    {/* Delete Confirmation Modal */}
                    <DeleteBankModal
                        showModal={showDeleteModal}
                        setShowModal={setShowDeleteModal}
                        handleConfirmDelete={confirmDeleteBank}
                    />

                    {/* ✅ Bank Table Component */}
                    <div className="overflow-x-auto">
                        <BankTable
                            banks={filteredBanks}
                            loading={loading}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// ✅ Header Component
const Header = ({ setShowModal, handleSubmitAdd }) => (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 bg-white/70 backdrop-blur-md shadow-lg rounded-xl border border-gray-200">
        {/* Left: Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <FaUniversity className="text-blue-600 text-3xl sm:text-4xl" />
            <span className="tracking-wide">Dashboard Overview</span>
        </h2>

        {/* Right: Button */}
        <button
            onClick={() => {
                if (handleSubmitAdd) {
                    handleSubmitAdd();
                }
                setShowModal(true);
            }}
            className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg
    backdrop-blur-lg bg-opacity-80 hover:bg-opacity-100 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105
    focus:ring-4 focus:ring-blue-300 active:scale-95 border border-white/20"
        >
            <FaPlus className="text-sm sm:text-lg" />
            <span>Add Bank</span>
        </button>
    </div>
);
