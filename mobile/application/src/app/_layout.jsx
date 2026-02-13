import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";
import MainContainer from "../components/MainContainer";
import Loader from "../components/Loader";
export default function RootLayout() {


  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return (
      <ThemeProvider>
        <MainContainer>
          <Loader />
        </MainContainer>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{ headerShown: false, }}
      />
    </ThemeProvider>
  )
}