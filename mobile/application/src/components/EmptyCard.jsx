import { useContext } from "react";
import { Text } from "react-native";
import Animated, {
  BounceIn,
} from "react-native-reanimated";
import { ThemeContext } from "../context/ThemeContext";
import theme from "../app/theme/theme";
import { RegularText } from "./TextComponent";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EmptyCard({ message }) {
  const { currentTheme } = useContext(ThemeContext);
  return ( 
    <Animated.View
      entering={BounceIn.duration(500)}
      style={{
        padding: 20,
        borderRadius: 12,
        backgroundColor: theme(currentTheme).colors.card,
        marginVertical: 12,
      }}
    >
      <FontAwesome name="inbox" size={60} color={theme(currentTheme).colors.warning} style={{ alignSelf: "center" }} />
      <RegularText style={{ color: theme(currentTheme).colors.text, fontSize: 14, textAlign: "center" }}>
        {message}
      </RegularText>
    </Animated.View>
  );
}
