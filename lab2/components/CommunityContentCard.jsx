import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../config/ThemeContext";
import CardHeader from "./CardHeader";
import SocialActions from "./SocialActions";

const CommunityContentCard = ({ content }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.cardContainer}>
      <CardHeader
        source={content.source}
        published={content.published}
        theme={theme}
      />
      <Image style={styles.contentImage} source={content.image.url} />
      <Text style={[styles.title, { color: theme.text1 }]}>
        {content.title}
      </Text>
      <Text style={[styles.description, { color: theme.text2 }]}>
        {content.description}
      </Text>
      <SocialActions
        likes={content.engagement.likes}
        comments={content.engagement.comments}
        theme={theme}
        onSharePress={() => alert("Shared!")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    marginVertical: 10,
    padding: 20,
    gap: 15,
  },
  contentImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 5,
  },
  title: {
    fontFamily: "ABeeZee-Regular",
    fontSize: 16,
    letterSpacing: -0.32,
    lineHeight: 22,
  },
  description: {
    fontFamily: "ABeeZee-Regular",
    fontSize: 14,
    letterSpacing: -0.28,
    lineHeight: 22,
  },
});

export default CommunityContentCard;
