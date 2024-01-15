import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Link, useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const MyCoursesScreen = () => {
  const [cursos, setCursos] = useState([]);
  const idUsuario = useAuthStore.getState().user?.id_usuario;
  const userType = useAuthStore.getState().user?.tipo_usuario;
  const focused = useIsFocused();
  const navigation = useNavigation();

  console.log("userType: " + userType);

  const fetchCursos = async () => {
    try {
      if (userType === 3) {
        const response = await axios.get(
          `http://192.168.56.1:3000/api/cursos/${idUsuario}`
        );
        //console.log(response);;
        setCursos(response.data);
      }
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, [focused]);

  return (
    //<ImageBackground source={require('../../assets/img/Grupos.jpg')} style={styles.backgroundImage}>
    <ScrollView style={[styles.container, styles.containerWithUnderline]}>
      <View style={styles.containerWithUnderline}>
        {cursos.map((curso, index) => (
          <Pressable
            key={index}
            onPress={() => {
              navigation.navigate("CursoStudent", { id: curso.idCurso });
            }}
            style={styles.courseitem}
          >
            <Text style={styles.courseTitle}>{curso.curso}</Text>
            <Text style={styles.courseTeacher}>
              {curso.nombre} {curso.apellidoPaterno} {curso.apellidoPaterno}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
    //</ImageBackground>
  );
};

export default MyCoursesScreen;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  courseitem: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  courseTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  courseTeacher: {
    fontSize: 18,
    textAlign: "center",
  },
});
