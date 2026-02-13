import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import theme from "../app/theme/theme";

export default function Loader() {
  const { currentTeme } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color={theme(currentTeme).colors.primary} size={"large"} />
    </View>
  )
}