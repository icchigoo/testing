import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/config";

const updateUser = async (userData) => {
  try {
    const response = await axios.put(
      `${base_url}user/edit-user/`,
      userData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};



const authService = {
  updateUser,

};

export default authService;
