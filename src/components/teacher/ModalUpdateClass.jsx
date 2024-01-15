import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';


const ModalUpdateClass = ({ visible, onHide, getClasses, id }) => {

    const [nombre, setNombre] = useState('');


    const handleSubmit = async () => {

        const classData = {
            nombre,
            idCurso: id
        };

        try {
            console.log(classData)
            const response = await axios.put('http://192.168.3.9:3000/api/classes', classData);
            if (response.data.message === 'Modificado exitosamente') {
                Alert.alert('Exito', 'Actualizado exitosamente');
                onHide();
                getClasses()
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al intentar actualizar la clase');
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => onHide()}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.form}>
                        <View style={styles.closeBtn}>
                            <Pressable onPress={() => onHide()}>
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        </View>
                        <Text style={styles.h1}>Actualizar clase</Text>
                        <TextInput style={styles.txtIpt} placeholder='Nombre' onChangeText={setNombre} />
                        <Pressable style={styles.addBtn} onPress={handleSubmit}>
                            <Text style={styles.addTxtBtn}>Salvar cambios</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        width: '95%',
        borderRadius: 10,
        marginTop: 40
    },
    closeBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    form: {
        margin: 5
    },
    txtIpt: {
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 18,
        padding: 10,
        margin: 5
    },
    h1: {
        fontSize: 20,
        margin: 10
    },
    addBtn: {
        backgroundColor: '#3498db',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    addTxtBtn: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});

export default ModalUpdateClass;
