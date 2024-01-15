import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ModalAddTeacher from "../components/admin/ModalAddTeacher";
import axios from "axios";
import ModalEditTeacher from "../components/admin/ModalEditTeacher";
import { useIsFocused } from "@react-navigation/native";

const TeachersScreen = () => {
  const [teachers, setTeachers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [id, setId] = useState(null);
  const isFocused = useIsFocused();

  const getTeachers = async () => {
    const response = await axios.get(
      "http://192.168.56.1:3000/api/teachers"
    );
    setTeachers(response.data);
  };

  const deleteTeacher = async (idUsuarios) => {
    const result = await axios.delete(
      "http://192.168.56.1:3000/api/teachers/" + idUsuarios
    );
    getTeachers();
  };

  useEffect(() => {
    if (isFocused) {
      getTeachers();
    }
  }, [isFocused]);
  return (
    <View>
      <ModalAddTeacher
        visible={visible}
        onHide={() => setVisible(false)}
        getTeachers={() => getTeachers()}
      />
      <ModalEditTeacher
        visible={visible2}
        onHide={() => setVisible2(false)}
        getTeachers={() => getTeachers()}
        id={id}
      />
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={() => setVisible(true)}>
          <Text style={styles.txtBtn}>Dar de alta profesor</Text>
          <Entypo name="plus" size={24} color="white" />
        </Pressable>
      </View>
      <ScrollView>
        {teachers.map((teacher, index) => (
          <View key={index}>
            <View style={styles.teacherBtn}>
              <Pressable>
                <Text
                  style={styles.teacherTxtBtn}
                >{`${teacher.nombre} ${teacher.apellidoPaterno} ${teacher.apellidoMaterno}`}</Text>
              </Pressable>
              <View style={styles.span}>
                <Pressable
                  style={styles.editBtn}
                  onPress={() => {
                    setId(teacher.idUsuarios);
                    setVisible2(true);
                  }}
                >
                  <Text style={styles.editTxtBtn}>Editar</Text>
                </Pressable>
                <Pressable
                  style={styles.deleteBtn}
                  onPress={() => {
                    deleteTeacher(teacher.idUsuarios);
                    getTeachers();
                  }}
                >
                  <Text style={styles.deleteTxtBtn}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TeachersScreen;

const styles = StyleSheet.create({
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  btn: {
    backgroundColor: "#3498db",
    width: 200,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    flexDirection: "row",
    gap: 5,
  },
  txtBtn: {
    color: "white",
    fontSize: 18,
  },
  teacherBtn: {
    backgroundColor: "white",
    padding: 10,
    margin: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teacherTxtBtn: {
    fontSize: 18,
  },
  editBtn: {
    backgroundColor: "#f1c40f",
    padding: 5,
  },
  editTxtBtn: {
    fontSize: 16,
    fontWeight: "500",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    padding: 5,
  },
  deleteTxtBtn: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  span: {
    flexDirection: "row",
    gap: 5,
  },
});
