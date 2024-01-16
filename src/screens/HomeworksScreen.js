//Agregar una tarea PROFESOR
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { Link, useIsFocused, useNavigation } from "@react-navigation/native";
import ModalAddHomework from "../components/teacher/ModalAddHomework";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const HomeworksScreen = ({ route }) => {
  const [tareas, setTareas] = useState([]);
  const idP = useAuthStore.getState().user?.id_usuario;
  const { id } = route.params;
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const focus = useIsFocused();

  const fetchTareas = async () => {
    try {
      const response = await axios.get(
        `http://192.168.3.9:3000/api/homeworks/clase/${id}`
      );
      const tareasOrdenadas = response.data.sort((a, b) => {
        const dateA = new Date(a.dateDelivery);
        const dateB = new Date(b.dateDelivery);
        return dateA.getTime() - dateB.getTime();
      });
      setTareas(tareasOrdenadas);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, [focus]);

  useEffect(() => {
    // Set navigation options in the component
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View>
        <Pressable style={styles.btn} onPress={() => setVisible(true)}>
          <Feather name="plus" size={22} color="white" />
          <Text style={styles.btnTxt}>Agregar tarea</Text>
        </Pressable>
        <View style={styles.container}>
          {tareas.map((tarea) => (
            <View key={tarea.idTareas} style={styles.homework}>
              <Pressable onPress={() => navigation.navigate("Entregadas", {
                id: tarea.idTareas
              })}
                key={tarea.idTareas}
                style={styles.courseitem}
              >
                <Text style={styles.homeworkTitle}>{tarea.nombre}</Text>
                <Text style={styles.homeworkTitle}>{tarea.descripcion}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
      <ModalAddHomework
        visible={visible}
        onHide={() => setVisible(false)}
        getData={() => fetchTareas()}
        route={route}
      />
    </ScrollView>
  );
};

export default HomeworksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    padding: 10,
    backgroundColor: "#2980b9",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  btnTxt: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
  homework: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeworkTitle: {
    fontSize: 20,
  },
});
