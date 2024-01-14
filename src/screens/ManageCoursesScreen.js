import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { Link, useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ModalAddClass from "../components/teacher/ModalAddClass";
import { Feather } from "@expo/vector-icons";
import ModalUpdateClass from "../components/teacher/ModalUpdateClass";

const ManageCoursesScreen = () => {
  const [clases, setClases] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const idProfesor = useAuthStore.getState().user?.id_usuario;
  const [idCurso, setIdCurso] = useState(0);
  const focused = useIsFocused();
  const navigation = useNavigation();
  const fetchClases = async () => {
    try {
      const response = await axios.get(
        `http://192.168.56.1:3000/api/classes/all/${idProfesor}`
      );
      console.log(idProfesor);
      setClases(response.data);
    } catch (error) {
      console.error("Error al obtener las clases:", error);
    }
  };

  const deleteClass = async (id) => {
    await axios.delete(`http://192.168.100.165:3000/api/classes/${id}`);
    fetchClases();
  };
  const updateClass = (id) => {
    setIdCurso(id);
    setVisible2(true);
  };
  useEffect(() => {
    fetchClases();
  }, [focused]);

  return (
    <ScrollView>
      <View>
        <Pressable style={style.btn} onPress={() => setVisible(true)}>
          <Text style={style.btnTxt}>Agregar clase</Text>
          <AntDesign name="pluscircleo" size={22} color="white" />
        </Pressable>
      </View>
      <View>
        {clases.map((clase) => (
          <View key={clase.idCurso} style={style.class}>
            <Pressable
              onPress={() =>
                navigation.navigate("Curso", {
                  id: clase.idCurso,
                })
              }
            >
              <Text style={style.p}>{clase.curso}</Text>
            </Pressable>
            <View style={style.btnSpan}>
              <Pressable
                style={style.editBtn}
                onPress={() => updateClass(clase.idCurso)}
              >
                <Feather name="edit" size={22} color="white" />
              </Pressable>

              <Pressable
                style={style.deleteBtn}
                onPress={() => deleteClass(clase.idCurso)}
              >
                <Feather name="trash" size={22} color="white" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
      <ModalAddClass
        visible={visible}
        onHide={() => setVisible(false)}
        getClasses={() => fetchClases()}
      />
      <ModalUpdateClass
        visible={visible2}
        onHide={() => setVisible2(false)}
        getClasses={() => fetchClases()}
        id={idCurso}
      />
    </ScrollView>
  );
};

export default ManageCoursesScreen;

const style = StyleSheet.create({
  class: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  p: {
    fontSize: 20,
  },
  btnSpan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  btn: {
    padding: 15,
    backgroundColor: "#3498db",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  editBtn: {
    backgroundColor: "#f1c40f",
    padding: 8,
    borderRadius: 10,
  },
  editBtnTxt: {
    color: "white",
    fontSize: 18,
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 10,
  },
});
