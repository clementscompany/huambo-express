import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../app/theme/theme";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import avatar_image from "../assets/image/image.png";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function HeaderAvater() {
  const { currentTheme } = useContext(ThemeContext);
  const data = {
    nome: "",
    email: "",
    image: ""
  }

  const style = StyleSheet.create({
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      alignItems: "center",
      flexDirection: "row",
    },
    headerContent: {
      flexDirection: "row",
      gap: 12,
      alignSelf: "flex-start",
      alignItems: "center",
    },
    avatarIcone: {
      width: 44,
      height: 44,
      elevation: 5,
      borderRadius: 50,
    },
    textData: {
      position: "relative",
    },
    message: {
      fontSize: 14,
      color: theme(currentTheme).colors.text2,
    },
    name: {
      fontSize: 18,
      color: theme(currentTheme).colors.text,
    },
    buttonNotification: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme(currentTheme).colors.card,
      padding: 6,
      borderRadius: 50,
    },
    badgeText: {
      position: "absolute",
      top: 2,
      right: 3,
      fontSize: 16,
      fontWeight: "600",
      color: theme(currentTheme).colors.colorButton,
      width: 6,
      height: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: theme(currentTheme).colors.error,
      borderRadius: 50,
    }
  })

  return (
    <View style={style.header}>
      <View style={style.headerContent}>
        <Image source={avatar_image} style={style.avatarIcone} />
        <View style={style.textData}>
          <Text style={style.message}>Olá, Bem-Vindo</Text>
          <Text style={style.name}>Convidado!</Text>
        </View>
      </View>

      <Pressable style={style.buttonNotification}>
        <Text style={style.badgeText} />
        <MaterialIcons name="notifications-none" size={30} color={theme(currentTheme).colors.text2} />
      </Pressable>
    </View>
  )
}