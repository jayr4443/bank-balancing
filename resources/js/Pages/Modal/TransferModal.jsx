import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import bankService from "../../Services/bank-service";

const TransferModal = ({ showModal, setShowModal, errors }) => {
    const [bankList, setBankList] = useState([]);
    const [selectedBankDetails, setSelectedBankDetails] = useState(null);

    const [newTransfer, setNewTransfer] = useState({
        company_type: "" || "Choose an option",
        bank_type: "" || "Choose an option",
        funds: "",
    });

    useEffect(() => {
        const fetchBankList = async () => {
            try {
                const response = await bankService.getAllBanks();
                setBankList(response);
            } catch (error) {
                console.error("Failed to fetch bank list:", error);
            }
        };

        fetchBankList();
    }, []);

    const uniqueCompanyTypes = [
        ...new Set(bankList.map((bank) => bank.company_type)),
    ];

    const filteredBanks = bankList.filter(
        (bank) => bank.company_type === newTransfer.company_type
    );

    const handleChange = (key, value) => {
        setNewTransfer((prev) => ({
            ...prev,
            [key]: value,
            ...(key === "company_type"
                ? { bank_type: "Choose an option" }
                : {}),
        }));

        if (key === "bank_type") {
            const selectedBank = filteredBanks.find(
                (bank) => bank.name === value
            );
            setSelectedBankDetails(selectedBank || null);
        }

        if (key === "company_type") {
            // Reset the selected bank details when company changes
            setSelectedBankDetails(null);
        }
    };

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
                            Transfer Funds
                        </h2>

                        {[
                            {
                                key: "company_type",
                                type: "select",
                                options: [
                                    "Choose Company",
                                    ...uniqueCompanyTypes,
                                ],
                            },
                            {
                                key: "bank_type",
                                type: "select",
                                options: [
                                    "Choose Bank",
                                    ...filteredBanks.map((bank) => bank.name),
                                ],
                            },
                            {
                                label: "Funds",
                                key: "funds",
                                type: "number",
                            },
                        ].map(({ label, key, type, options }, index) => (
                            <div key={index} className="relative mt-4">
                                {type === "select" ? (
                                    <select
                                        className={`peer w-full border rounded-md p-3 bg-white transition ${
                                            errors && errors[key]
                                                ? "border-red-500"
                                                : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        }`}
                                        value={newTransfer[key]}
                                        onChange={(e) =>
                                            handleChange(key, e.target.value)
                                        }
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
                                            errors && errors[key]
                                                ? "border-red-500"
                                                : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        }`}
                                        value={newTransfer[key]}
                                        onChange={(e) =>
                                            handleChange(key, e.target.value)
                                        }
                                        required
                                    />
                                )}

                                {/* Floating label */}
                                <label
                                    className={`absolute left-3 bg-white px-1 transition-all
                                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
                                        ${
                                            newTransfer[key]
                                                ? "-top-2 text-xs text-blue-500"
                                                : "top-3 text-gray-400 text-base"
                                        }`}
                                >
                                    {label}
                                </label>

                                {/* Validation error */}
                                {errors && errors[key] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors[key]}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Show bank details if a bank is selected */}
                        {selectedBankDetails && (
                            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-300">
                                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                                    Bank Details
                                </h3>
                                <div className="grid gap-3 text-sm text-gray-700">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <label className="font-medium mb-1 sm:mb-0">
                                            Account:
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                selectedBankDetails.type || "-"
                                            }
                                            readOnly
                                            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 bg-gray-100"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <label className="font-medium mb-1 sm:mb-0">
                                            Account No:
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                selectedBankDetails.accountNumber ||
                                                "-"
                                            }
                                            readOnly
                                            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 bg-gray-100"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <label className="font-medium mb-1 sm:mb-0">
                                            Account Type:
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                selectedBankDetails.account_type ||
                                                "-"
                                            }
                                            readOnly
                                            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 bg-gray-100"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <label className="font-medium mb-1 sm:mb-0">
                                            Maintaining Balance:
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                selectedBankDetails.balance ||
                                                "-"
                                            }
                                            readOnly
                                            className="w-full sm:w-1/2 border border-gray-300 rounded-md p-3 bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setNewTransfer({
                                        company_type: "",
                                        bank_type: "",
                                        funds: "",
                                    });
                                    setSelectedBankDetails(null);
                                }}
                                className="bg-gray-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105 w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 w-full sm:w-auto">
                                Save
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TransferModal;
