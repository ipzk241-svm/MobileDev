import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/userSlice";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const registerHandler = async () => {
    try {
      await dispatch(registerUser(email, password, name));
    } catch (err) {
      Alert.alert(
        "Помилка реєстрації",
        err.response?.data?.error?.message || err.message || "Щось пішло не так"
      );
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ім’я</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Введіть ім’я"
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Введіть email"
        style={styles.input}
      />

      <Text style={styles.label}>Пароль (мін. 6 символів)</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Введіть пароль"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Зареєструватися" onPress={registerHandler} />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
