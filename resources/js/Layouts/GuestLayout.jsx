import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
            {/* Logo Container */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-blue-500/50">
                <Link
                    href="/"
                    className="transition-transform duration-500 hover:rotate-12"
                >
                    <ApplicationLogo className="h-20 w-20 text-blue-400 drop-shadow-lg" />
                </Link>
            </div>

            {/* Main Card Container */}
            <div className="relative w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-xl p-10 shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
                {/* Treasury System Title */}
                <h1 className="text-center text-4xl font-extrabold text-white tracking-wide drop-shadow-glow">
                    Treasury System
                </h1>

                {/* Animated Divider */}
                <div className="mt-3 h-1 w-24 mx-auto bg-blue-500 rounded-full animate-pulse"></div>

                {/* Content Section */}
                <div className="mt-8">{children}</div>

                {/* Footer Links */}
                <div className="mt-8 text-center text-sm text-gray-300">
                    <p>
                        Need help?{" "}
                        <Link
                            href="#"
                            className="font-semibold text-blue-400 hover:underline hover:text-blue-300 transition-all duration-200"
                        >
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
