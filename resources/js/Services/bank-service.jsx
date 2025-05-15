import http from "./http.service";

const bankService = {
    createBank: async (bank) => {
        const payload = {
            type: bank.type === "Foreign Bank" ? "Foreign" : "Local",
            dateOpened: bank.dateOpened,
            company_type: bank.company_type,
            bankname: bank.name,
            branchname: bank.branch,
            acctnumber: bank.accountNumber,
            currency: bank.currency ?? "PHP",
            maintaining_balance: parseFloat(bank.balance),
            account_type: bank.account_type ?? "S/A",
        };

        try {
            return await http.post("/banks", payload);
        } catch (error) {
            console.error("Error creating bank:", error);
            throw error;
        }
    },

    getAllBanks: async () => {
        try {
            const response = await http.get("/banks");

            if (!response.data || !Array.isArray(response.data)) {
                console.warn("Unexpected response format:", response.data);
                return [];
            }

            return response.data.map((bank) => ({
                id: bank.id,
                type:
                    bank.type?.toLowerCase() === "foreign"
                        ? "Foreign Bank"
                        : "Local Bank",
                dateOpened: bank.dateOpened || "",
                company_type: bank.company_type || "",
                name: bank.name?.toUpperCase() || "",
                branch: bank.branch?.toUpperCase() || "",
                accountNumber: bank.accountNumber?.toUpperCase() || "",
                balance: Number(bank.balance || 0),
                currency: bank.currency || "PHP",
                account_type: bank.account_type || "N/A",
            }));
        } catch (error) {
            console.error(
                "Error fetching banks:",
                error.response?.data || error.message
            );
            throw error;
        }
    },

    updateBank: async (id, bank) => {
        console.log("Updating bank with ID:", id);
        console.log("Bank Data:", bank);

        const payload = {
            type: bank.type === "Foreign Bank" ? "Foreign" : "Local",
            dateOpened: bank.dateOpened,
            company_type: bank.company_type,
            bankname: bank.name,
            branchname: bank.branch,
            acctnumber: bank.accountNumber,
            currency: bank.currency || "PHP",
            maintaining_balance: bank.balance ? parseFloat(bank.balance) : 0,
            account_type: bank.accountType || "S/A",
        };

        try {
            const response = await http.put(`/banks/${id}`, payload);
            console.log("✅ Bank updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "Error updating bank:",
                error.response?.data || error.message
            );
            throw error;
        }
    },

    deleteBank: async (id) => {
        try {
            return await http.delete(`/banks/${id}`);
        } catch (error) {
            console.error("Error deleting bank:", error);
            throw error;
        }
    },
};

export default bankService;
