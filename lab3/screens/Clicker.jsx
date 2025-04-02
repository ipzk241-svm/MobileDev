import React, { useState, useRef, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import styled from "styled-components/native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  State,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useProgress } from "../hooks/ProgressContext";

const Clicker = () => {
  const [score, setScore] = useState(0);
  const { updateProgress } = useProgress();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const objectSize = 100;

  const minX = -screenWidth / 2 + objectSize;
  const maxX = screenWidth / 2 - objectSize;
  const minY = -screenHeight / 2 + objectSize;
  const maxY = screenHeight / 2 - objectSize;

  const doubleTapRef = useRef();
  const panRef = useRef();
  const flingRightRef = useRef();
  const flingLeftRef = useRef();

  useEffect(() => {
    updateProgress("score", 1);
  }, [score]);

  const handleSingleTap = (event) => {
    if (event.nativeEvent.state === State.END) {
      setScore((prev) => prev + 1);
      updateProgress("tap", 1);
    }
  };

  const handleDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setScore((prev) => prev + 2);
      updateProgress("doubleTap", 1);
    }
  };

  const handleLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setScore((prev) => prev + 1);
      updateProgress("longPress", 1);
    }
  };

  const handlePanGesture = (event) => {
    const newX = offsetX.value + event.nativeEvent.translationX;
    const newY = offsetY.value + event.nativeEvent.translationY;

    translateX.value = Math.max(minX, Math.min(maxX, newX));
    translateY.value = Math.max(minY, Math.min(maxY, newY));
  };

  const handlePanStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      updateProgress("pan", 1);
    }
  };

  const handleFlingRight = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      updateProgress("flingRight", 1);
      translateX.value = withSpring(maxX);
    }
  };

  const handleFlingLeft = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      updateProgress("flingLeft", 1);
      translateX.value = withSpring(minX);
    }
  };

  const handlePinch = (event) => {
    scale.value = event.nativeEvent.scale;
  };

  const handlePinchStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      updateProgress("pinch", 1);
      scale.value = withSpring(1);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Container>
      <Animated.View style={animatedStyle}>
        <PinchGestureHandler
          onHandlerStateChange={handlePinchStateChange}
          onGestureEvent={handlePinch}
          minPointers={2}
        >
          <FlingGestureHandler
            ref={flingRightRef}
            direction={Directions.RIGHT}
            onHandlerStateChange={handleFlingRight}
            simultaneousHandlers={[panRef]}
          >
            <FlingGestureHandler
              ref={flingLeftRef}
              direction={Directions.LEFT}
              onHandlerStateChange={handleFlingLeft}
              simultaneousHandlers={[panRef]}
            >
              <PanGestureHandler
                ref={panRef}
                onGestureEvent={handlePanGesture}
                onHandlerStateChange={handlePanStateChange}
                minDist={20}
                simultaneousHandlers={[flingRightRef, flingLeftRef]}
              >
                <LongPressGestureHandler
                  onHandlerStateChange={handleLongPress}
                  minDurationMs={3000}
                >
                  <TapGestureHandler
                    onHandlerStateChange={handleSingleTap}
                    numberOfTaps={1}
                    waitFor={doubleTapRef}
                  >
                    <TapGestureHandler
                      ref={doubleTapRef}
                      onHandlerStateChange={handleDoubleTap}
                      numberOfTaps={2}
                    >
                      <ClickerObject>
                        <ScoreText>{score}</ScoreText>
                      </ClickerObject>
                    </TapGestureHandler>
                  </TapGestureHandler>
                </LongPressGestureHandler>
              </PanGestureHandler>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </PinchGestureHandler>
      </Animated.View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScoreText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ClickerObject = styled.View`
  width: 200px;
  height: 200px;
  background: #eb4949;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

export default Clicker;
