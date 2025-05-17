import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { addOrder } from "../store/slices/ordersSlice";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";

const CheckoutScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Помилка", "Будь ласка, введіть ім'я");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Помилка", "Будь ласка, введіть коректний email");
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert("Помилка", "Кошик порожній");
      return;
    }

    const order = {
      id: Date.now().toString(),
      name,
      email,
      items: cartItems,
      date: new Date().toISOString(),
    };
    dispatch(addOrder(order));
    dispatch(clearCart());

    Alert.alert("Успіх", "Замовлення успішно оформлено!", [
      { text: "Ок", onPress: () => navigation.navigate("Товари") },
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Оформлення замовлення</Text>

      <FormInput placeholder="Ім'я" value={name} onChangeText={setName} />
      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PrimaryButton title="Підтвердити" onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
});
