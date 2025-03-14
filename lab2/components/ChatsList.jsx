import React from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../config/ThemeContext";

const ChatsList = ({ chats }) => {
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "online":
        return "blue";
      case "offline":
        return "transparent";
      default:
        return "transparent";
    }
  };

  const renderChatItem = ({ item }) => (
    <View style={styles.chatItem}>
      <View style={styles.imageContainer}>
        <Image style={styles.userImage} source={item.image} />
        <View
          style={[
            styles.statusCircle,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        />
      </View>
      <View style={styles.chatDetails}>
        <Text style={{ color: theme.text1 }}>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: theme.text2 }}>{item.message}</Text>
          <Text style={{ color: theme.text2 }}> • {item.time}</Text>
        </View>
      </View>
      {item.unread > 0 ? (
        <Text style={styles.unread}>{item.unread}</Text>
      ) : item.isReaded ? (
        <View style={styles.readedCircle} />
      ) : null}
    </View>
  );

  return (
    <View style={styles.chatContainer}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ChatsList;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  imageContainer: {
    height: "auto",
    position: "relative",
  },
  userImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  statusCircle: {
    width: 10,
    height: 10,
    borderRadius: 8,
    position: "absolute",
    right: 3,
    bottom: 5,
  },
  chatDetails: {
    flex: 1,
    justifyContent: "center",
  },
  unread: {
    color: "white",
    backgroundColor: "rgb(9, 119, 162)",
    borderRadius: 10,
    height: 20,
    width: 20,
    textAlign: "center",
    marginLeft: 5,
  },
  readedCircle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "white",
    marginRight: 5,
  },
});
