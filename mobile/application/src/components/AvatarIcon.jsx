import { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import theme from "../app/theme/theme";

export default function AvatarIcon({ uri = null, foccused = false }) {
  const { currentTheme } = useContext(ThemeContext);

  const style = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: foccused ? theme(currentTheme).colors.primary : theme(currentTheme).colors.border,
      borderRadius: 50,
      overflow: "hidden",
    }
  })
  return (
    <View style={style.container}>
      <Image source={uri === null ? require("../assets/image/avatar2.png") : { uri }} style={{ width: 22, height: 22, }} />
    </View>
  )
}