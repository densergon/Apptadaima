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
          `http://192.168.3.9:3000/api/homeworks/current/${id}`
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

  function calc(fechaString) {
    // Convierte la cadena de fecha a un objeto Date
    const fechaSeleccionada = new Date(fechaString);
    // Obtiene la fecha actual
    const fechaActual = new Date();
    // Calcula la diferencia en milisegundos
    const diferenciaEnMilisegundos = fechaSeleccionada - fechaActual;
    // Calcula la diferencia en días
    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    // Lógica de retorno basada en las condiciones proporcionadas
    if (diferenciaEnDias === 0 || diferenciaEnDias === 1) {
      return 'Urgente';
    } else if (diferenciaEnDias >= 2 && diferenciaEnDias <= 3) {
      return 'No tan urgente';
    } else {
      return 'Regular';
    }
  }


  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={styles.h1}>Tareas Pendientes</Text>
        <View style={styles.container}>
          {tareas.map((tarea) => (
            <Pressable
              key={tarea.idTareas}
              style={styles.homework}
              onPress={() => navigation.navigate('Tarea', {
                id: tarea.idTareas,
                curso: id
              })}
            >
              <View>
                <Text style={styles.homeworkTitle}>{tarea.nombre}</Text>
                <Text style={styles.homeworkTitle}>{tarea.descripcion}</Text>
              </View>
              <Text
                style={[
                  styles.priorityText,
                  calc(tarea.dateDelivery) === 'Urgente'
                    ? styles.priorityUrgent
                    : calc(tarea.dateDelivery) === 'No tan urgente'
                      ? styles.priorityNotUrgent
                      : styles.priorityRegular,
                ]}
              >
                {calc(tarea.dateDelivery)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;
