import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Clicker from "../screens/Clicker";
import Challenges from "../screens/Challenges";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let IconComponent;
            switch (route.name) {
              case "Clicker":
                IconComponent = (
                  <Icon
                    name={"play"}
                    size={24}
                    color={focused ? "#000" : "#666"}
                  />
                );
                break;
              case "Challenges":
                IconComponent = (
                  <Icon
                    name={focused ? "trophy" : "trophy-outline"}
                    size={24}
                    color={focused ? "#000" : "#666"}
                  />
                );
                break;
              default:
                return null;
            }

            return IconComponent;
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            margin: 0,
            paddingTop: 10,
            height: 80,
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Clicker" component={Clicker} />
        <Tab.Screen name="Challenges" component={Challenges} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Navigation;
