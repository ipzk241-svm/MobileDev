import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../config/ThemeContext";

const UserInfo = ({ name, age, email }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/userProfilePhoto.png")}
        style={styles.photo}
      />
      <Text style={[styles.text, { color: theme.text1 }]}>Сергійко Василь</Text>
      <Text style={[styles.text, { color: theme.text1 }]}>ІПЗк-24-1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  photo: {
    width: 100,
    height: 100,
  },
  text: {
    fontFamily: "ABeeZee-Regular",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.18
  },
});

export default UserInfo;
