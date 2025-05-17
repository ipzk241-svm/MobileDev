import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import UserCard from "../components/UserCard";
import LogoutButton from "../components/LogoutButton";

const ProfileScreen = () => {
  const { logout, userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get(`/users/${userId}.json`);
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль користувача</Text>
      <UserCard user={userData} />
      <LogoutButton onLogout={logout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f2f2f7",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#333",
    alignSelf: "center",
  },
});
