import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

const CreatePostScreen = ({ navigation, route }) => {
  const { userId } = useContext(AuthContext);
  const editingPost = route.params?.post || null;

  const [title, setTitle] = useState(editingPost?.title || "");
  const [body, setBody] = useState(editingPost?.body || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
      return;
    }

    setLoading(true);
    try {
      if (editingPost) {
        await api.put(`/posts/${editingPost.id}.json`, {
          ...editingPost,
          title,
          body,
        });
        Alert.alert("Успіх", "Пост оновлено!");
      } else {
        await api.post("/posts.json", {
          title,
          body,
          userId,
          createdAt: new Date().toISOString(),
        });
        Alert.alert("Успіх", "Пост створено!");
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Помилка",
        editingPost ? "Не вдалося оновити пост" : "Не вдалося створити пост"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Заголовок"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Текст поста"
        style={[styles.input, { height: 100 }]}
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button
        title={loading ? "Збереження..." : editingPost ? "Оновити" : "Зберегти"}
        onPress={handleSave}
        disabled={loading}
      />
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f7",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});
