import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    FaChartBar,
    FaUniversity,
    FaMoneyCheckAlt,
    FaHistory,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import bankService from "@/Services/bank-service";
import transactionService from "@/Services/transaction-service";
import { MdDashboardCustomize } from "react-icons/md";

export default function Dashboard() {
    const [banks, setBanks] = useState([]);
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const banksData = await bankService.getAllBanks();
                setBanks(banksData);
            } catch (error) {
                console.error("Failed to fetch banks:", error);
            }
        };
        fetchBanks();
    }, []);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const transactionData =
                    await transactionService.getAllTransactions();
                setTransaction(transactionData);
            } catch (error) {
                console.error("Failed to fetch banks:", error);
            }
        };
        fetchBanks();
    }, []);

    return (
        <AuthenticatedLayout header={<Header />}>
            <Head title="Transaction" />
            <div className="py-12 bg-gray-100 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Overview Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <StatCard
                            icon={<FaChartBar className="text-blue-600" />}
                            title="Total Transactions"
                            value={transaction.length}
                        />
                        <StatCard
                            icon={<FaUniversity className="text-green-600" />}
                            title="Total Banks"
                            value={banks.length}
                        />
                        <StatCard
                            icon={
                                <FaMoneyCheckAlt className="text-purple-600" />
                            }
                            title="Total Balance"
                            value="$50,000.00"
                        />
                        <StatCard
                            icon={<FaHistory className="text-red-600" />}
                            title="Recent Activity"
                            value="12 New"
                        />
                    </div>
                    {/* Recent Transactions Section */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 shadow-xl sm:rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Recent Transactions
                        </h3>
                        <p className="text-gray-600">
                            No recent transactions available.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const Header = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 bg-white/70 backdrop-blur-md shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <MdDashboardCustomize className="text-blue-600 text-3xl sm:text-4xl" />
            <span className="tracking-wide">Dashboard Overview</span>
        </h2>
    </div>
);

const StatCard = ({ icon, title, value }) => (
    <div className="relative p-6 rounded-2xl bg-white bg-opacity-80 backdrop-blur-md border border-gray-300 shadow-xl flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-opacity-100">
        <div className="text-6xl mr-4 drop-shadow-lg">{icon}</div>
        <div>
            <p className="text-gray-700 font-medium tracking-wide">{title}</p>
            <p className="text-3xl font-extrabold text-gray-900">{value}</p>
        </div>
    </div>
);
