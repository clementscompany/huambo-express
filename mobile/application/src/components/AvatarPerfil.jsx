import { useContext, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Linking from 'expo-linking';
import { Title } from "../components/TextComponent";
import theme from "../app/theme/theme";

export default function AvatarPerfil() {
  const { currentTheme } = useContext(ThemeContext);
  const [image, setImage] = useState(null);

  // Dados fictícios do usuário (você pode substituir pelos reais)
  const usuario = {
    nome: "Moisés Clemente",
    email: "moises@example.com"
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 16,
      gap: 16,
      backgroundColor: theme(currentTheme).colors.card,
      borderRadius: 14,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    userInfo: {
      flex: 1,
      justifyContent: "center",
    },
    nome: {
      fontSize: 18,
      fontWeight: "600",
      color: theme(currentTheme).colors.text,
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: theme(currentTheme).colors.text2,
      marginBottom: 8,
    },
    updateButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: theme(currentTheme).colors.primary + "20", // leve transparência
      alignSelf: "flex-start",
    },
    updateText: {
      color: theme(currentTheme).colors.primary,
      fontSize: 14,
      fontWeight: "500",
    }
  });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'É necessário obter permissão para acessar a biblioteca de mídia. Você pode fazer isso acessando as Definições.', [
        { text: "Cancelar" },
        { text: "Definições", onPress: async () => await Linking.openSettings() }
      ]);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', "livePhotos"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : require("../assets/image/avatar2.png")}
        style={styles.avatar}
      />

      <View style={styles.userInfo}>
        <Title style={styles.nome}>{usuario.nome}</Title>
        <Title style={styles.email}>{usuario.email}</Title>

        <TouchableOpacity style={styles.updateButton} onPress={pickImage}>
          <Title style={styles.updateText}>Atualizar Foto</Title>
        </TouchableOpacity>
      </View>
    </View>
  );
}
