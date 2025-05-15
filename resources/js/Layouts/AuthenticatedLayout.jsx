import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <nav className="border-b border-gray-200 bg-white shadow-md sticky top-0 z-50">
                <div className="mx-auto max-w-[90rem] px-8 sm:px-12 lg:px-16">
                    <div className="flex h-16 justify-between items-center">
                        {/* Left Section */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <ApplicationLogo className="h-9 w-auto text-gray-800" />
                                <span className="text-lg font-bold text-gray-800 hidden sm:block">
                                    Treasury System
                                </span>
                            </Link>
                            <div className="hidden space-x-6 sm:flex ml-10">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("transaction")}
                                    active={route().current("transaction")}
                                >
                                    Transaction
                                </NavLink>
                                <NavLink
                                    href={route("banklist")}
                                    active={route().current("banklist")}
                                >
                                    Bank List
                                </NavLink>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="hidden sm:flex items-center gap-4">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                                        <FaUserCircle className="text-2xl" />
                                        <span className="text-sm font-medium">
                                            {user.name}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    !showingNavigationDropdown
                                )
                            }
                            className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            {showingNavigationDropdown ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={`sm:hidden ${
                    showingNavigationDropdown ? "block" : "hidden"
                }`}
            >
                <div className="bg-white shadow-md space-y-2 py-3">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("transaction")}
                        active={route().current("transaction")}
                    >
                        Transaction
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route("banklist")}
                        active={route().current("banklist")}
                    >
                        Bank List
                    </ResponsiveNavLink>
                    <div className="border-t border-gray-300 pt-3">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Header */}
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}
