import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Game from "./Game";

const GameList = ({ games }) => {
  const renderItem = ({ item }) => <Game game={item} />;

  return (
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({});

export default GameList;
