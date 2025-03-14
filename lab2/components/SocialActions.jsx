import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SocialActions = ({
  likes,
  comments,
  theme,
  onSharePress,
  onLikePress,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    if (typeof onLikePress === "function") onLikePress();
  };

  return (
    <View style={[styles.socials, { borderColor: theme.borderColor }]}>
      <View style={styles.socialsItems}>
        <TouchableOpacity style={styles.socialsItem} onPress={handleLikePress}>
          <Icon
            name="thumb-up"
            size={24}
            color={isLiked ? theme.iconActiveGreen : theme.iconNonActive}
          />
          <Text
            style={{
              color: isLiked ? theme.iconActiveGreen : theme.iconNonActive,
            }}
          >
            {likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialsItem}>
          <Icon name="comment" size={24} color={theme.iconNonActive} />
          <Text style={{ color: theme.iconNonActive }}>{comments}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.share} onPress={onSharePress}>
        <Icon name="share" size={24} color={theme.iconNonActive} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socials: {
    borderTopWidth: 1,
    width: "100%",
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialsItems: {
    flexDirection: "row",
    gap: 30,
  },
  socialsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  share: {
    padding: 5,
  },
});

export default SocialActions;
