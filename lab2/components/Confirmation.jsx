import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../config/ThemeContext";

const Confirmation = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.confirmationContainer}>
      <Text style={{ color: theme.text1 }}>Confirmations Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Confirmation;
