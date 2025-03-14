import React, { useState } from "react";
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
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handlePress = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedItemId === item.id;

    return (
      <View>
        <TouchableOpacity
          style={[styles.optionItem, { backgroundColor: theme.optionBG }]}
          onPress={() => handlePress(item.id)}
        >
          <Text style={[styles.optionText, { color: theme.text1 }]}>
            {item.label}
          </Text>
          {item.icon && (
            <Icon name={item.icon} size={20} color={theme.iconNonActive} />
          )}
        </TouchableOpacity>
        {isExpanded && item.component && (
          <View style={[styles.expandedContent]}>{item.component}</View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={options}
      renderItem={renderItem}
      style={styles.listContainer}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 15,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 5,
    marginBottom: 1,
  },
  optionText: {
    fontSize: 16,
  },
  expandedContent: {
    padding: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default OptionsList;
