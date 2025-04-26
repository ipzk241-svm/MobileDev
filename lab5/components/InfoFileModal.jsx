import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";

function InfoFileModal({ isVisible, onClose, item }) {
  const [fileInfo, setFileInfo] = React.useState(null);

  React.useEffect(() => {
    if (item) {
      FileSystem.getInfoAsync(item.info.uri, { size: true }).then((info) => {
        if (info.isDirectory) {
          calculateDirectorySize(item.info.uri).then((size) => {
            info.size = size;
            setFileInfo(info);
          });
        } else {
          setFileInfo(info);
        }
      });
    }
  }, [item]);

  const getFileExtension = (name) => {
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "папка";
  };

  const calculateDirectorySize = async (uri) => {
    let totalSize = 0;

    const entries = await FileSystem.readDirectoryAsync(uri);

    for (const entry of entries) {
      const entryUri = `${uri}/${entry}`;
      const info = await FileSystem.getInfoAsync(entryUri);

      if (info.isDirectory) {
        totalSize += await calculateDirectorySize(entryUri);
      } else {
        totalSize += info.size || 0;
      }
    }

    return totalSize;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>ℹ️ Інформація</Text>
          {fileInfo ? (
            <View style={styles.infoContainer}>
              <InfoRow label="Назва" value={item.name} />
              <InfoRow
                label="Тип"
                value={
                  fileInfo.isDirectory ? "Папка" : getFileExtension(item.name)
                }
              />
              <InfoRow label="Розмір" value={`${fileInfo.size} байт`} />
              <InfoRow
                label="Дата змін"
                value={new Date(
                  fileInfo.modificationTime * 1000
                ).toLocaleString()}
              />
            </View>
          ) : (
            <Text>Завантаження...</Text>
          )}

          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Закрити</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "600",
    color: "#333",
  },
  value: {
    color: "#555",
    maxWidth: "60%",
    textAlign: "right",
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#4e73df",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ff4444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default InfoFileModal;
