import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const RegisterScreen = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
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
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <Button
        title="Register"
        onPress={() => {
          if (!name || !email || !password || !confirmPassword) {
            Alert.alert("All fields are required");
            return;
          }
          if (password !== confirmPassword) {
            Alert.alert("Passwords do not match!");
            return;
          }
          register(email, password, name);
        }}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});
