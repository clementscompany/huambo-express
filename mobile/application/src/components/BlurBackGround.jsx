import { BlurView } from "expo-blur";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
export default function BlurBackdround() {

  const { currentTheme } = useContext(ThemeContext);

  return (
    <BlurView intensity={50} style={[StyleSheet.absoluteFill, { backgroundColor: "#000000", }]} />
  )
}