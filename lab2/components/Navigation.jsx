import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useTheme } from "../config/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Store from "../screens/Store";
import Community from "../screens/Community";
import Chat from "../screens/Chat";
import Safety from "../screens/Safety";
import UserProfile from "../screens/UserProfile";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;
            switch (route.name) {
              case "Store":
                iconSource = require("../assets/images/store_icon.png");
                break;
              case "Community":
                iconSource = require("../assets/images/community_icon.png");
                break;
              case "Chat":
                iconSource = require("../assets/images/chat_icon.png");
                break;
              case "Safety":
                iconSource = require("../assets/images/safety_icon.png");
                break;
              //   case "User":
              //     iconSource = require("../assets/images/user_icon.png");
              //     break;
            }
            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? theme.iconNonActive : theme.iconActive,
                  resizeMode: "contain",
                }}
              />
            );
          },
          tabBarActiveTintColor: theme.iconActive,
          tabBarInactiveTintColor: theme.iconNonActive,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBarBG,
            margin: 0,
            paddingTop: 10,
            height: 80,
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Store" component={Store} />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Safety" component={Safety} />
        <Tab.Screen name="User" component={UserProfile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Navigation;
