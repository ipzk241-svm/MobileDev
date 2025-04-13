import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";

const RemindCard = ({ remind, onDelete, onToggleFinished }) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => onToggleFinished(remind.id)}>
          <Ionicons
            name={remind.isFinished ? "checkbox" : "square-outline"}
            size={28}
            color={remind.isFinished ? "green" : "#ccc"}
          />
        </TouchableOpacity>

        <View>
          <Text
            style={[
              styles.title,
              remind.isFinished && {
                textDecorationLine: "line-through",
                color: "gray",
              },
            ]}
          >
            {remind.name}
          </Text>
          <Text style={styles.description}>{remind.description}</Text>
          <Text style={styles.description}>
            {moment(remind.date).format("DD MMM YYYY, HH:mm")}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onDelete(remind.id)}
        style={styles.deleteIcon}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  deleteIcon: {},
});

export default RemindCard;
