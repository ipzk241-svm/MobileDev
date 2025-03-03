import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";

const news = Array(6).fill({
  title: "Заголовок НОВИНИ",
  subtitle: "Короткий текст НОВИНИ",
  date: "Дата НОВИНИ",
  img: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
});

const HomeScreen = () => {
  const pressHandler = () => {
    Alert.alert("Повна новина");
  };
  const renderItem = ({ item }) => (
    <Pressable onPress={pressHandler} style={styles.newsContainer}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  newsContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  subtitle: {
    fontSize: 16,
  },
});

export default HomeScreen;
