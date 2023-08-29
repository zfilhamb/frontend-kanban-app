import { instance } from "../axios/index.js";
import Swal from "sweetalert2";


async function getAllBoard() {
    try {
        const response = await instance.get("/boards");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getBoardDetail(id) {
    try {
        const response = await instance.get(`/boards/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

async function createNewBoard(data) {
    try {
        const response = await instance.post("/boards", data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteBoardById(id) {
    try {
        const response = await instance.delete(`/boards/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editBoard(id, data) {
    try {
        const response = await instance.put(`/boards/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message || "Something went wrong"
          });
    }
}

export {
    getAllBoard,
    createNewBoard,
    deleteBoardById,
    editBoard,
    getBoardDetail
}