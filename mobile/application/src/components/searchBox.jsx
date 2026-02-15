import { StyleSheet, TextInput, View } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import theme from "../app/theme/theme";

export default function SearchBox({ onSearch }) {
  const { currentTheme } = useContext(ThemeContext);

  const style = StyleSheet.create({
    container: {
      backgroundColor: theme(currentTheme).colors.card,
      borderRadius: 14,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 14,
      elevation: 2,
      borderWidth: .5,
      borderColor: theme(currentTheme).colors.border,
    },
    input: {
      flex: 1,
      padding: 8,
      fontSize: 16,
      borderLeftColor: theme(currentTheme).colors.border,
      borderLeftWidth: 1,
      marginVertical: 12,
      marginLeft: 12,
      fontFamily: "Inter_400Regular",
      color: theme(currentTheme).colors.text,
    },
  })
  return (
    <View style={style.container}>
      <Fontisto name="search" size={24} color={theme(currentTheme).colors.primary} />
      <TextInput placeholder="Pesquisar..." style={style.input}
        placeholderTextColor={theme(currentTheme).colors.text2}
        keyboardAppearance={currentTheme}
        inputMode="search"
        onChangeText={onSearch}
      />
    </View>
  )
}