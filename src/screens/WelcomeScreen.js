import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const userType = useAuthStore.getState().user?.tipo_usuario;
    const auth = useAuthStore.getState().isAuthenticated;
    const [btn, setBtn] = useState(<></>);
    const navigation = useNavigation();
    const log = useAuthStore.getState().logout;
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
        <View style={styles.container}>
            <Text style={styles.txt}>{greeting}</Text>
            {btn}
        </View>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    txt: {
        fontSize: 18
    }
})
