import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { fileDb } from "../../config"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function AddMaterial({ getData, id }) {
    const pickDocument = async () => {
        try {
            const documentResult = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',

            });

            if (documentResult.type != 'canceled') {
                const uriuploaded = await uploadToFirebaseStorage(documentResult.assets[0].uri, documentResult.assets[0].name);
                const result = await axios.post('http://192.168.3.9:3000/api/materiales', {
                    uri: uriuploaded,
                    curso: Number(id),
                    nombre: documentResult.assets[0].name
                })
                if (result.status == 200) {
                    Alert.alert('Agregado exitosamente');
                    getData()
                }
            } else {
                console.log('Se canceló la selección del documento');
            }
        } catch (error) {
            console.error('Error al seleccionar el documento:', error);
        }
    };

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

    return (

        <Pressable style={styles.btn} onPress={pickDocument}>
            <Text style={styles.btnText}>Agregar Material</Text>
            <AntDesign name="pluscircleo" size={24} color="white" />
        </Pressable>
    );
}


const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        margin: 10
    },
    btn: {
        backgroundColor: '#3498db',
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    }
});
