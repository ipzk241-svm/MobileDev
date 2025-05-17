import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

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
      {userData ? (
        <View style={styles.card}>
          <Text style={styles.label}>Ім'я:</Text>
          <Text style={styles.value}>{userData.name || "Невідомо"}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>
      ) : (
        <Text style={styles.noDataText}>Дані користувача не знайдені.</Text>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Вийти</Text>
      </TouchableOpacity>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "500",
    color: "#111",
    marginTop: 4,
  },
  noDataText: {
    fontSize: 16,
    color: "#999",
    alignSelf: "center",
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
