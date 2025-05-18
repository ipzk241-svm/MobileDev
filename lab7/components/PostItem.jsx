import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

const PostItem = ({ id, title, body, userId, createdAt, onDeleted }) => {
  const { userId: currentUserId } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log("PostItem", { id, title, body, userId, createdAt });
  const isOwner = currentUserId === userId;
  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}.json`);
      if (onDeleted) onDeleted(id);
    } catch (error) {
      console.error("Помилка видалення поста:", error);
    }
  };

  const handleEdit = () => {
    navigation.navigate("CreatePost", {
      post: { id, title, body, userId, createdAt },
    });
  };

  return (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postBody}>{body}</Text>
      <Text style={styles.postDate}>
        Створено: {new Date(createdAt).toLocaleDateString()}
      </Text>

      {isOwner && (
        <View style={styles.buttons}>
          <Button title="Редагувати" onPress={handleEdit} color="#007bff" />
          <Button title="Видалити" onPress={handleDelete} color="#dc3545" />
        </View>
      )}
    </View>
  );
};

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
  postDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  buttons: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
