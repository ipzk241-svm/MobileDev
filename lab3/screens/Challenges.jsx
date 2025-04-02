import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Challenge from "../components/Challenge";
import { useProgress } from "../hooks/ProgressContext";

const Challenges = () => {
  const { progress } = useProgress();

  const renderChallenge = ({ item }) => (
    <Challenge
      icon={item.icon}
      iconColor={item.iconColor}
      title={item.title}
      description={item.description}
      hasProgressBar={item.max > 1}
      maxProgress={item.max}
      currentProgress={item.current}
      isCompleted={item.completed}
    />
  );

  return (
    <ChallengesList>
      <FlatList
        data={Object.values(progress)}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ gap: 10 }}
      />
    </ChallengesList>
  );
};

const ChallengesList = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 60px;
`;

export default Challenges;
