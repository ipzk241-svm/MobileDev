import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";

function FileCreateModal({ isVisible, onClose, context }) {
  const { activeDirectory, refresh, setRefresh } = context;

  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");

  const createTextFile = async () => {
    if (!newFileName) {
      Alert.alert("❌ Помилка", "Введіть назву файлу");
      return;
    }

    const fileName = newFileName.endsWith(".txt")
      ? newFileName
      : `${newFileName}.txt`;
    const fullPath = `${activeDirectory}/${fileName}`;

    try {
      await FileSystem.writeAsStringAsync(
        fullPath,
        newFileContent || "Це новий файл."
      );
      setNewFileName("");
      setNewFileContent("");
      onClose();
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error creating file:", error);
      Alert.alert("❌ Помилка", "Не вдалося створити файл");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Створити новий файл</Text>

          <TextInput
            style={styles.input}
            placeholder="Назва файлу (без .txt)"
            value={newFileName}
            onChangeText={setNewFileName}
          />
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="Вміст файлу"
            value={newFileContent}
            onChangeText={setNewFileContent}
            multiline
          />

          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Скасувати</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={createTextFile}>
              <Text style={styles.buttonText}>Створити</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4e73df",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  contentInput: {
    height: 100,
    textAlignVertical: "top",
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#ff4444",
  },
});

export default FileCreateModal;
