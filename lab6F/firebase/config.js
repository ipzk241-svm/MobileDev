import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYcPWqMXOFChENf6ZVQ6XoKFDpgRNcSbQ",
  authDomain: "lab6-5038a.firebaseapp.com",
  projectId: "lab6-5038a",
  storageBucket: "lab6-5038a.firebasestorage.app",
  messagingSenderId: "786322989570",
  appId: "1:786322989570:web:4e1868bef2f5dfd31bbd1b",
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const auth = getAuth(app);

export { auth };
