import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const ProfileScreen = () => {
  const handlePress = () => {
    Alert.alert("Button pressed");
  };

  return (
    <View style={styles.userForm}>
      <Text style={styles.formTitle}>Реєстрація</Text>
      <View style={styles.formField}>
        <Text style={styles.text}>Електрона пошта:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <View style={styles.formField}>
        <Text style={styles.text}>Пароль:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <View style={styles.formField}>
        <Text style={styles.text}>Пароль (ще раз):</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <View style={styles.formField}>
        <Text style={styles.text}>Прізвище:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <View style={styles.formField}>
        <Text style={styles.text}>Ім'я:</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userForm: {
    padding: 10,
    gap: 10,
  },
  formField: {
    gap: 5,
  },
  formTitle: {
    fontSize: 25,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
  },
  textInput: {
    width: "auto",
    height: 50,
    borderWidth: 1,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    width: "auto",
    height: 50,
  },
  buttonText: {
    color: "white",
  },
});

export default ProfileScreen;
