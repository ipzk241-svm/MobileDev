import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilesScreen from "./FilesScreen";
import EditFileScreen from "./EditFileScreen";

const Stack = createNativeStackNavigator();

export default function DirectoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Files"
        component={FilesScreen}
        options={{ title: "Директорія" }}
      />
      <Stack.Screen
        name="EditFile"
        component={EditFileScreen}
        options={{ title: "Редагування файлу" }}
      />
    </Stack.Navigator>
  );
}
