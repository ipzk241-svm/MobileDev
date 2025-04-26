import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Alert, Modal } from "react-native";
import * as FileSystem from "expo-file-system";
import DirectoriesList from "../components/DirectoriesList";
import FolderCreateModal from "../components/FolderCreateModal";
import FileCreateModal from "../components/FileCreateModal";
import { useNavigation } from "@react-navigation/native";

const directoryPath = FileSystem.documentDirectory + "AppData";

function FilesScreen() {
  const [activeDirectory, setActiveDirectory] = useState(directoryPath);
  const [refresh, setRefresh] = useState(true);
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const [isFileModalVisible, setIsFileModalVisible] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Поточна директорія:</Text>
      <Text style={styles.path}>{activeDirectory}</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setIsFolderModalVisible(true)}
        >
          <Text style={styles.buttonText}>📁Створити папку</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setIsFileModalVisible(true)}
        >
          <Text style={styles.buttonText}>📄Створити файл</Text>
        </Pressable>
      </View>
      <FolderCreateModal
        isVisible={isFolderModalVisible}
        onClose={() => setIsFolderModalVisible(false)}
        context={{
          activeDirectory,
          refresh,
          setRefresh,
        }}
      />

      <FileCreateModal
        isVisible={isFileModalVisible}
        onClose={() => setIsFileModalVisible(false)}
        context={{
          activeDirectory,
          refresh,
          setRefresh,
        }}
      />

      <DirectoriesList
        directoryPath={activeDirectory}
        changeActiveDirectory={setActiveDirectory}
        refreshTrigger={refresh}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  path: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
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
});

export default FilesScreen;
