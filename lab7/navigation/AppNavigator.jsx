import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostScreen from "../screens/CreatePostScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const RegisterStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const PostsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Posts" component={PostsScreen} />
    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const AppTabs = ({ userToken }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 70,
        paddingBottom: 10,
        paddingTop: 5,
      },
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "PostsTab") iconName = "list";
        else if (route.name === "ProfileTab") iconName = "person-circle";
        else if (route.name === "LoginTab") iconName = "log-in";
        else if (route.name === "RegisterTab") iconName = "person-add";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    {userToken ? (
      <>
        <Tab.Screen
          name="PostsTab"
          component={PostsStack}
          options={{ title: "Posts" }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStack}
          options={{ title: "Profile" }}
        />
      </>
    ) : (
      <>
        <Tab.Screen
          name="LoginTab"
          component={AuthStack}
          options={{ title: "Login" }}
        />
        <Tab.Screen
          name="RegisterTab"
          component={RegisterStack}
          options={{ title: "Register" }}
        />
      </>
    )}
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppTabs userToken={userToken} />
    </NavigationContainer>
  );
};

export default AppNavigator;
