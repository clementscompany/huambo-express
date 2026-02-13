import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(colorScheme);

  useEffect(() => {
    setCurrentTheme(colorScheme);
  }, [colorScheme])
  return (
    <ThemeContext.Provider value={{ currentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}