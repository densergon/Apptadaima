import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const userType = useAuthStore.getState().user?.tipo_usuario;
    //console.log(useAuthStore.getState().user);
    const logout = useAuthStore.getState().logout;
    const navigation = useNavigation()
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
        <View>
            <Text>{greeting}</Text>
            <Pressable onPress={cerrarSesion}>
                <Text>Cerrar Sesión</Text>
            </Pressable>
        </View>
    )
}

export default WelcomeScreen;
