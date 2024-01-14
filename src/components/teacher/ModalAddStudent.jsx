import { View, Text, TextInput, Pressable, Modal, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
const ModalAddStudent = ({ visible, onHide, getStudents }) => {
    const { id } = 5
    const [boleta, setBoleta] = useState('')
    const handleSubmit = async () => {
        console.log(boleta)
        try {
            const response = await axios.post(`http://192.168.100.165:3000/api/students/curso/${id}`, {
                boleta,
                idCurso: Number(id)
            });
            if (response.data.message === 'Estudiante inscrito') {
                onHide();
                setBoleta('');
                getStudents()
            }
        } catch (error) {
            Alert.alert('Error', 'Verifica la boleta del estudiante')
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
                        <Text style={styles.h1}>Inscribir alumno</Text>
                        <TextInput style={styles.txtIpt} placeholder='Boleta del alumno' onChangeText={setBoleta} />
                        <Pressable style={styles.addBtn} onPress={handleSubmit} >
                            <Text style={styles.addTxtBtn}>Inscribir</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAddStudent

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
        marginTop: 120
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
