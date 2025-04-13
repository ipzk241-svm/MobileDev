import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import moment from "moment";
import RemindCard from "./RemindCard";

const RemindersList = ({ reminders, onDelete, onToggleFinished }) => {
  const renderItem = ({ item }) => (
    <RemindCard remind={item} onDelete={onDelete} onToggleFinished={onToggleFinished} />
  );

  if (reminders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>To-Do list is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reminderItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  reminderText: {
    fontSize: 16,
  },
});

export default RemindersList;
