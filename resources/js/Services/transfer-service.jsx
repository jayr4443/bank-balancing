import http from "./http.service";

const transferService = {
    createTransfer: async (transfer) => {
        const payload = {
            company_type: transfer.type,
            bank_name: transfer.banktype,
            beginning_balance: parseFloat(transaction.amount),
            account_type: transfer.account_type,
            account_number: transfer.acctnumber,
            maintaining_balance: parseFloat(transfer.balance),
        };

        console.log("Payload to send:", payload);

        try {
            const response = await http.post("/transactions", payload);
            return response;
        } catch (error) {
            console.error(
                "Error creating transaction:",
                error.response?.data || error.message
            );
            throw error;
        }
    },

    // getAllTransfer: async () => {
    //     try {
    //         const response = await http.get("/transactions");

    //         if (!response.data || !Array.isArray(response.data)) {
    //             console.warn("Unexpected response format:", response.data);
    //             return [];
    //         }

    //         return response.data.map((trx) => ({
    //             id: trx.id,
    //             company_type: trx.company_type,
    //             bank_name: trx.bank_name,
    //             beginning_balance: parseFloat(trx.beginning_balance || 0),
    //             account_type: trx.account_type,
    //             account_number: trx.account_number,
    //             maintaining_balance: parseFloat(trx.maintaining_balance || 0),
    //             created_at: trx.created_at,
    //         }));
    //     } catch (error) {
    //         console.error(
    //             "Error fetching transactions:",
    //             error.response?.data || error.message
    //         );
    //         throw error;
    //     }
    // },

    // updateTransfer: async (id, transaction) => {
    //     if (!id) {
    //         console.error("Transaction ID is undefined");
    //         return;
    //     }

    //     const payload = {
    //         company_type: transaction.company_type,
    //         bank_name: transaction.bank_name,
    //         beginning_balance: parseFloat(transaction.beginning_balance),
    //         account_type: transaction.account_type,
    //         account_number: transaction.account_number,
    //         maintaining_balance: parseFloat(transaction.maintaining_balance),
    //     };

    //     console.log("Payload to update:", payload);

    //     try {
    //         const response = await http.put(`/transactions/${id}`, payload, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         console.log("Updated Transaction:", response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error(
    //             "Error updating transaction:",
    //             error.response?.data || error.message
    //         );
    //         throw error;
    //     }
    // },

    // deleteTransfer: async (id) => {
    //     try {
    //         return await http.delete(`/transactions/${id}`);
    //     } catch (error) {
    //         console.error(
    //             "Error deleting transaction:",
    //             error.response?.data || error.message
    //         );
    //         throw error;
    //     }
    // },
};

export default transferService;
