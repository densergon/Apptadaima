import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { Link, useIsFocused } from '@react-navigation/native';

const MyCoursesScreen = () => {
    const [cursos, setCursos] = useState([]);
    //const idUsuario = useAuthStore.getState().user?.id_usuario;
    const idUsuario = 5;

    const focused = useIsFocused()

    const fetchCursos = async () => {
        try {
            const response = await axios.get(`http://192.168.56.1:3000/api/cursos/${idUsuario}`);
            console.log(response)
            setCursos(response.data);
        } catch (error) {
            console.error('Error al obtener cursos:', error);
        }
    };

    useEffect(() => {
        fetchCursos();
    }, [focused]);

    return (
        <ScrollView style={styles.container}>
            {cursos.map((curso, index) => (
                <Link to={{ screen: 'Mis cursos', params: { id: curso.idCurso } }}
                    key={curso.idCurso} style={styles.courseitem}>
                    <Text style={styles.courseTitle}>{curso.curso}</Text>
                    <Text style={styles.courseTeacher}>{curso.nombre} {curso.apellidoPaterno} {curso.apellidoPaterno}</Text>
                </Link>
            ))}
        </ScrollView>
    );
};

export default MyCoursesScreen
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    courseitem: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10
    },
    courseTitle: {
        textAlign: 'center',
        fontSize: 20
    },
    courseTeacher: {
        fontSize: 18,
        textAlign: 'center'
    }
})