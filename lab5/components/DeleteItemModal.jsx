import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

function DeleteItemModal({ isVisible, onClose, item, onDelete }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Видалити {item?.name}?</Text>
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Скасувати</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                onDelete(item);
              }}
            >
              <Text style={styles.buttonText}>Видалити</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4e73df",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
  modalButtonContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#ff4444",
  },
});

export default DeleteItemModal;
