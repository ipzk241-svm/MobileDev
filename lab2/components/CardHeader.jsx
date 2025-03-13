import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/MaterialIcons";

const CardHeader = ({ source, published, onMenuPress, theme }) => {
  return (
    <View style={styles.cardHeader}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image style={styles.logo} source={source.logo} />
        <View style={styles.source}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={[styles.sourceName, { color: theme.text1 }]}>
              {source.name}
            </Text>
            <Text style={styles.sourcetype}>{source.type.toUpperCase()}</Text>
          </View>
          <Text style={styles.published}>
            {published.date} • {published.time}
          </Text>
        </View>
      </View>
      <Menu>
        <MenuTrigger>
          <Icon name="more-horiz" size={24} color="rgba(75, 86, 100, 1)" />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption onSelect={() => alert("Shared!")} text="Share" />
          <MenuOption onSelect={() => alert("Saved!")} text="Save" />
          <MenuOption onSelect={() => alert("Reported!")} text="Report" />
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  source: {
    justifyContent: "center",
  },
  sourceName: {
    fontFamily: "pingfang-sc-regular",
    fontSize: 16,
  },
  sourcetype: {
    fontFamily: "pingfang-sc-regular",
    fontSize: 8,
    color: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgb(174, 31, 150)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5,
  },
  published: {
    fontFamily: "ABeeZee-Regular",
    color: "rgba(123, 141, 157, 1)",
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    width: 150,
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    color: "#333",
    fontSize: 16,
  },
};

export default CardHeader;
