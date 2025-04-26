import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";

function FolderCreateModal({ isVisible, onClose, context }) {
  const { activeDirectory, refresh, setRefresh } = context;
  const [newFolderName, setNewFolderName] = useState("");

  const createFolder = async () => {
    if (!newFolderName) {
      Alert.alert("❌ Помилка", "Введіть назву папки");
      return;
    }

    const fullPath = `${activeDirectory}/${newFolderName}`;
    try {
      await FileSystem.makeDirectoryAsync(fullPath, { intermediates: true });
      Alert.alert("✅ Успіх", `Папку "${newFolderName}" створено`);
      setNewFolderName("");
      onClose();
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error creating folder:", error);
      Alert.alert("❌ Помилка", "Не вдалося створити папку");
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
          <Text style={styles.modalTitle}>Створити нову папку</Text>

          <TextInput
            style={styles.input}
            placeholder="Назва папки"
            value={newFolderName}
            onChangeText={setNewFolderName}
          />

          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Скасувати</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={createFolder}>
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

export default FolderCreateModal;
