import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const BankModal = ({
    showModal,
    setShowModal,
    newBank,
    selectedBank,
    setNewBank,
    setSelectedBank,
    errors,
    handleSubmitAdd,
    handleSubmitUpdate,
    isEdit = false,
}) => {
    const bank = isEdit ? selectedBank : newBank;
    const setBank = isEdit ? setSelectedBank : setNewBank;
    useEffect(() => {
        if (!isEdit && showModal) {
            setNewBank({
                type: "Local Bank",
                company_type: "",
                dateOpened: "",
                name: "",
                branch: "",
                accountNumber: "",
                currency: "PHP",
                balance: "",
            });
        }
    }, [isEdit, showModal, setNewBank]);

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
                        className="bg-white rounded-2xl shadow-2xl p-6 w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <h2 className="text-2xl font-semibold text-center mb-6">
                            {isEdit ? "Edit Bank Details" : "Add New Bank"}
                        </h2>

                        {/* Company Selection */}
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Company
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-blue-500"
                                value={bank.company_type || ""}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    setBank({
                                        ...bank,
                                        company_type: selectedValue,
                                    });
                                }}
                            >
                                <option value="">Choose an option</option>
                                <option value="COBANKIAT HDWE., INC">
                                    COBANKIAT HDWE., INC
                                </option>
                                <option value="COBYS MKTG CORP">
                                    COBYS MKTG CORP
                                </option>
                                <option value="COBANKIAT MKTG CORP">
                                    COBANKIAT MKTG CORP
                                </option>
                                <option value="HANDLE BAR INC">
                                    HANDLE BAR INC
                                </option>
                                <option value="CNC INVESTMENT CORP">
                                    CNC INVESTMENT CORP
                                </option>
                                <option value="HYPERLAND HOLDINGS INC">
                                    HYPERLAND HOLDINGS INC
                                </option>
                                <option value="AUTUMN HILLS">
                                    AUTUMN HILLS
                                </option>
                                <option value="WOODTURNER">WOODTURNER</option>
                                <option value="EUROPEAN MIX CONCEPTS">
                                    EUROPEAN MIX CONCEPTS
                                </option>
                                <option value="MAYAPA CBK INDUSTRY INC">
                                    MAYAPA CBK INDUSTRY INC
                                </option>
                                <option value="COBY'S GEAR">COBY'S GEAR</option>
                                <option value="CODEFORCE">CODEFORCE</option>
                            </select>
                        </div>

                        {/* Bank Type Selection - Align left */}
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Bank Type
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-blue-500"
                                value={bank.type}
                                onChange={(e) => {
                                    const selectedType = e.target.value;
                                    setBank({
                                        ...bank,
                                        type: selectedType,
                                        currency:
                                            selectedType === "Foreign Bank"
                                                ? "USD"
                                                : "PHP",
                                    });
                                }}
                            >
                                <option value="Local Bank">Local Bank</option>
                                <option value="Foreign Bank">
                                    Foreign Bank
                                </option>
                            </select>
                        </div>

                        {/* Account Type Selection - Align left */}
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Account Type
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-blue-500"
                                value={bank.account_type}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    setBank({
                                        ...bank,
                                        account_type:
                                            selectedValue === ""
                                                ? ""
                                                : selectedValue,
                                    });
                                }}
                            >
                                <option value="">Choose an option</option>
                                <option value="S/A">
                                    Savings Account (S/A)
                                </option>
                                <option value="C/A">
                                    Current Account (C/A)
                                </option>
                            </select>
                        </div>

                        {/* Date Opened - Align left */}
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Date Opened
                            </label>
                            <input
                                type="date"
                                className={`w-full border ${
                                    errors.dateOpened
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition`}
                                value={bank.dateOpened}
                                onChange={(e) =>
                                    setBank({
                                        ...bank,
                                        dateOpened: e.target.value,
                                    })
                                }
                            />
                            {errors.dateOpened && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.dateOpened}
                                </p>
                            )}
                        </div>

                        {/* Bank Name, Branch, Account Number - Align right */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {[
                                { label: "Bank Name", key: "name" },
                                { label: "Branch Name", key: "branch" },
                                {
                                    label: "Account No.",
                                    key: "accountNumber",
                                },
                            ].map(({ label, key }, index) => (
                                <div key={index} className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        className={`peer w-full border rounded-md p-3 bg-white transition
                                                ${
                                                    errors[key]
                                                        ? "border-red-500"
                                                        : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                                                }
                                                ${
                                                    bank[key]
                                                        ? "border-blue-500"
                                                        : "hover:border-blue-400"
                                                }`}
                                        value={bank[key]}
                                        onChange={(e) =>
                                            setBank({
                                                ...bank,
                                                [key]: e.target.value,
                                            })
                                        }
                                    />
                                    <label
                                        className={`absolute left-3 bg-white px-1 transition-all
                                                peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                                                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
                                                ${
                                                    bank[key]
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
                        </div>

                        {/* Currency Selection for Foreign Bank - Align left */}
                        {bank.type === "Foreign Bank" && (
                            <div className="relative mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Currency
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-blue-500"
                                    value={bank.currency}
                                    onChange={(e) =>
                                        setBank({
                                            ...bank,
                                            currency: e.target.value,
                                        })
                                    }
                                >
                                    <option value="USD">USD</option>
                                    <option value="CNY">CNY</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                        )}

                        {/* Maintaining Balance - Align right */}
                        <div className="relative mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Maintaining Balance ({bank.currency})
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md p-3 bg-white">
                                <span className="text-gray-500 pr-2">
                                    {bank.currency === "PHP"
                                        ? "₱"
                                        : bank.currency}
                                </span>
                                <input
                                    type="number"
                                    className="w-full focus:outline-none"
                                    value={bank.balance}
                                    onChange={(e) =>
                                        setBank({
                                            ...bank,
                                            balance: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {errors.balance && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.balance}
                                </p>
                            )}
                        </div>

                        {/* Modal Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105 w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (isEdit) {
                                        handleSubmitUpdate(bank);
                                    } else {
                                        handleSubmitAdd(bank);
                                    }
                                }}
                                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 w-full sm:w-auto"
                            >
                                {isEdit ? "Save Changes" : "Save"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const DeleteBankModal = ({ showModal, setShowModal, handleConfirmDelete }) => {
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

export { BankModal, DeleteBankModal };
