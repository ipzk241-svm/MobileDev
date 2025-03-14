import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useTheme } from "../config/ThemeContext";
import { LinearGradient } from "expo-linear-gradient"; // Імпортуємо з expo-linear-gradient

const AuthCodeDisplay = ({ code, progress }) => {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get("window").width; // Отримуємо ширину екрану

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg_gradient.png")}
        style={[styles.backgroundImage, { width: screenWidth }]}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(28, 32, 44, 0)",
            "rgba(28, 32, 44, 1)",
            "rgba(28, 32, 44, 1)",
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientOverlay}
        >
          <View style={styles.content}>
            <Text style={[styles.loggedInText, { color: theme.text2 }]}>
              Logged in as player
            </Text>
            <View style={styles.codeContainer}>
              <Text style={[styles.codeText, { color: theme.text1 }]}>
                {code}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progress, { width: `${progress * 100}%` }]}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Прибрано flex: 1, щоб контейнер адаптувався під вміст
  },
  backgroundImage: {
    // Прибрано flex: 1, висота визначається вмістом
    width: "100%", // Замінено screenWidth на 100% для адаптивності
    justifyContent: "center",
    alignItems: "center",
  },
  gradientOverlay: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // Прибрано flex: 1, висота залежить від content
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 40,
  },
  loggedInText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  codeContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  codeText: {
    fontSize: 54,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
  },
  progressBar: {
    width: 150,
    height: 10,
    backgroundColor: "rgba(28, 32, 44, 1)",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: "#00AFFF",
    borderRadius: 5,
  },
});

export default AuthCodeDisplay;
