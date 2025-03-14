import React from "react";
import { useTheme } from "../config/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

const Friends = () => {
  const { theme } = useTheme();
  const friendsData = [
    { id: "1", name: "Mark Dyson", status: "online" },
    { id: "2", name: "Player123", status: "offline" },
  ];

  return (
    <View style={styles.chatContainer}>
      {friendsData.map((friend) => (
        <View key={friend.id} style={styles.chatItem}>
          <Text style={{ color: theme.text1 }}>{friend.name}</Text>
          <Text
            style={{ color: friend.status === "online" ? "green" : "gray" }}
          >
            {friend.status}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  unread: {
    color: "white",
    backgroundColor: "blue",
    borderRadius: 10,
    width: 20,
    textAlign: "center",
    marginLeft: 5,
  },
});

export default Friends;
