import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { Link, useIsFocused, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/Homeworks.styles";
import { AntDesign } from "@expo/vector-icons";
import HomeworkDescriptionScreen from "../screens/HomeworkDescriptionScreen";

const Page = () => {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const id = useAuthStore.getState().user?.id_usuario;
  const prioridad = ["Urgente", "Normal", "No urgente", "Opcional"];
  const [tareas, setTareas] = useState([]);

  const focus = useIsFocused();

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axios.get(
          `http://192.168.56.1:3000/api/homeworks/current/${id}`
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
      <View style={{ padding: 10 }}>
        <Text style={styles.h1}>Tareas Pendientes</Text>
        <View style={styles.container}>
          {tareas.map((tarea) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Descripción", {
                  id: tarea.idTareas,
                  curso: id,
                })
              }
              key={tarea.idTareas}
            >
              <View style={styles.homework}>
                <View>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="black"
                  />
                </View>
                <View style={{ width: 150 }}>
                  <Text style={styles.homeworkTitle}>{tarea.nombre}</Text>
                  <Text style={styles.homeworkTitle}>{tarea.descripcion}</Text>
                  <Text style={styles.homeworkTitle}>
                    {prioridad[Number(tarea.prioridad)]}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;
