import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

const CourseScreenStudent = ({ route }) => {
    const focused = useIsFocused();
    const { id } = route.params;
    const navigation = useNavigation()
    const [curso, setCurso] = useState({ curso: '', idCurso: 0 });

    const getClass = async () => {
        try {
            const result = await axios.get(`http://192.168.1.72:3000/api/classes/one/${id}`);
            setCurso(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClass();
    }, [focused]);

    return (
        //<ImageBackground source={require('../../../assets/img/AlumnoMenu.jpg')} style={styles.backgroundImage}>
        <ScrollView>
            <View>
                <Pressable style={styles.btn} onPress={() => navigation.navigate('ListaMaterialesStudent', {
                    id: curso.idCurso
                })}>
                    <Text style={styles.btnTxt}>Materiales</Text>
                    <SimpleLineIcons name="docs" size={24} color="white" />
                </Pressable>

                <Pressable style={styles.btn} onPress={() => navigation.navigate('CourseHomeworks', {
                    id: curso.idCurso
                })}>


                    <Text style={styles.btnTxt}>Tareas</Text>
                    <SimpleLineIcons name="docs" size={24} color="white" />
                </Pressable>

            </View>
        </ScrollView>
        //</ImageBackground>
    );
};

export default CourseScreenStudent;

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
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
    },
});
