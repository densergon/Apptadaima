import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const CourseScreen = ({ route }) => {

    const focused = useIsFocused()
    const { id } = route.params;
    const [curso, setCurso] = useState({ curso: '', idCurso: 0 });

    const getClass = async () => {
        try {
            const result = await axios.get(`http://192.168.3.9:3000/api/classes/one/${id}`)
            setCurso(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClass()
    }, [focused])

    return (
        <ScrollView>
            <View>
                <Pressable style={styles.btn} onPress={() => navigation.navigate('ListaMateriales', {
                    id: curso.idCurso
                })}>
                    <Text style={styles.btnTxt}>Materiales</Text>
                    <SimpleLineIcons name="docs" size={24} color="white" />
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnTxt}>Tareas</Text>
                    <FontAwesome5 name="tasks" size={24} color="white" />
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnTxt}>Alumnos</Text>
                    <MaterialIcons name="groups" size={24} color="white" />
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default CourseScreen;

const styles = StyleSheet.create({
    clase: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20
    },
    btn: {
        backgroundColor: '#3498db',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    btnTxt: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    }
})

