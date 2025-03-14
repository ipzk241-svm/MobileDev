import React, { useEffect, useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import { useTheme } from "../config/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(
    theme.background === theme.isDark
  );

  const handleToggle = () => {
    toggleTheme();
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.text1 }]}>Color theme: </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#rgb(255, 230, 0)" : "rgb(38, 34, 34)"}
        background="#3e3e3e"
        onValueChange={handleToggle}
        value={isDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
  },
});

export default ThemeToggle;
