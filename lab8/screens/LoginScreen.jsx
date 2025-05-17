import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userSlice";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = async () => {
    try {
      await dispatch(loginUser(email, password));
    } catch (err) {
      Alert.alert(
        "Помилка входу",
        err.response?.data?.error?.message || err.message || "Щось пішло не так"
      );
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Введіть email"
        style={styles.input}
      />

      <Text style={styles.label}>Пароль</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Введіть пароль"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Увійти" onPress={loginHandler} />
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ marginVertical: 10 }}>
            <Text style={{ textAlign: "center" }}>
                Не маєте акаунт?{" "}
            </Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ color: "blue", textAlign: "center", fontSize: 16 }}
          >
            Реєстрація
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
