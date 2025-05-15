import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={clsx(
                "relative inline-flex items-center px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2",
                "backdrop-blur-md bg-opacity-10",
                active
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                    : "text-gray-300 hover:bg-gray-700 hover:text-cyan-300",
                className
            )}
        >
            {children}

            {/* Glowing Animated Underline */}
            <span
                className={clsx(
                    "absolute bottom-0 left-0 h-0.5 w-full bg-cyan-400 rounded-full transition-all duration-300",
                    active
                        ? "opacity-100 scale-x-100 shadow-md shadow-cyan-500/50"
                        : "opacity-0 scale-x-0"
                )}
            ></span>

            {/* Neon Glow Effect */}
            {active && (
                <span className="absolute inset-0 rounded-lg border border-cyan-500 shadow-lg shadow-cyan-500/30 animate-pulse"></span>
            )}
        </Link>
    );
}
