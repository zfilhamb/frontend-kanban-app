import { instance } from "../axios/index.js";
import Swal from "sweetalert2";
import useAuthStore from "../authStore";

async function registerUser(data) {
  try {
    const response = await instance.post("/users/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function loginUser(data) {
  try {
    const response = await instance.post("/users/login", data);
    const { token, email, name, id } = response.data;
    
    useAuthStore.setState((state) => ({
      user: {
        ...state.user,
        token,
        email,
        name,
        id,
      },
    }));
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllUsers() {
  try {
    const response = await instance.get("/users");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function updateUser(id, data) {
  try {
    const response = await instance.put(`/users/update-user`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    Swal.fire({
      position: "middle",
      icon: "success",
      title: "Update Profile Successfully.",
      showConfirmButton: false,
      timer: 1500
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

async function updateProfile(id, name, password) {
  try {
    const response = await instance.patch(`/users/profile-user`, {
      id,
      name,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function changePassword(id, data) {
  try {
    const response = await instance.put(`/users/update/${id}`, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteUser(id) {
  try {
    const response = await instance.delete(`/users/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getLoginUser() {
  try {
      const response = await instance.get(`/users/me`);
      return response.data;
  } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
  }
}

export {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  changePassword,
  updateUser,
  updateProfile,
  getLoginUser,
};
