import React, { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    tap: {
      title: "Tap 10 times",
      description: "Tap on the clicker object 10 times",
      max: 10,
      current: 0,
      completed: false,
      icon: "finger-print",
      iconColor: "#eb4949",
    },
    doubleTap: {
      title: "Double tap 5 times",
      description: "Double tap the object 5 times",
      max: 5,
      current: 0,
      completed: false,
      icon: "pulse",
      iconColor: "#ff9500",
    },
    longPress: {
      title: "Hold 3 seconds",
      description: "Hold the object for 3 seconds",
      max: 1,
      current: 0,
      completed: false,
      icon: "hand-left",
      iconColor: "#007aff",
    },
    pan: {
      title: "Drag object",
      description: "Drag the object across the screen",
      max: 1,
      current: 0,
      completed: false,
      icon: "move",
      iconColor: "#34c759",
    },
    flingRight: {
      title: "Swipe right",
      description: "Swipe right on the object",
      max: 1,
      current: 0,
      completed: false,
      icon: "arrow-forward",
      iconColor: "#5856d6",
    },
    flingLeft: {
      title: "Swipe left",
      description: "Swipe left on the object",
      max: 1,
      current: 0,
      completed: false,
      icon: "arrow-back",
      iconColor: "#ff2d55",
    },
    pinch: {
      title: "Resize object",
      description: "Pinch to resize the object",
      max: 1,
      current: 0,
      completed: false,
      icon: "resize",
      iconColor: "#ffcc00",
    },
    score: {
      title: "Get 100 points",
      description: "Earn 100 points total",
      max: 100,
      current: -1,
      completed: false,
      icon: "star",
      iconColor: "#ffd700",
    },
  });

  const updateProgress = (taskKey, increment) => {
    setProgress((prev) => {
      const updatedTask = {
        ...prev[taskKey],
        current: Math.min(prev[taskKey].current + increment, prev[taskKey].max),
        completed: prev[taskKey].current + increment >= prev[taskKey].max,
      };
      return {
        ...prev,
        [taskKey]: updatedTask,
      };
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

export default ProgressContext;
