import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import { useTheme } from "../config/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(
    theme.background === "#1C202C"
  ); // Визначаємо поточний режим

  // Оновлюємо стан при зміні теми вручну
  React.useEffect(() => {
    setIsDarkMode(theme.background === "#1C202C");
  }, [theme.background]);

  const handleToggle = () => {
    toggleTheme(); // Викликаємо функцію перемикання теми
    setIsDarkMode((prevMode) => !prevMode); // Оновлюємо локальний стан
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
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
  },
});

export default ThemeToggle;
