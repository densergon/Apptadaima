import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Link, useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";

const CourseHomeworks = ({ route }) => {
    const focused = useIsFocused();
    const navigation = useNavigation();
    const { id } = route.params;
    const prioridad = ["Urgente", "Normal", "No urgente", "Opcional"];
    const [tareas, setTareas] = useState([]);


    useEffect(() => {
        navigation.setOptions({
            title: 'Tareas del curso'
        });
    }, []);

    const getTareas = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/homeworks/clase/${Number(id)}`);
            setTareas(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTareas();
    }, [focused]);
    function calc(fechaString) {
        // Convierte la cadena de fecha a un objeto Date
        const fechaSeleccionada = new Date(fechaString);
        // Obtiene la fecha actual
        const fechaActual = new Date();
        // Calcula la diferencia en milisegundos
        const diferenciaEnMilisegundos = fechaSeleccionada - fechaActual;
        // Calcula la diferencia en días
        const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
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
                {tareas.map((tarea) => (
                    <Pressable style={style.item}
                        onPress={() =>
                            navigation.navigate("Descripción", {
                                id: tarea.idTareas,
                                curso: id,
                            })
                        }
                        key={tarea.idTareas}
                    >
                        <Text style={style.itemTitle}>{tarea.nombre}</Text>
                        <Text style={style.itemTxt}>{tarea.descripcion}</Text>
                        <Text style={style.itemTxt}>
                            Fecha de entrega:
                            {new Date(tarea.dateDelivery).toLocaleDateString()}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
};

export default CourseHomeworks;

const style = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: 'white',
    },
    itemTitle: {
        fontSize: 18,
        margin: 5,
        fontWeight: '500'
    },
    itemTxt: {
        fontSize: 15,
        margin: 3
    }
});
