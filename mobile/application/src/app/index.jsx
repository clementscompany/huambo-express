
import MainContainer from "../components/MainContainer";
import { useRouter } from "expo-router";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
export default function index() {


  const isLogged = false;
  const Navigate = useRouter();

  useEffect(() => {
    setTimeout(() => {
      getStatusApp()
    }, 1000)
  }, [])


  async function getStatusApp() {
    try {

      if (!isLogged) {
        Navigate.replace("/home")
        return;
      }

    } catch (error) {
      Alert.alert("Erro inesperado", "Houve um erro ao processar os dados do aplicativo, porfavor tente novamente!")
    }
  }

  return (
    <MainContainer>
      <Loader />
    </MainContainer>
  )
}