import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={() => login(email, password)} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});
