//Descripcion Individual de la Tarea
import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";
import { AntDesign } from "@expo/vector-icons";

const Page = ({ route }) => {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const { id } = route.params;
  const idUsuario = useAuthStore().user?.id_usuario;
  const [tarea, setTarea] = useState([]);

  const getTarea = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.165:3000/api/homeworks/tarea/${id}`
      );
      setTarea(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTarea();
  }, [focused]);

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

  const entregar = async () => {
    const tareaEntregada = {
      idUsuario,
      idTarea: id,
      uri: "",
    };
    try {
      const response = await axios.post(
        `http://192.168.100.165:3000/api/delivered/`,
        tareaEntregada
      );
      console.log(response.data);
      navigation.replace("HomeworkStudentScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {tarea ? (
        <>
          <View>
            <Text style={style.h1}>{tarea.nombre}</Text>
            <Text style={style.h2}>{tarea.descripcion}</Text>
            <Text style={style.h2}>
              Fecha de entrega:
              {new Date(tarea.dateDelivery).toLocaleDateString()}
            </Text>
          </View>
          <View>
            <Pressable style={style.btn} onPress={entregar}>
              <Text style={style.btnTxt}>Entregar tarea</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Page;

const style = StyleSheet.create({
  h1: {
    fontSize: 18,
    margin: 10,
  },
  h2: {
    fontSize: 16,
    margin: 8,
  },
  btn: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e67e22",
  },
  btnTxt: {
    color: "white",
    fontSize: 18,
  },
});
