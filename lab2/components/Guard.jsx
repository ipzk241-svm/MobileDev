import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../config/ThemeContext";
import AuthCodeDisplay from "./AuthCodeDisplay";
import OptionsList from "./OptionsList";
import useAuthCode from "../hooks/useAuthCode";
import styled from "styled-components/native";

const options = [
  {
    id: "1",
    label: "Remove Authenticator",
    component: <Text style={{ color: "red" }}>Help</Text>,
    icon: "arrow-forward-ios",
  },
  {
    id: "2",
    label: "My Recovery Code",
    component: <Text style={{ color: "red" }}>Remove Auth</Text>,
    icon: "arrow-forward-ios",
  },
  {
    id: "3",
    label: "Help",
    component: <Text style={{ color: "red" }}>Help</Text>,
    icon: "arrow-forward-ios",
  },
];

const Guard = () => {
  const { theme } = useTheme();
  const { code, progress } = useAuthCode();

  return (
    <GuardContainer>
      <AuthCodeDisplay code={code} progress={progress} />
      <DescriptionContainer>
        <DescriptionText color={theme.text1}>
          You'll enter your code each time you enter your password to sign in to
          your Steam account.
        </DescriptionText>
        <TipText color={theme.text3}>
          Tip: if you don't share your PC, you can select "Remember my password"
          when you sign in to the PC client to enter your password and
          authenticator code less often.
        </TipText>
      </DescriptionContainer>
      <OptionsList options={options} />
    </GuardContainer>
  );
};

const GuardContainer = styled.View`
  flex: 1;
  width: 100%;
  gap: 20px;
`;

const DescriptionContainer = styled.View`
  padding-horizontal: 15px;
`;

const DescriptionText = styled.Text`
  font-size: 14px;
  font-family: "ABeeZee-Regular";
  margin-bottom: 10px;
  line-height: 22px;
  color: ${(props) => props.color || "black"};
`;

const TipText = styled.Text`
  font-size: 14px;
  font-family: "ABeeZee-Regular";
  margin-bottom: 10px;
  line-height: 22px;
  color: ${(props) => props.color || "black"};
  letter-spacing: -0.15px;
`;

export default Guard;
