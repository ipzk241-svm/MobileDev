import React from "react";
import { Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import DirectoriesList from "../components/DirectoriesList";

const directoryPath = FileSystem.documentDirectory + "AppData/";

function FilesScreen() {
  const [activeDirectory, setActiveDirectory] = React.useState(directoryPath);

  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <Text style={{ fontSize: 20 }}>Поточна директорія:</Text>
      <Text> {activeDirectory}</Text>
      <DirectoriesList
        directoryPath={activeDirectory}
        changeActiveDirectory={setActiveDirectory}
      />
    </View>
  );
}

export default FilesScreen;
