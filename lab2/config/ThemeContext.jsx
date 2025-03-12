// ThemeContext.js
import React, { createContext, useState, useContext } from "react";
import { lightTheme, darkTheme } from "../assets/themes";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: isDark ? darkTheme : lightTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
