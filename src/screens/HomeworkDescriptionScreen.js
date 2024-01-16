//Descripcion Individual de la Tarea
import { View, Text, StyleSheet, Pressable, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/authStore";
import { AntDesign } from "@expo/vector-icons";
import { fileDb } from "../config"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as DocumentPicker from 'expo-document-picker';

const Page = ({ route }) => {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const { id } = route.params;
  const idUsuario = useAuthStore().user?.id_usuario;
  const [tarea, setTarea] = useState([]);
  const [descripcion, setDescripcion] = useState('')
  const pickDocument = async () => {
    try {
      const documentResult = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',

      });

      if (documentResult.type != 'canceled') {
        const uriuploaded = await uploadToFirebaseStorage(documentResult.assets[0].uri, documentResult.assets[0].name);
        const tareaEntregada = {
          idUsuario,
          idTarea: id,
          uri: uriuploaded,
          descripcion
        };
        console.log(tareaEntregada)

        const result = await axios.post(
          `http://192.168.3.9:3000/api/delivered/`,
          tareaEntregada
        );
        console.log(result.data);
        if (result.status == 200) {
          Alert.alert('Entregado exitosamente');
        }
      } else {
        console.log('Se canceló la selección del documento');
      }
    } catch (error) {
      console.error('Error al seleccionar el documento:', error);
    }
  }
  const uploadToFirebaseStorage = async (uri, fileName) => {
    const fileRef = ref(fileDb, fileName);
    const res = await fetch(uri);
    const fileBlob = await res.blob();
    // Sube el archivo y obtén la referencia del snapshot
    const snapshot = await uploadBytes(fileRef, fileBlob);

    // Obtiene la URL de descarga del archivo
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
          onPress={() => navigation.navigate('Welcome')}
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
          </View>
          <View>
            <TextInput placeholder="Agregar detalles" value={descripcion} onChangeText={setDescripcion} />
            <Pressable style={style.btn} onPress={pickDocument}>
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
