import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CreateBalance() {
    const { data, setData, post, processing } = useForm({
        bank_name: "",
        balance: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/balances");
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Balance
                </h2>
            }
        >
            <Head title="Create Balance" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Bank Name</label>
                                <input
                                    type="text"
                                    name="bank_name"
                                    value={data.bank_name}
                                    onChange={(e) => setData("bank_name", e.target.value)}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Balance</label>
                                <input
                                    type="number"
                                    name="balance"
                                    value={data.balance}
                                    onChange={(e) => setData("balance", e.target.value)}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                disabled={processing}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
