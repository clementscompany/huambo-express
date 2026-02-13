import { Tabs } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import theme from "../theme/theme";
import TabBar from "../../components/tabBar";
import { View, StyleSheet } from "react-native";

export default function HomeLayout() {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerBackground: () => <View style={[StyleSheet.absoluteFill, { backgroundColor: theme(currentTheme).colors.card }]} />,
        tabBarBackground: () => null,
        sceneContainerStyle: {
          backgroundColor: theme(currentTheme).colors.background,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Início",
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={
          {
            tabBarLabel: "Bilhetes",
          }
        }
      />
      <Tabs.Screen
        name="bilhetes"
        options={{
          headerTintColor: theme(currentTheme).colors.text,
          headerTitle: "Perfil",
          tabBarLabel: "Perfil",
          title: "Perfil",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 26,
          },
        }}
      />
    </Tabs>
  );
}
