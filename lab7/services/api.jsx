import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://lab7-da4b7-default-rtdb.europe-west1.firebasedatabase.app/",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.params = {
        ...(config.params || {}),
        auth: token,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
