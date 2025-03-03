import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const NavigationPanel = ({ activeTitle, navigation }) => {
  return (
    <View style={styles.headerNav}>
      <TouchableOpacity
        style={[
          styles.navElement,
          activeTitle === "Головна" && styles.activeNavElement,
        ]}
        onPress={() => navigation.push("Головна")}
      >
        <Image
          style={styles.headerNavIcon}
          source={require("../assets/images/home.png")}
        ></Image>
        <Text style={styles.headerNavText}>Головна</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navElement,
          activeTitle === "Галерея" && styles.activeNavElement,
        ]}
        onPress={() => navigation.push("Галерея")}
      >
        <Image
          style={styles.headerNavIcon}
          source={require("../assets/images/galery.png")}
        ></Image>
        <Text style={styles.headerNavText}>Галерея</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navElement,
          activeTitle === "Профіль" && styles.activeNavElement,
        ]}
        onPress={() => navigation.push("Профіль")}
      >
        <Image
          style={styles.headerNavIcon}
          source={require("../assets/images/profile.png")}
        ></Image>
        <Text style={styles.headerNavText}>Профіль</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerNav: {
    color: "white",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
  navElement: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  activeNavElement: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  headerNavIcon: {
    width: 30,
    height: 30,
  },
  headerNavText: {
    fontSize: 12,
  },
});

export default NavigationPanel;
