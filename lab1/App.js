import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeader from "./src/components/CustomHeader";
import HomeScreen from "./src/screens/HomeScreen";
import GaleryScreen from "./src/screens/GaleryScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Footer from "./src/components/Footer";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Головна"
          screenOptions={({ route, navigation }) => ({
            header: () => (
              <CustomHeader activeTitle={route.name} navigation={navigation} />
            ),
          })}
        >
          <Stack.Screen name="Головна" component={HomeScreen} />
          <Stack.Screen name="Галерея" component={GaleryScreen} />
          <Stack.Screen name="Профіль" component={ProfileScreen} />
        </Stack.Navigator>
        <Footer></Footer>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
