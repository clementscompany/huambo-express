import { BlurView } from "expo-blur";
import { ActivityIndicator, Modal, StyleSheet } from "react-native";
import theme from "../app/theme/theme";

export default function ModalLoader() {
  return (
    <Modal visible transparent>
      <BlurView intensity={500} tint="systemChromeMaterialDark" style={[StyleSheet.absoluteFill, { alignItems: "center", justifyContent: "center" }]}>
        <ActivityIndicator color={theme().colors.primary} />
      </BlurView>
    </Modal>
  )
}