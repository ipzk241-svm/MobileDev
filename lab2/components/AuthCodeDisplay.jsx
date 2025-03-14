import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../config/ThemeContext";

const AuthCodeDisplay = ({ code, progress }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.playerCode}>
      <Text style={[styles.loggedInText, { color: theme.text2 }]}>
        Logged in as player
      </Text>
      <View style={styles.codeContainer}>
        <Text style={[styles.codeText, { color: theme.text1 }]}>{code}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress * 100}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerCode: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    borderRadius: 10,
  },
  loggedInText: {
    fontSize: 14,
    marginBottom: 10,
  },
  codeContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  codeText: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  progressBar: {
    width: 150,
    height: 10,
    backgroundColor: "#444",
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
