import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

function DirectoriesList({ directoryPath, changeActiveDirectory }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        const names = await FileSystem.readDirectoryAsync(directoryPath);
        const itemsWithType = await Promise.all(
          names.map(async (name) => {
            const fullPath = directoryPath + name;
            const info = await FileSystem.getInfoAsync(fullPath);
            return {
              name,
              info,
            };
          })
        );
        setItems(itemsWithType);
      } catch (error) {
        console.error("Error reading directory:", error);
      }
    };

    fetchDirectories();
  }, [directoryPath]);

  function getParentDirectory(directoryPath) {
    const normalized = directoryPath.endsWith("/")
      ? directoryPath.slice(0, -1)
      : directoryPath;

    const parentPath = normalized.substring(0, normalized.lastIndexOf("/") + 1);

    if (parentPath === directoryPath) {
      return null;
    }

    return parentPath;
  }

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={() => {
        changeActiveDirectory(item.info.uri);
      }}
    >
      <Text style={styles.buttonText}>
        {item.name} {item.info.isDirectory ? "📁" : "📄"}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => {
          changeActiveDirectory(getParentDirectory(directoryPath));
        }}
      >
        <Entypo name={"level-up"} size={22} color={"black"} />
      </Pressable>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
});

export default DirectoriesList;
