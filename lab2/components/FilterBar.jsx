import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { useTheme } from "../config/ThemeContext";

const FilterBar = ({ filters, onSelect, showSearch = false, onSearch }) => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { theme } = useTheme();

  const handleSearchPress = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    if (onSearch) onSearch("");
  };

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    onSelect(filter);
  };

  return (
    <View style={styles.container}>
      {showSearch && (
        <View
          style={[
            styles.filterButton,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          {isSearchActive ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Пошук..."
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                if (onSearch) onSearch(text);
              }}
            />
          ) : (
            <TouchableOpacity onPress={handleSearchPress}>
              <Image
                source={require("../assets/images/search_icon.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}

          {isSearchActive && (
            <TouchableOpacity onPress={handleCloseSearch}>
              <Image
                source={require("../assets/images/close_icon.png")}
                style={[styles.icon, { tintColor: theme.icon_color }]}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {!isSearchActive && (
        <FlatList
          data={filters}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item && styles.activeFilter,
              ]}
              onPress={() => handleFilterPress(item)}
            >
              <Text style={[styles.filterText]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#2a2d3a",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#2a2d3a",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: "#3cbef6",
  },
  filterText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    height: 40,
    marginRight: 10,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "cover",
  },
});

export default FilterBar;
