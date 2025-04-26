import React, { use, useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import MainScreen from "./screens/MainScreen";
import FilesScreen from "./screens/FilesScreen";
import * as FileSystem from "expo-file-system";
import DirectoryStack from "./screens/DirectoryStack";

const Tab = createBottomTabNavigator();
const directoryPath = FileSystem.documentDirectory + "AppData/";

export default function App() {
  useEffect(() => {
    const createDirectory = async () => {
      try {
        const isDirectoryExists = await FileSystem.getInfoAsync(directoryPath);
        if (!isDirectoryExists.exists) {
          await FileSystem.makeDirectoryAsync(directoryPath, {
            intermediates: true,
          });
        }
      } catch (error) {
        console.error("Error creating directory:", error);
      }
    };

    createDirectory();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Directory") {
              iconName = "inbox";
            }

            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="Directory" component={DirectoryStack} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
