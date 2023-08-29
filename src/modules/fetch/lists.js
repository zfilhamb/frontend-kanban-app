import { instance } from "../axios/index.js";

async function getAllList() {
    try {
        const response = await instance.get("/lists");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getListDetail(id) {
    try {
        const response = await instance.get(`/lists/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createNewList(data) {
    try {
        const response = await instance.post("/lists", data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editList(id, data) {
    try {
        const response = await instance.put(`/lists/${id}`, { data });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteListById(id) {
    try {
        const response = await instance.delete(`/lists/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {
    getAllList,
    getListDetail,
    createNewList,
    editList,
    deleteListById
}  