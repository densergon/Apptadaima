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
  const prioridad = ["Urgente", "No tan urgente", "Regular"]

  const fetchTareas = async () => {
    try {
      const response = await axios.get(
        `http://192.168.3.9:3000/api/homeworks/clase/${id}`
      );
      console.log(response.data)
      const tareasOrdenadas = response.data.sort((a, b) => {
        const dateA = new Date(a.dateDelivery);
        const dateB = new Date(b.dateDelivery);

        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });

      console.log(tareasOrdenadas)
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
      <View>
        <Pressable style={styles.btn} onPress={() => setVisible(true)}>
          <Feather name="plus" size={22} color="white" />
          <Text style={styles.btnTxt}>Agregar tarea</Text>
        </Pressable>
        <View style={styles.container}>
          {tareas.map((tarea) => (
            <Pressable key={tarea.idTareas} style={styles.homework} onPress={() => navigation.navigate('Tarea', {
              id: tarea.idTareas,
              curso: id
            })}>
              <View>
                <Text style={styles.homeworkTitle}>{tarea.nombre}</Text>
                <Text style={styles.homeworkTitle}>{tarea.descripcion}</Text>
              </View>
              <Text style={[
                calc(tarea.dateDelivery) === 'Urgente'
                  ? styles.priorityUrgent
                  : calc(tarea.dateDelivery) === 'No tan urgente'
                    ? styles.priorityNotUrgent
                    : styles.priorityRegular,
              ]}
              >
                {calc(tarea.dateDelivery)}</Text>
            </Pressable>
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
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20
  },
  homeworkTitle: {
    fontSize: 20,
  },
  priorityUrgent: {
    color: 'red',
  },
  priorityNotUrgent: {
    color: 'yellow',
  },
  priorityRegular: {
    color: 'gray',
  },
});
