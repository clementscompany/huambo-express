import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import MainContainer from "../../components/MainContainer";
import AvatarPerfil from "../../components/AvatarPerfil";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import theme from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Title } from "../../components/TextComponent";

export default function Perfil() {
  const { currentTheme } = useContext(ThemeContext);

  const items = [
    { key: "dados_pessoais", label: "Dados pessoais", icon: "person-circle", color: theme(currentTheme).colors.text },
    { key: "alterar_senha", label: "Alterar a senha", icon: "lock-closed", color: theme(currentTheme).colors.text },
    { key: "configuracoes", label: "Configurações", icon: "settings", color: theme(currentTheme).colors.text },
    { key: "notificacoes", label: "Notificações", icon: "notifications", color: theme(currentTheme).colors.text },
    { key: "privacidade", label: "Privacidade", icon: "shield-checkmark", color: theme(currentTheme).colors.text },
    { key: "meus_enderecos", label: "Meus endereços", icon: "location", color: theme(currentTheme).colors.text },
    { key: "historico", label: "Histórico de pedidos", icon: "time", color: theme(currentTheme).colors.text },
    { key: "pagamento", label: "Métodos de pagamento", icon: "card", color: theme(currentTheme).colors.text },
    { key: "suporte", label: "Ajuda / Suporte", icon: "help-circle", color: theme(currentTheme).colors.text },
    { key: "sair", label: "Terminar Sessão", icon: "exit", color: theme(currentTheme).colors.error },
  ];

  const styles = StyleSheet.create({
    listContainer: {
      backgroundColor: theme(currentTheme).colors.card,
      overflow: "hidden",
      borderRadius: 14,
      marginTop: 20,
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: theme(currentTheme).colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    itemContent: {
      alignItems: "center",
      flexDirection: "row",
      gap: 12,
      padding: 12,
    },
  });

  const handlePress = (key) => {
    console.log("Clicou em:", key);
  };

  const themeColors = theme(currentTheme).colors;

  return (
    <MainContainer style={{ paddingTop: 12, paddingBottom: 12 }}>
      <ScrollView>
        <AvatarPerfil />
        <View style={styles.listContainer}>
          {items.map((item, index) => (
            <Pressable key={index} style={styles.item} onPress={() => handlePress(item.key)}>
              <View style={styles.itemContent}>
                <Ionicons name={item.icon} color={item.color} size={22} />
                <Title style={{ color: item.color, fontSize: 15 }}>
                  {item.label}
                </Title>
              </View>
              <Ionicons name="chevron-forward" color={themeColors.text2} size={22} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </MainContainer>
  );
}
