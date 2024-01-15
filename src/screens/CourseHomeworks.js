import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Link, useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";


const Page = ({ route }) => {
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

export default Page;

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
