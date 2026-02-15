import { StyleSheet, Text } from "react-native"
export const Title = ({ children, style }) => {
  return <Text style={[styles.title, { ...style }]}>{children}</Text>
}

export const SubTitle = ({ children, style }) => {
  return <Text style={[styles.subtitle, { ...style }]}>{children}</Text>
}

export const MediumText = ({ children, style }) => {
  return <Text style={[styles.meddiumText, { ...style }]}>{children}</Text>
}

export const RegularText = ({ children, style }) => {
  return <Text style={[styles.regularText, { ...style }]}>{children}</Text>
}


const styles = StyleSheet.create({
  title: {
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontFamily: "Inter_500Medium",
  },
  meddiumText: {
    fontFamily: "Inter_500Medium"
  },
  regularText: {
    fontFamily: "Inter_400Regular",
  }
})