import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/authStore';

const WelcomeScreen = () => {
    const userType = useAuthStore.getState().user?.tipo_usuario;
    return (
        <View>
            <Text>Bienvenido {userType}</Text>
        </View>
    )
}

export default WelcomeScreen