import { Platform, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import theme from "../app/theme/theme";
import { MediumText, RegularText, SubTitle, Title } from "./TextComponent";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ListRotas = React.memo(
  ({ origem, destino, distancia_km, duracao_horas, status }) => {
    const { currentTheme } = useContext(ThemeContext);
    const colors = theme(currentTheme).colors;

    const style = StyleSheet.create({
      card: {
        backgroundColor: colors.card,
        padding: 12,
        marginVertical: 6,
        borderRadius: 14,
        borderWidth: currentTheme === "dark" ? 1 : 0.5,
        borderColor: colors.border,
        elevation: 4,
      },

      badge: {
        alignSelf: "flex-start",
        backgroundColor: colors.primary + "20",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 6,
      },

      badgeText: {
        color: colors.primary,
        fontSize: 12,
        letterSpacing: 1,
      },

      routeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },

      locationContainer: {
        flex: 1,
      },

      locationCode: {
        fontSize: 24,
        color: colors.text,
        fontWeight: "bold",
        letterSpacing: 3,
      },

      locationName: {
        fontSize: 13,
        color: colors.text2,
      },

      middleContainer: {
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      },

      line: {
        position: "absolute",
        height: 2,
        width: "100%",
        backgroundColor: colors.primary,
      },

      bus: {
        width: 44,
        height: 44,
        borderRadius: 50,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      },

      infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        paddingTop: 10,
        borderTopWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.border,
      },

      infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      },

      infoText: {
        fontSize: 13,
        color: colors.warning,
      },

      button: {
        marginTop: 14,
        alignSelf: "flex-end",
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 25,
      },

      buttonText: {
        fontSize: 14,
        color: colors.colorButton,
        fontWeight: "600",
      },
    });

    const formatName = (name) => name.substring(0, 3).toUpperCase();
    const backGroundStatus = () => {
      return {
        ativa: theme(currentTheme).colors.success,
        inativa: theme(currentTheme).colors.error,
        direta: theme(currentTheme).colors.secondary,
      }
    }

    return (
      <View style={style.card}>
        {/* Badge */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[style.badge]}>
            <RegularText style={style.badgeText}>EXPRESS</RegularText>
          </View>
          <View style={[style.badge, { backgroundColor: backGroundStatus()[status] + 33 }]}>
            <RegularText style={{ color: backGroundStatus()[status], fontSize: 12 }}>{status?.toUpperCase()}</RegularText>
          </View>
        </View>

        {/* Origem → Destino */}
        <View style={style.routeContainer}>
          <View style={style.locationContainer}>
            <RegularText style={{ color: colors.text2 }}>
              Origem
            </RegularText>
            <Title style={style.locationCode}>
              {formatName(origem)}
            </Title>
            <RegularText style={style.locationName}>
              {origem}
            </RegularText>
          </View>

          <View style={style.middleContainer}>
            <View style={style.line} />
            <View style={style.bus}>
              <Ionicons
                name="bus-sharp"
                size={20}
                color={colors.colorButton}
              />
            </View>
          </View>

          <View style={[style.locationContainer, { alignItems: "flex-end" }]}>
            <RegularText style={{ color: colors.text2 }}>
              Destino
            </RegularText>
            <Title style={style.locationCode}>
              {formatName(destino)}
            </Title>
            <RegularText style={style.locationName}>
              {destino}
            </RegularText>
          </View>
        </View>

        {/* Informações */}
        <View style={style.infoContainer}>
          <View style={style.infoItem}>
            <Ionicons
              name="map-outline"
              size={14}
              color={colors.warning}
            />
            <RegularText style={style.infoText}>
              {distancia_km} km
            </RegularText>
          </View>

          <View style={style.infoItem}>
            <Ionicons
              name="time-outline"
              size={14}
              color={colors.warning}
            />
            <RegularText style={style.infoText}>
              {duracao_horas} h
            </RegularText>
          </View>
        </View>

        {/* Botão */}
        <TouchableOpacity style={style.button}>
          <RegularText style={style.buttonText}>
            Ver Horários
          </RegularText>
        </TouchableOpacity>
      </View>
    );
  }
);
