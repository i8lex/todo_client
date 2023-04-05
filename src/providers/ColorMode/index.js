import React, { createContext, useState } from "react";
// import { createTheme, ThemeProvider } from '@mui/material';

export const ColorMode = createContext({});

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");

  const toggleColorMode = () => {
    setColorMode((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  return (
    <ColorMode.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorMode.Provider>
  );
};
