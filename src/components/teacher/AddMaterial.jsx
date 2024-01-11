import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function AddMaterial() {
    const pickDocument = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf', // Solo archivos PDF
                copyToCacheDirectory: true // Opcional: copia el archivo al directorio de caché del dispositivo
            });
            if (!result.canceled) {
                const file = result.assets[0]; // Acceder al primer archivo del arreglo assets
                console.log('Nombre del archivo:', file.name);
                console.log('Ruta del archivo:', file.uri);
            }
        } catch (error) {
            console.error(error);
        }
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
