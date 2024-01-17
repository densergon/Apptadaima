import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const WelcomeScreen = () => {
    const userType = useAuthStore.getState().user?.tipo_usuario;
    const auth = useAuthStore.getState().isAuthenticated;
    const [btn, setBtn] = useState(<></>);
    const navigation = useNavigation();
    const log = useAuthStore.getState().logout;
    const userId = useAuthStore().user?.id_usuario;
    const [user, setUser] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: ''
    });
    const cerrarSesion = () => {
        log()
        navigation.navigate('Perfil')
    }
    useEffect(() => {
        if (auth) {
            setBtn(<>
                <Pressable onPress={cerrarSesion}>
                    <Text>Cerrar Sesión</Text>
                </Pressable></>)
        } else {
            navigation.navigate('Perfil')
        }
    }, [auth])

    const getData = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/auth/user/${userId}`)
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    let greeting = '';
    switch (userType) {
        case 1:
            greeting = 'Bienvenido Administrador';
            break;
        case 2:
            greeting = 'Bienvenido Profesor';
            break;
        case 3:
            greeting = 'Bienvenido Estudiante';
            break;
        default:
            greeting = 'Bienvenido';
            break;
    }

    return (
        <View>
            <Text>{greeting}</Text>
            <Pressable onPress={cerrarSesion}>
                <Text>Cerrar Sesión</Text>
            </Pressable>
        </View>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    logOutBtn: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#e74c3c'
    },
    logOutTxt: {
        color: 'white',
        fontWeight: '500'
    }
})

