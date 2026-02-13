import { useContext, useState } from "react";
import HeaderAvater from "../../components/HeaderAvatar";
import MainContainer from "../../components/MainContainer";
import { ThemeContext } from "../../context/ThemeContext";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme/theme";
import SearchBox from "../../components/searchBox";

export default function Index() {
  const [activedIndexx, setActivedIndex] = useState(0);
  const { currentTheme } = useContext(ThemeContext);
  const style = StyleSheet.create({
    appTyttle: {
      fontSize: 29,
      color: theme(currentTheme).colors.text,
      marginVertical: 12,
      fontWeight: "700",
      fontFamily: "Poppins_400Regular",
    },
    filterContent: {
      backgroundColor: theme(currentTheme).colors.card,
      padding: 3,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      paddingHorizontal: 22,
      fontWeight: "600",
      elevation: 3,
    },
    textFilter: {
      color: theme(currentTheme).colors.text2,
      fontFamily: "Poppins_400Regular",
    }
  })


  const FILTER_DATA = [
    {
      name: "Hoje",
      value: "today"
    },
    {
      name: "Amanhã",
      value: "tomorrow"
    },
    {
      name: "Esta Semana",
      value: "this_weak"
    }
  ]

  const RenderFilter = ({ item, index }) => {
    return (
      <TouchableOpacity style={[style.filterContent, activedIndexx === index && { backgroundColor: theme(currentTheme).colors.primary }]}>
        <Text style={[style.textFilter, activedIndexx === index && { color: theme(currentTheme).colors.colorButton }]}>{item?.name}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <MainContainer>
      <HeaderAvater />
      <Text style={style.appTyttle}>Para onde vamos Hoje?</Text>
      <SearchBox />

      <ScrollView style={{ flex: 1, }}>
        <FlatList
          style={{ marginVertical: 12, paddingVertical: 3 }}
          data={FILTER_DATA}
          horizontal
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <RenderFilter item={item} index={index} />}
          ItemSeparatorComponent={() => <View style={{ padding: 11 }} />}
        />


      </ScrollView>
    </MainContainer>
  )
}