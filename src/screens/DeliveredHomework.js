import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Platform } from 'react-native';
import ModalCalificar from '../components/teacher/ModalCalificar';

const Page = ({ route }) => {
    const { id } = route.params;
    const focused = useIsFocused()
    const [entregada, setEntregada] = useState({
        idEntregadas: 1,
        idAlumno: "",
        idTarea: 1,
        calificacion: '',
        delivered: '',
        uri: "",
        descripcionentregada: ''
    });
    const [visible, setVisible] = useState(false)
    // Datos de ejemplo
    const getDelivered = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/delivered/one/${id}`);
            console.log(response.data[0])
            setEntregada(response.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const onCalificarPress = () => {
        setVisible(true)
    };

    useEffect(() => {
        getDelivered()
    }, [focused])
    const showFile = (uri) => {
        if (Platform.OS === "web") {
            window.open(uri, "_blank");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>calificacion:</Text>
                {entregada ? <Text>{entregada.calificacion}</Text> : <Text>h</Text>}
                <Pressable onPress={() => showFile(entregada.uri)} style={styles.btn}>
                    <Text>Visualizar</Text>
                </Pressable>
                <Button title="Calificar" onPress={onCalificarPress} />
            </View>
            <ModalCalificar visible={visible} onHide={() => setVisible(false)} getEntregada={() => getDelivered()} id={entregada.idEntregadas} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    infoContainer: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pdf: {
        flex: 1,
        width: '100%',
    },
    btn: {
        padding: 15,
        width: '100%',
        backgroundColor: '#9b59b6'
    }
});

export default Page;