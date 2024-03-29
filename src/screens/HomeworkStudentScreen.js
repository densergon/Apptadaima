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
  const navigation = useNavigation();
  const id = useAuthStore.getState().user?.id_usuario;
  const [tareas, setTareas] = useState([]);
  const [entregadas, setEntregadas] = useState([])


  const focus = useIsFocused();
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
  const getEntregadas = async () => {
    try {
      const response = await axios.get(`http://192.168.3.9:3000/api/homeworks/delivered/${id}`)
      setEntregadas(response.data)
    } catch (error) {
      console.log(error)
    }
  }

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
    getEntregadas();
  }, [focus]);

  useEffect(() => {
    // Set navigation options in the component
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 10 }}
          onPress={() => navigation.navigate('Welcome')}
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
              onPress={() => navigation.navigate('Descripción', {
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
        <Text style={styles.h1}>Tareas Entregadas</Text>
        {
          entregadas.map((tarea) => (
            <View
              key={tarea.idTareas}
              style={styles.homework}
            >
              <View>
                <Text style={styles.homeworkTitle}>{tarea.nombre}</Text>
                <Text style={styles.homeworkTitle}>{tarea.descripcion}</Text>
              </View>
              <Text style={styles.homeworkTitle}>
                {tarea.calificacion}
              </Text>
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
};

export default Page;
