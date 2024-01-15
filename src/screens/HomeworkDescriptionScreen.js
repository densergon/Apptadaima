//Descripcion Individual de la Tarea
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";
import { AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import { fileDb } from '../config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Page = ({ route }) => {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const { id, curso } = route.params;
  const idUsuario = useAuthStore().user?.id_usuario;
  const [tarea, setTarea] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState(0);


  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });
    if (result.type === 'cancel') {
      console.log('Se canceló la selección del documento');
    } else {
      const uri = result.assets[0].uri;
      const filename = result.assets[0].name;
      const fileurl = await uploadToFirebaseStorage(uri, filename);
      const tareaEntregada = {
        idUsuario,
        idTarea: id,
        uri: fileurl,
        descripcion
      };
      try {
        console.log(tareaEntregada)
        const response = await axios.post(
          `http://192.168.3.9:3000/api/delivered/`,
          tareaEntregada
        );
        console.log(response.data);
        navigation.navigate('CourseHomeworks', { id: curso })
      } catch (error) {
        console.log(error);
      }

    }
  };

  const uploadToFirebaseStorage = async (uri, fileName) => {
    const fileRef = ref(fileDb, fileName);
    const res = await fetch(uri);
    const fileBlob = await res.blob()
    const snapshot = await uploadBytes(fileRef, fileBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const getTarea = async () => {
    try {
      const response = await axios.get(
        `http://192.168.3.9:3000/api/homeworks/tarea/${id}`
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
          onPress={() => navigation.navigate('CourseHomeworks', { id: curso })}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);


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
            <Text>Prioridad:{prioridad}</Text>
            <TextInput value={descripcion} onChangeText={setDescripcion} />
          </View>
          <View>
            <Pressable style={style.btn} onPress={pickDocument}>
              <Text style={style.btnTxt}>Entregar tarea</Text>
            </Pressable>
            <Text>El archivo no puede superar los 2Mb.</Text>
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
