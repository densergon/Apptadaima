import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const WelcomeScreen = () => {
    const [user, setUser] = useState({
        apellidoMaterno: "",
        apellidoPaterno: "",
        email: "",
        idUsuarios: 1,
        nombre: "",
        rol: 1
    });
    const userId = useAuthStore.getState().user?.id_usuario;
    const userType = useAuthStore.getState().user?.tipo_usuario;
    //console.log(useAuthStore.getState().user);
    const logout = useAuthStore.getState().logout;
    const navigation = useNavigation();
    const focused = useIsFocused()
    const getData = async () => {
        try {
            const response = await axios.get(`http://192.168.3.9:3000/api/auth/user/${userId}`)

            setUser(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
    useEffect(() => {
        getData()
    }, [focused]);
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

    const cerrarSesion = () => {
        logout()
        navigation.navigate('Mi perfil')
    }

    return (
        <View style={styles.container}>
            <Text>{greeting}</Text>

            <View>
                <View>
                    <Text >Nombre:</Text>
                    {user ? <Text >{user?.nombre} {user?.apellidoPaterno} {user?.apellidoMaterno}</Text> : <Text></Text>}
                </View>
                <View>
                    <Text>Email:</Text>
                    <Text>{user?.email}</Text>
                </View>

            </View>
            <Pressable onPress={cerrarSesion} style={styles.logOutBtn}>
                <Text style={styles.logOutTxt}>Cerrar Sesión</Text>
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
