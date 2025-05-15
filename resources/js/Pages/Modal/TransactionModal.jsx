import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import bankService from "../../Services/bank-service";

const TransactionModal = ({
    showModal,
    setShowModal,
    newTransaction,
    selectedTransaction,
    setNewTransaction,
    errors,
    handleSubmitAdd,
    handleSubmitUpdate,
    isEdit = false,
}) => {
    const [bankList, setBankList] = useState([]);
    const [accTypeLocal, setAccountLocal] = useState("");
    const [accountType, setAccountType] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [maintainingBalance, setMaintainingBalance] = useState("");
    const [selectedBankName, setSelectedBankName] = useState("");
    const [selectedCompanyType, setSelectedCompanyType] = useState("");

    useEffect(() => {
        const fetchBankList = async () => {
            try {
                const response = await bankService.getAllBanks();
                setBankList(response);
            } catch (error) {
                console.error("Failed to fetch bank list:", error);
            }
        };

        if (showModal) {
            fetchBankList();
        }

        if (isEdit && selectedTransaction) {
            // Populate form fields with selected transaction details
            setSelectedCompanyType(selectedTransaction.company_type);
            setSelectedBankName(selectedTransaction.bank_name);
            setAccountType(selectedTransaction.account_type);
            setAccountLocal(selectedTransaction.type);
            setAccountNumber(selectedTransaction.account_number);
            setMaintainingBalance(selectedTransaction.maintaining_balance);

            // Set initial transaction data
            const initialTransaction = {
                ...selectedTransaction,
                type: selectedTransaction.company_type || "",
                banktype: selectedTransaction.bank_name || "Choose an option",
                amount: selectedTransaction.beginning_balance || "",
            };

            setNewTransaction(initialTransaction);
        } else if (!isEdit && showModal) {
            setNewTransaction({
                type: "Choose an option",
                banktype: "Choose an option",
                amount: "",
            });
            setAccountType("");
            setMaintainingBalance("");
            setAccountNumber("");
            setAccountLocal("");
            setSelectedBankName("");
            setSelectedCompanyType("");
        }
    }, [isEdit, showModal, selectedTransaction, setNewTransaction]);

    const fetchDetails = (bankName) => {
        const selectedBank = bankList.find((bank) => bank.name === bankName);
        if (selectedBank) {
            setAccountType(selectedBank.account_type);
            setMaintainingBalance(selectedBank.balance);
            setAccountNumber(selectedBank.accountNumber);
            setAccountLocal(selectedBank.type);
            setSelectedBankName(selectedBank);

            setNewTransaction((prevState) => ({
                ...prevState,
                banktype: selectedBank.name,
                account_type: selectedBank.account_type,
                acctnumber: selectedBank.accountNumber,
                acctlocaltype: selectedBank.type,
                balance: selectedBank.balance,
            }));
        } else {
            setAccountType("");
            setMaintainingBalance("");
            setAccountNumber("");
            setSelectedBankName("");

            setNewTransaction((prevState) => ({
                ...prevState,
                banktype: "",
                accountType: "",
                acctnumber: "",
                acctlocaltype: "",
                balance: "",
            }));
        }
    };

    const uniqueCompanyTypes = [
        ...new Set(bankList.map((bank) => bank.company_type)),
    ];

    const filteredBanks = bankList.filter(
        (bank) => bank.company_type === selectedCompanyType
    );

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm px-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md sm:max-w-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Modal Content */}
                        <h2 className="text-2xl font-semibold text-center mb-6">
                            {isEdit ? "Edit Transaction" : "New Transaction"}
                        </h2>
                        {/* Form fields */}
                        {[
                            {
                                label: "Company type",
                                key: "type",
                                type: "select",
                                options: [
                                    "Choose an option",
                                    ...uniqueCompanyTypes,
                                ],
                            },
                            {
                                label: "Bank type",
                                key: "banktype",
                                type: "select",
                                options: [
                                    "Choose an option",
                                    ...filteredBanks.map((bank) => bank.name),
                                ],
                            },
                            {
                                label: "Beginning balance",
                                key: "amount",
                                type: "number",
                            },
                        ].map(({ label, key, type, options }, index) => (
                            <div key={index} className="relative mt-4">
                                {type === "select" ? (
                                    <select
                                        className={`peer w-full border rounded-md p-3 bg-white transition ${
                                            errors[key]
                                                ? "border-red-500"
                                                : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        }`}
                                        value={newTransaction[key] || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setNewTransaction((prevState) => ({
                                                ...prevState,
                                                [key]: value,
                                            }));

                                            // Special case for banktype
                                            if (key === "banktype") {
                                                fetchDetails(value);
                                            }

                                            // Handle company type change
                                            if (key === "type") {
                                                setSelectedCompanyType(value);
                                            }
                                        }}
                                        required
                                    >
                                        {options.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={type}
                                        placeholder=" "
                                        className={`peer w-full border rounded-md p-3 bg-white transition ${
                                            errors[key]
                                                ? "border-red-500"
                                                : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        }`}
                                        value={newTransaction[key] || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setNewTransaction((prevState) => ({
                                                ...prevState,
                                                [key]: value,
                                            }));
                                        }}
                                        required
                                    />
                                )}
                                <label
                                    className={`absolute left-3 bg-white px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 ${
                                        newTransaction[key]
                                            ? "-top-2 text-xs text-blue-500"
                                            : "top-3 text-gray-400 text-base"
                                    }`}
                                >
                                    {label}
                                </label>
                                {errors[key] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors[key]}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Display Bank Details */}
                        {(accountNumber ||
                            accTypeLocal ||
                            accountType ||
                            maintainingBalance) && (
                            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-300">
                                <h3 className="text-md font-semibold mb-3 text-gray-700">
                                    Bank Details
                                </h3>
                                <div className="grid gap-4 text-sm text-gray-700">
                                    {/* Account */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <label className="font-medium mb-1 sm:mb-0">
                                            Account:
                                        </label>
                                        <input
                                            type="text"
                                            value={accTypeLocal || "-"}
                                            readOnly
                                            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-700"
                                        />
                                    </div>
                                    {/* Account No */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <label className="font-medium mb-1 sm:mb-0">
                                            Account No:
                                        </label>
                                        <input
                                            type="text"
                                            value={accountNumber || "-"}
                                            readOnly
                                            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-700"
                                        />
                                    </div>
                                    {/* Account Type */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <label className="font-medium mb-1 sm:mb-0">
                                            Account Type:
                                        </label>
                                        <input
                                            type="text"
                                            value={accountType || "-"}
                                            readOnly
                                            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-700"
                                        />
                                    </div>
                                    {/* Maintaining Balance */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <label className="font-medium mb-1 sm:mb-0">
                                            Maintaining Balance:
                                        </label>
                                        <input
                                            type="text"
                                            value={maintainingBalance || "-"}
                                            readOnly
                                            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105 w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={
                                    isEdit
                                        ? handleSubmitUpdate
                                        : handleSubmitAdd
                                }
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 w-full sm:w-auto"
                            >
                                {isEdit ? "Save Changes" : "Add Transaction"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const DeleteTransactionModal = ({
    showModal,
    setShowModal,
    handleConfirmDelete,
}) => {
    useEffect(() => {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [showModal]);

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[90%] md:w-96"
                    >
                        <h2 className="text-lg font-semibold text-center">
                            Confirm Deletion
                        </h2>
                        <p className="mt-2 text-center">
                            Are you sure you want to delete this bank?
                        </p>
                        <div className="mt-4 flex justify-center space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export { TransactionModal, DeleteTransactionModal };
