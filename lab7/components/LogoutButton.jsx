import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LogoutButton = ({ onLogout }) => {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
      <Text style={styles.logoutButtonText}>Вийти</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
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
