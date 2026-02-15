import { useContext, useEffect, useMemo, useState } from "react";
import HeaderAvater from "../../components/HeaderAvatar";
import MainContainer from "../../components/MainContainer";
import { ThemeContext } from "../../context/ThemeContext";
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme/theme";
import SearchBox from "../../components/searchBox";
import { ListRotas } from "../../components/ListaRotas";
import { mockRotas } from "../../data/mookRotas";
import { Api } from "../../api/Api";
import ModalBottomAlert from "../../components/ModalBotttomAlert";
import ModalLoader from "../../components/ModalLoader";
import EmptyCard from "../../components/EmptyCard";

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultData, setDefaultData] = useState([])
  const [defaultText, setDefaultText] = useState("Explorar Rotas")
  const [emptyMessage, setEmptyMessage] = useState("Sem Registros!")
  const [messageModal, setMessageModal] = useState({
    open: false,
    title: "",
    message: "",
    status: "",
    onClose: () => { closeModal() }
  });

  const closeModal = () => {
    setMessageModal({
      open: false,
      title: "",
      message: "",
      status: "",
      onClose: () => { closeModal() }
    })
  }

  const [data, setData] = useState([]);
  const { currentTheme } = useContext(ThemeContext);
  const style = StyleSheet.create({
    appTyttle: {
      fontSize: 29,
      color: theme(currentTheme).colors.text,
      marginVertical: 12,
      fontWeight: "700",
      fontFamily: "Inter_700Bold",
    },
    filterContent: {
      backgroundColor: theme(currentTheme).colors.card,
      padding: 6,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      paddingHorizontal: 22,
      elevation: 3,
      flexDirection: "row",
      gap: 6,
    },
    textFilter: {
      color: theme(currentTheme).colors.text2,
      fontFamily: "Inter_700Bold",
      fontWeight: "700",
    },
    subtitle: {
      fontSize: 16,
      color: theme(currentTheme).colors.text2,
      fontWeight: "500",
      fontFamily: "Inter_400Regular"
    }
  })

  const FILTER_DATA = [
    { name: "Todas", value: "all" },
    { name: "Ativas", value: "ativa" },
    { name: "Inativas", value: "inativa" },
    { name: "Diretas", value: "direta" },
    { name: "Longa Distância", value: "longa" }
  ];


  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const response = await Api.ListarRotas();
      const { data } = response
      setData(data ?? []);
      setDefaultData(data ?? [])
      setRefreshing(false)
      setIsLoading(false);
      setActiveFilter("all")
    } catch (error) {
      setRefreshing(false);
      setMessageModal((before) => ({ ...before, title: "Erro inesperado!", message: error, status: "error", open: true, }))
    }
  }

  const reloadDataBase = () => {
    setRefreshing(true);
    fetchData()
  }

  const RenderFilter = ({ item, index }) => {
    const isActive = activeFilter === item.value;

    return (
      <TouchableOpacity
        onPress={() => { setActiveFilter(item.value); setEmptyMessage("Sem Registros") }}
        style={[
          style.filterContent,
          isActive && { backgroundColor: theme(currentTheme).colors.primary }
        ]}
      >
        <Text
          style={[
            style.textFilter,
            isActive && { color: theme(currentTheme).colors.colorButton }
          ]}
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const filteredData = useMemo(() => {
    return data.filter((rota) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "ativa") return rota.status === "ativa";
      if (activeFilter === "inativa") return rota.status === "inativa";
      if (activeFilter === "direta") return rota.tipo_viagem === "Direta";
      if (activeFilter === "longa") return Number(rota.distancia_km) > 400;
      return true;
    });
  }, [data, activeFilter]);

  const onSearch = (value) => {
    if (value.length === 0) {
      setData(defaultData);
      setDefaultText("Explorar Rotas")
      return;
    }

    const filterData = defaultData.filter((rota) =>
      rota.origem.toUpperCase().includes(value.toUpperCase()) || rota.destino.toUpperCase().includes(value.toUpperCase())
    );

    setData(filterData);
    setDefaultText("Resultado da Pesquisa")
    setEmptyMessage(filterData.length === 0 ? "Nanhum registro encontrado para: " + " " + value : "Sem registros")
  }


  return (
    <MainContainer style={{ paddingBottom: 6 }}>
      <HeaderAvater />
      <Text style={style.appTyttle}>Para onde vamos Hoje?</Text>
      <SearchBox onSearch={onSearch} />

      <ScrollView style={{ flex: 1, marginTop: 6, backgroundColor: theme(currentTheme).colors.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={reloadDataBase}
        />}
      >
        <FlatList
          style={{ marginVertical: 12, paddingVertical: 3 }}
          data={FILTER_DATA}
          horizontal
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <RenderFilter item={item} index={index} />}
          ItemSeparatorComponent={() => <View style={{ padding: 11 }} />}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={[style.subtitle,]}>{defaultText}</Text>

        {
          filteredData.map((item, index) => (
            <ListRotas {...item} key={index} />
          ))
        }

        {filteredData.length === 0 ? <EmptyCard message={emptyMessage} /> : ""}
      </ScrollView>

      <ModalBottomAlert
        visible={messageModal.open}
        message={messageModal.message}
        title={messageModal.title}
        status={messageModal.status}
        onClose={messageModal.onClose}
      />
      {
        isLoading === true &&
        <ModalLoader />
      }
    </MainContainer>
  )
}