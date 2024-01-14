import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/authStore';

const WelcomeScreen = () => {
    const userType = useAuthStore.getState().user?.tipo_usuario;
    //console.log(useAuthStore.getState().user);

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
        </View>
    )
}

export default WelcomeScreen;
