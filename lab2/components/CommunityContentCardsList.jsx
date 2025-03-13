import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CommunityContentCard from "./CommunityContentCard";
import { useTheme } from "../config/ThemeContext";

const NewsCardList = ({ news }) => {
  const { theme } = useTheme();

  const renderItem = ({ item }) => <CommunityContentCard content={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View
            style={{
              width: "100%",
              height: 8,
              backgroundColor: theme.backgroundBlacker,
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 8,
              backgroundColor: theme.backgroundBlacker,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NewsCardList;
