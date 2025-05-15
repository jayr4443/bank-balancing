import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden px-6">
                {/* Animated Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500 opacity-30 rounded-full blur-[120px] animate-pulse"></div>
                </div>

                {/* Main Glassmorphic Card */}
                <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-12 text-center border border-white/20">
                    <h1 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
                        Welcome to the{" "}
                        <span className="text-blue-400 glow-text">
                            Treasury System
                        </span>
                    </h1>
                    <p className="text-gray-300 mt-4 text-lg">
                        Manage and balance your financial transactions with
                        efficiency.
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {auth?.user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-all hover:scale-110 hover:shadow-blue-500/50"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/bank-balances"
                                    className="px-6 py-3 bg-purple-500 text-white rounded-xl shadow-lg hover:bg-purple-600 transition-all hover:scale-110 hover:shadow-purple-500/50"
                                >
                                    Bank Balances
                                </Link>
                                <Link
                                    href="/transaction"
                                    className="px-6 py-3 bg-indigo-500 text-white rounded-xl shadow-lg hover:bg-indigo-600 transition-all hover:scale-110 hover:shadow-indigo-500/50"
                                >
                                    Transaction
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition-all hover:scale-110 hover:shadow-green-500/50"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-3 bg-gray-500 text-white rounded-xl shadow-lg hover:bg-gray-600 transition-all hover:scale-110 hover:shadow-gray-500/50"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Features Section */}
                    <div className="mt-12 border-t border-gray-500 pt-8">
                        <h2 className="text-3xl font-semibold text-white tracking-wide drop-shadow-lg">
                            Treasury System Features
                        </h2>
                        <p className="text-gray-300 mt-2 text-lg">
                            Stay in control of your finances with real-time
                            monitoring and insights.
                        </p>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: "Secure Transactions",
                                    color: "text-blue-400",
                                    desc: "Ensure all transactions are safely recorded and managed.",
                                },
                                {
                                    title: "Real-time Balances",
                                    color: "text-green-400",
                                    desc: "Monitor your accounts in real-time to stay up to date.",
                                },
                                {
                                    title: "Financial Insights",
                                    color: "text-yellow-400",
                                    desc: "Generate reports and analyze your financial data with ease.",
                                },
                                {
                                    title: "Bank List Management",
                                    color: "text-purple-400",
                                    desc: "Maintain a structured list of banks with ease of access.",
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 p-6 rounded-lg shadow-xl border border-white/20 backdrop-blur-md transform hover:scale-110 transition-all duration-300 hover:shadow-lg"
                                >
                                    <h3
                                        className={`text-xl font-bold ${feature.color}`}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 mt-2">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
