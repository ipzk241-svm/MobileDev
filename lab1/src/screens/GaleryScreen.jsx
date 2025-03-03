import React from "react";
import { View, FlatList, StyleSheet, Image, Dimensions } from "react-native";

// Отримуємо ширину екрану
const screenWidth = Dimensions.get("window").width;

const photos = Array(8).fill({
  img: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
});

const GaleryScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.galeryContainer}>
      <Image style={styles.photo} source={{ uri: item.img }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
  },
  galeryContainer: {
    width: screenWidth / 2 - 20,
    aspectRatio: 1,
    margin: 10,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default GaleryScreen;
