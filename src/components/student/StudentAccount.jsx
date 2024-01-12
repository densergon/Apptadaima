import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { styles } from '../../styles/Account.styles';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../auth/authStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ModalBoleta from './ModalBoleta';

/*
interface User {
    nombre: string,
    boleta: string | null,
    email: string
}
*/

const Account = () => {
    const [user, setUser] = useState<User | null>(null);
    const userId = useAuthStore().user?.id_usuario;
    const [visible, setVisible] = useState(false);

    const getData = async () => {
        await fetch(`http://192.168.56.1:3000/api/students/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
                if (data.boleta == null) {
                    setVisible(true)
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    useEffect(() => {
        getData()
    }, [userId]);


    const rol = useAuthStore().user?.tipo_usuario;
    const logOut = () => {
        useAuthStore.getState().logout();
    };

    const goBack = () => {
        if (rol == 1) {
            router.replace('/administrator/');
        } else if (rol == 2) {
            router.replace('/teacher/');
        } else if (rol == 3) {
            router.replace('/student/');
        }
    };

    return (
        <View style={{ marginTop: Constants.statusBarHeight }}>
            <StatusBar style='dark' />
            <ModalBoleta visible={visible} onHide={() => setVisible(false)} getData={getData} />
            <View style={styles.container} >
                <View style={styles.header}>
                    <Pressable style={styles.icon} onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </Pressable>
                    <Text style={styles.h1}>Mis datos alumno</Text>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.dataContainer}>
                        <View style={styles.box}>
                            <Text style={styles.p}>Nombre:</Text>
                            {user ? <Text style={styles.p}>{user?.nombre}</Text> : <Text></Text>}
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.p}>Boleta:</Text>
                            {user ? <Text style={styles.p}>{user?.boleta}</Text> : <Text></Text>}
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.p}>Email:</Text>
                            {user ? <Text style={styles.p}>{user?.email}</Text> : <Text></Text>}
                        </View>
                    </View>

                </View>
                <View style={{ margin: 10 }}>
                    <Text>Cambiar contraseña</Text>
                </View>
                <View>
                    <Pressable onPress={logOut}>
                        <Text style={styles.red}>Cerrar Sesión</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Account