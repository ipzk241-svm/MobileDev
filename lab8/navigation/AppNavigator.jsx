import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { Ionicons } from "@expo/vector-icons";
import AddProductScreen from "../screens/AddProductScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrdersHistoryScreen from "../screens/OrdersHistoryScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: "Вхід" }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ title: "Реєстрація" }}
    />
  </Stack.Navigator>
);
const ProductStack = createNativeStackNavigator();

const ProductStackScreen = () => (
  <ProductStack.Navigator>
    <ProductStack.Screen name="Каталог" component={ProductListScreen} />
    <ProductStack.Screen
      name="AddProduct"
      component={AddProductScreen}
      options={{ title: "Новий товар" }}
    />
  </ProductStack.Navigator>
);
const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Обліковий запис"
      component={ProfileScreen}
      options={{ title: "Профіль" }}
    />
    <ProfileStack.Screen
      name="Історія замовлень"
      component={OrdersHistoryScreen}
      options={{ title: "Історія замовлень" }}
    />
  </ProfileStack.Navigator>
);
const CartStack = createNativeStackNavigator();
const CartStackScreen = () => (
  <CartStack.Navigator>
    <CartStack.Screen name="Товари кошику" component={CartScreen} />
    <CartStack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{ title: "Оформлення замовлення" }}
    />
  </CartStack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Товари") {
          iconName = focused ? "list-circle" : "list-circle-outline";
        } else if (route.name === "Кошик") {
          iconName = focused ? "cart" : "cart-outline";
        } else if (route.name === "Профіль") {
          iconName = focused ? "person-circle" : "person-circle-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Товари" component={ProductStackScreen} />
    <Tab.Screen name="Кошик" component={CartStackScreen} />
    <Tab.Screen name="Профіль" component={ProfileStackScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const idToken = useSelector((state) => state.user.idToken);

  return (
    <NavigationContainer>
      {idToken ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
