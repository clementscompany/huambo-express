import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import theme from "../app/theme/theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

import { RegularText, Title } from "./TextComponent";
export default function ModalBottomAlert({ title = "Sucesso", message, status = "success", onClose, visible = false }) {
  const { currentTheme } = useContext(ThemeContext);

  const style = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      flex: 1,
    },
    content: {
      padding: 12,
      backgroundColor: theme(currentTheme).colors.card,
      width: "80%",
      borderRadius: 14,
      alignItems: "center",
    },
    icon: {
      backgroundColor: theme(currentTheme).colors.background,
      borderRadius: 50,
    },
    title: {
      fontSize: 18,
      color: theme(currentTheme).colors.text,
      textAlign: "center",
    },
    bitton: {
      borderRadius: 50,
      backgroundColor: theme(currentTheme).colors.primary,
      width: Dimensions.get("screen").width > 500 ? 300 : "100%",
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    message: {
      color: theme(currentTheme).colors.text2,
      textAlign: "center",
      marginVertical: 12,
    }
  })


  return (
    <Modal transparent visible={visible} animationType="fade" >
      <BlurView intensity={300} style={[StyleSheet.absoluteFill, style.container]} tint="systemChromeMaterialDark">
        <Animated.View style={style.content}
          entering={BounceIn.damping().duration(700)}
          exiting={BounceOut.damping().duration(700)}
        >
          {
            status === "success" ?
              <MaterialIcons name="check-circle" size={70} color={theme(currentTheme).colors.success} style={style.icon} /> :
              <MaterialIcons name="error" size={70} color={theme(currentTheme).colors.error} style={style.icon} />
          }

          <View>
            <Title style={style.title}>{title}</Title>
            <RegularText style={style.message}>{message}</RegularText>
          </View>
          <TouchableOpacity style={style.bitton} onPress={onClose}>
            <Title style={{ color: theme(currentTheme).colors.colorButton }}>Ok</Title>
          </TouchableOpacity>
        </Animated.View>
      </BlurView>
    </Modal>
  )
}