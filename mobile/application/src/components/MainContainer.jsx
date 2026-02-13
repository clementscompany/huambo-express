import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import theme from "../app/theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MainContainer({ children }) {
  const { currentTheme } = useContext(ThemeContext);

  const isLight = currentTheme === "light";
  const backgroundColor = theme(currentTheme).colors.background;
  const area = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      paddingTop: area.top,
      paddingBottom: area.bottom,
      paddingLeft: area.left + 8,
      paddingRight: area.right + 8,
      flex: 1,
      backgroundColor,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        style={isLight ? "dark" : "light"}
        translucent
        backgroundColor="transparent"
      />
      {children}
    </View>
  );
}
