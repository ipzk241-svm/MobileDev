import React, { useState, useEffect, useRef } from "react";
import { FlatList, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import GameCard from "./GameCard";

const { width } = Dimensions.get("window");

const Container = styled(View)`
  padding: 16px;
`;

const GameList = styled(FlatList)`
  flex-grow: 0;
`;

const PopularGamesList = ({ games }) => {
  const [infiniteGames, setInfiniteGames] = useState([...games, ...games]); 

  const duplicateGames = () => {
    setInfiniteGames((prevGames) => [...prevGames, ...games]);
  };

  const handleEndReached = () => {
    duplicateGames();
  };

  const renderItem = ({ item }) => {
    return <GameCard game={item} />;
  };

  return (
    <Container>
      <GameList
        data={infiniteGames}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

export default PopularGamesList;
