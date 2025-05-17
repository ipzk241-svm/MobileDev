import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PostItem = ({ title, body }) => (
  <View style={styles.postContainer}>
    <Text style={styles.postTitle}>{title}</Text>
    <Text style={styles.postBody}>{body}</Text>
    <Text style={styles.postDate}>Created at: {new Date().toLocaleDateString()}</Text>
  </View>
);

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
  },
  postBody: {
    fontSize: 14,
    color: "#555",
  },
  postDate:{
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  }
});
