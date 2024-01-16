import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Link, useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/Homeworks.styles";
import { AntDesign } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";


const Page = ({ route }) => {
    const focused = useIsFocused();
    const navigation = useNavigation();
    const { id } = route.params;
    const prioridad = ["Urgente", "Normal", "No urgente", "Opcional"];
    const [tareas, setTareas] = useState([]);
    const getTareas = async () => {
        try {
            const response = await axios.get(`http://192.168.1.72:3000/api/homeworks/clase/${Number(id)}`);
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
                    <Pressable style={styles.delBtn}
                        onPress={() =>
                            navigation.navigate("Descripción", {
                                id: tarea.idTareas,
                                curso: id,
                            })
                        }
                        key={tarea.idTareas}
                    >
                        <View style={styles.materialItem}>
                            <Text style={styles.materialName}>{tarea.nombre}</Text>
                            <Text style={styles.materialName}>{tarea.descripcion}</Text>
                            <Text style={styles.materialName}>
                                {prioridad[Number(tarea.prioridad)]}
                            </Text>
                            <Text style={styles.materialName}>
                                Fecha de entrega:
                                {new Date(tarea.dateDelivery).toLocaleDateString()}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
};

export default Page;

const style = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 15,
    }, homeworkTitle: {
        fontSize: 14,
    }, h1: {
        fontSize: 20,
        margin: 10,
    },
    btn: {
        backgroundColor: "#3498db",
        padding: 10,
        width: "50%",
        alignSelf: "flex-end",
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        margin: 5,
    },
    btnText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
    materialItem: {
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    materialName: {
        fontSize: 20,
        paddingLeft: 20,
    },
    delBtn: {
        backgroundColor: "red",
        padding: 8,
        borderRadius: 10,
    },

});
