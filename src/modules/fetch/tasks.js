import { instance } from "../axios/index.js";

async function getAllTask() {
    try {
        const response = await instance.get("/tasks");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getTaskDetail(id) {
    try {
        const response = await instance.get(`/tasks/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createNewTask(data) {
    try {
        const response = await instance.post("/tasks", data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editTask(id, data) {
    try {
        const response = await instance.put(`/tasks/${id}`,  data );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteTaskById(id) {
    try {
        const response = await instance.delete(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {
    getAllTask,
    getTaskDetail,
    createNewTask,
    editTask,
    deleteTaskById
}  