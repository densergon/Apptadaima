import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { fileDb } from '../../config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';


export default function AddMaterial({ getData, id }) {

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
            try {
                const result = await axios.post('http://192.168.3.9:3000/api/materiales', {
                    uri: fileurl,
                    curso: Number(id),
                    nombre: filename
                })
                if (result.status == 200) {
                    Alert.alert('Agregado exitosamente');
                    getData()
                }
            } catch (error) {
                console.log(error)
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
