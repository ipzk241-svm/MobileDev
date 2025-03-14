import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../config/ThemeContext";
import Icon from "react-native-vector-icons/MaterialIcons";

const OptionsList = ({ options }) => {
  const { theme } = useTheme();

  return (
    <FlatList
      data={options}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.optionItem} onPress={item.onPress}>
          <Text style={[styles.optionText, { color: theme.text1 }]}>
            {item.label}
          </Text>
          {item.icon && (
            <Icon name={item.icon} size={20} color={theme.iconNonActive} />
          )}
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(32, 37, 50, 1)",
    padding: 15,
    borderRadius: 5,
    marginBottom: 1,
  },
  optionText: {
    fontSize: 16,
  },
});

export default OptionsList;
