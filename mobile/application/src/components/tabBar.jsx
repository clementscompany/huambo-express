import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import theme from "../app/theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AvatarIcon from "./AvatarIcon";

export default function TabBar({ state, descriptors, navigation }) {
  const { currentTheme } = useContext(ThemeContext);
  const area = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor: theme(currentTheme).colors.background, paddingBottom: area.bottom + 6 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme(currentTheme).colors.card,
          marginHorizontal: 6,
          borderRadius: 14,
          paddingVertical: 10,
          elevation: 2,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };


          const ICONS = (color = theme(currentTheme).colors.text2, foccused) => {
            return {
              0: <Ionicons name="home" size={22} color={color} />,
              1: <Ionicons name="heart-circle-outline" size={22} color={color} />,
              2: <MaterialCommunityIcons name="ticket-confirmation-outline" size={22} color={color} />,
              3: <AvatarIcon foccused={foccused} />
            }
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{ flex: 1, alignItems: "center" }}
            >
              {
                ICONS(isFocused ? theme(currentTheme).colors.primary : theme(currentTheme).colors.text2, isFocused)[index]
              }
              <Text
                style={{
                  textAlign: "center",
                  color: isFocused
                    ? theme(currentTheme).colors.primary
                    : theme(currentTheme).colors.text2,
                  marginTop: 4,
                  fontWeight: isFocused ? "600" : "400",
                }}
              >
                {options.tabBarLabel ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
