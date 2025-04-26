import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";

const EditFileScreen = ({ route, navigation }) => {
  const { fileUri, fileName } = route.params;
  const [content, setContent] = useState("");

  useEffect(() => {
    FileSystem.readAsStringAsync(fileUri)
      .then(setContent)
      .catch(() => {
        Alert.alert("Помилка", "Не вдалося прочитати файл.");
        navigation.goBack();
      });
  }, [fileUri]);

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(fileUri, content);
      Alert.alert("✅ Збережено", "Файл успішно оновлено");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("❌ Помилка", "Не вдалося зберегти файл.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Редагування: {fileName}</Text>
      <TextInput
        style={styles.textArea}
        multiline
        value={content}
        onChangeText={setContent}
        textAlignVertical="top"
      />
      <Pressable style={styles.button} onPress={saveFile}>
        <Text style={styles.buttonText}>💾 Зберегти</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  textArea: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#4e73df",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16 },
});

export default EditFileScreen;
