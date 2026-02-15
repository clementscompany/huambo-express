import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import MainContainer from "../components/MainContainer";
import Loader from "../components/Loader";
export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
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