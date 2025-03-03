import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import NavigationPanel from "./NavigationPanel";

const CustomHeader = ({ activeTitle, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://logos-world.net/wp-content/uploads/2021/09/One-Piece-Logo.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.logoText}>FirstMobileApp</Text>
      </View>
      <NavigationPanel activeTitle={activeTitle} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    height: "auto",
    paddingTop: 30,
  },
  logo: {
    width: 150,
    height: 50,
    objectFit: "cover",
  },
  logoContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomHeader;
