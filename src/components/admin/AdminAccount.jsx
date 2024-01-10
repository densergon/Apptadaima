import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../../styles/Account.styles';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


const Account = () => {
    const [user, setUser] = useState < User | null > (null);
    const userId = useAuthStore().user?.id_usuario;
    const [visible, setVisible] = useState(false);

    const getData = async () => {
        await fetch(`http://192.168.3.9:3000/api/admin/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
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
            <View style={styles.container} >
                <View style={styles.header}>
                    <Pressable style={styles.icon} onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </Pressable>
                    <Text style={styles.h1}>Mis datos</Text>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.dataContainer}>
                        <View style={styles.box}>
                            <Text style={styles.p}>Nombre:</Text>
                            {user ? <Text style={styles.p}>{user?.persona}</Text> : <Text></Text>}
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