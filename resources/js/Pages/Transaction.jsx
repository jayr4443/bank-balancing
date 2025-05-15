import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    FaUniversity,
    FaMoneyCheckAlt,
    FaFileInvoiceDollar,
    FaPlus,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import {
    TransactionModal,
    DeleteTransactionModal,
} from "./Modal/TransactionModal";

import TransactionTable from "./Datatable/TransactionTable";
import transactionService from "@/Services/transaction-service";
import { toast } from "react-toastify";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function Transaction() {
    const [dailyCashBalance, setDailyCashBalance] = useState(0);
    const [monthlyBankBalance, setMonthlyBankBalance] = useState(0);
    const [checkIssuance, setCheckIssuance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        companytype: "",
        banktype: "",
        amount: "",
        acctnumber: "",
        account_type: "",
        balance: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch financial data here (you can add your own API calls)
                // const dailyCashData = await bankService.getDailyCashBalance();
                // setDailyCashBalance(dailyCashData);

                // const monthlyBankData = await bankService.getMonthlyBankBalance();
                // setMonthlyBankBalance(monthlyBankData);

                // const checkIssuanceData = await bankService.getCheckIssuance();
                // setCheckIssuance(checkIssuanceData);

                // Fetch transactions
                const transactionsData =
                    await transactionService.getAllTransactions();
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Failed to fetch transaction data:", error);
                toast.error("Failed to load transaction data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmitAdd = async () => {
        // Proceed with form submission if validation passes
        console.log(newTransaction);
        if (validateForm()) {
            try {
                await transactionService.createTransaction(newTransaction);
                toast.success("Transaction added successfully!");
                setShowModal(false);
                // Refresh transactions list
                const transactionsData =
                    await transactionService.getAllTransactions();
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Error submitting transaction:", error);
                toast.error("Failed to save transaction.");
            }
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    const handleSubmitUpdate = async () => {
        const updatedData = {
            company_type: newTransaction.type,
            bank_name: newTransaction.banktype,
            beginning_balance: parseFloat(newTransaction.amount),
            account_type: newTransaction.account_type,
            account_number: newTransaction.acctnumber,
            maintaining_balance: parseFloat(newTransaction.balance),
        };

        try {
            await transactionService.updateTransaction(
                newTransaction.id,
                updatedData
            );
            toast.success("Transaction updated successfully!");
            setShowModal(false);
            setShowEditModal(false);
            const transactionsData =
                await transactionService.getAllTransactions();
            setTransactions(transactionsData);
        } catch (error) {
            toast.error("Failed to update transaction.");
        }
    };

    const handleEdit = (transaction) => {
        console.log("Editing transaction:", transaction);
        setSelectedTransaction(transaction);
        setShowEditModal(true);
    };

    const validateForm = () => {
        let tempErrors = {};

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleDelete = (id) => {
        setSelectedTransaction(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteTransaction = async () => {
        if (!selectedTransaction) return;

        try {
            await transactionService.deleteTransaction(selectedTransaction);
            toast.success("Transaction deleted successfully!");

            const transactionsData =
                await transactionService.getAllTransactions();
            setTransactions(transactionsData);
        } catch (error) {
            console.error("Error deleting transaction:", error);
            toast.error("Failed to delete transaction.");
        } finally {
            setShowDeleteModal(false);
            setSelectedTransaction(null);
        }
    };

    return (
        <AuthenticatedLayout header={<Header setShowModal={setShowModal} />}>
            <Head title="Transaction" />

            <div className="py-12 bg-gray-100 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <StatCard
                            icon={
                                <FaMoneyCheckAlt className="text-green-500" />
                            }
                            title="Daily Cash Balance"
                            value={`₱${dailyCashBalance.toLocaleString()}`}
                        />
                        <StatCard
                            icon={<FaUniversity className="text-blue-500" />}
                            title="Monthly Bank Balance"
                            value={`₱${monthlyBankBalance.toLocaleString()}`}
                        />
                        <StatCard
                            icon={
                                <FaFileInvoiceDollar className="text-red-500" />
                            }
                            title="Check Issuance"
                            value={`₱${checkIssuance.toLocaleString()}`}
                        />
                    </div>

                    {/* Add Transaction Modal */}
                    <TransactionModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        newTransaction={newTransaction}
                        setNewTransaction={setNewTransaction}
                        handleSubmitAdd={handleSubmitAdd}
                        errors={errors}
                    />

                    {/* Edit Modal */}
                    <TransactionModal
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        newTransaction={newTransaction}
                        selectedTransaction={selectedTransaction}
                        setNewTransaction={setNewTransaction}
                        setSelectedTransaction={setSelectedTransaction}
                        errors={errors}
                        handleSubmitAdd={handleSubmitAdd}
                        handleSubmitUpdate={handleSubmitUpdate}
                        isEdit={true}
                    />

                    <DeleteTransactionModal
                        showModal={showDeleteModal}
                        setShowModal={setShowDeleteModal}
                        handleConfirmDelete={confirmDeleteTransaction}
                    />

                    {/* Transactions Table */}
                    <TransactionTable
                        transactions={transactions}
                        loading={loading}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Header Component
const Header = ({ setShowModal }) => (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 bg-white/70 backdrop-blur-md shadow-lg rounded-xl border border-gray-200">
        {/* Left: Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <FaUniversity className="text-blue-600 text-3xl sm:text-4xl" />
            <span className="tracking-wide">Transaction Overview</span>
        </h2>

        {/* Right: Button */}
        <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg
    backdrop-blur-lg bg-opacity-80 hover:bg-opacity-100 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105
    focus:ring-4 focus:ring-blue-300 active:scale-95 border border-white/20"
        >
            <FaPlus className="text-sm sm:text-lg" />
            <span>Add Transaction</span>
        </button>
    </div>
);

const sampleData = [
    { value: 100 },
    { value: 200 },
    { value: 150 },
    { value: 300 },
    { value: 250 },
];

const StatCard = ({ icon, title, value }) => (
    <div className="relative p-6 rounded-2xl bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center justify-between">
            <div className="text-4xl text-blue-600">{icon}</div>
            <div className="text-right">
                <p className="text-sm font-semibold text-gray-600 uppercase">
                    {title}
                </p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
        <div className="h-16 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sampleData}>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#bfdbfe"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);
