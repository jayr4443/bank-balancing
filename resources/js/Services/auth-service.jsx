import http from "./http.service";

export const login = async (credentials) => {
    try {
        await http.get("/sanctum/csrf-cookie");

        const response = await http.post("/login", credentials);

        localStorage.setItem("token", response.data.token);

        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};
