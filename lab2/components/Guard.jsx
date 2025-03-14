import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../config/ThemeContext";
import AuthCodeDisplay from "./AuthCodeDisplay";
import OptionsList from "./OptionsList";
import useAuthCode from "../hooks/useAuthCode";

const options = [
  {
    id: "1",
    label: "Remove Authenticator",
    onPress: () => alert("Remove Authenticator"),
    icon: "arrow-forward-ios",
  },
  {
    id: "2",
    label: "My Recovery Code",
    onPress: () => alert("My Recovery Code"),
    icon: "arrow-forward-ios",
  },
  {
    id: "3",
    label: "Help",
    onPress: () => alert("Help"),
    icon: "arrow-forward-ios",
  },
];

const Guard = () => {
  const { theme } = useTheme();
  const { code, progress } = useAuthCode();

  return (
    <View style={styles.guardContainer}>
      <AuthCodeDisplay code={code} progress={progress} />

      <View>
        <Text style={[styles.descriptionText, { color: theme.text1 }]}>
          You'll enter your code each time you enter your password to sign in to
          your Steam account.
        </Text>
        <Text
          style={[
            styles.descriptionText,
            { color: theme.text3, letterSpacing: -0.15 },
          ]}
        >
          Tip: if you don't share your PC, you can select "Remember my password"
          when you sign in to the PC client to enter your password and
          authenticator code less often.
        </Text>
      </View>

      <OptionsList options={options} />
    </View>
  );
};

const styles = StyleSheet.create({
  guardContainer: {
    flex: 1,
    width: "100%",
    gap: 20,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "ABeeZee-Regular",
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default Guard;
