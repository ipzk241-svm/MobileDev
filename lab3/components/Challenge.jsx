import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";

const Challenge = ({
  title,
  description,
  icon,
  iconColor,
  hasProgressBar = false,
  maxProgress = 100,
  currentProgress = 5,
  isCompleted = false,
}) => {
  return (
    <Container isCompleted={isCompleted}>
      <ChallengeIconContainer>
        <ChallengeIcon name={icon} color={iconColor} />
      </ChallengeIconContainer>
      <ChallengeTextContainer>
        <ChallengeTitle size={20}>{title}</ChallengeTitle>
        <Text>{description}</Text>
        {hasProgressBar && (
          <ProgressContainer>
            <Progress.Bar
              progress={currentProgress / maxProgress}
              width={150}
              color="#eb4949"
              unfilledColor="#acf3f3"
              borderWidth={0}
            />
            <ProgressText>
              {currentProgress}/{maxProgress}
            </ProgressText>
          </ProgressContainer>
        )}
      </ChallengeTextContainer>
      <ChallengeCompletion isCompleted={isCompleted}>
        {isCompleted && <Icon name="checkmark" size={20} color="#333" />}
      </ChallengeCompletion>
    </Container>
  );
};

const Container = styled.View`
  background: ${(props) => (props.isCompleted ? "#adedb652" : "#a7f4ef53")};
  padding: 15px;
  border-radius: 15px;
  width: 100%;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const ChallengeIconContainer = styled.View`
  padding: 10px;
  border-radius: 50px;
  background: #acf3f3a7;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

const ChallengeIcon = styled(Icon)`
  font-size: 25px;
  color: ${(props) => props.color || "#000"};
`;

const ChallengeTextContainer = styled.View`
  flex: 1;
`;

const ChallengeTitle = styled.Text`
  font-size: ${(props) => props.size || "24px"};
  font-weight: bold;
  color: #333;
`;

const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const ProgressText = styled.Text`
  margin-left: 10px;
  color: #333;
`;

const ChallengeCompletion = styled.View`
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.isCompleted ? "none" : "1px solid #333")};
  border-radius: 50px;
  background: ${(props) => (props.isCompleted ? "#1cf703" : "transparent")};
  width: 30px;
  height: 30px;
  align-self: center;
`;

export default Challenge;
