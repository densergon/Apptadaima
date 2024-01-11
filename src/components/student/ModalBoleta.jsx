import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useAuthStore } from '../auth/authStore';

/*
interface ModalProps {
    visible: boolean,
    onHide: () => void,
    getData: () => void
}
*/

const ModalBoleta = ({ visible, onHide, getData }) => {

    const [boleta, setBoleta] = useState('')
    const id = useAuthStore.getState().user?.id_usuario;

    const handleSubmit = async () => {
        console.log(boleta)
        const result = await axios.patch(`http://192.168.56.1:3000/api/students/${id}`, {
            boleta: Number(boleta),
            id: Number(id)
        })
        if (result.status == 200) {
            getData()
            onHide()
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
                        {/*<View style={styles.closeBtn}>
                            <Pressable onPress={() => onHide()}>
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        </View>*/
                        }
                        <View>
                            <Text>{id}</Text>
                        </View>
                        <Text style={styles.h1}>Inserta tu número de boleta</Text>
                        <TextInput style={styles.txtIpt} placeholder='Boleta' onChangeText={setBoleta} />


                        <Pressable style={styles.addBtn} onPress={handleSubmit}>
                            <Text style={styles.addTxtBtn}>Salvar</Text>
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
        marginTop: 200
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

export default ModalBoleta;
