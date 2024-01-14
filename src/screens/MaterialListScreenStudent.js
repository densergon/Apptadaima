import { View, Text, Pressable, StyleSheet, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const MaterialListScreenStudent = ({ route }) => {
    const focused = useIsFocused()
    const { id } = route.params;
    const [materiales, setMateriales] = useState([])
    const getMateriales = async () => {
        try {
            const { data } = await axios.get(`http://192.168.56.1:3000/api/materiales/all/${id}`);
            setMateriales(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMateriales()
    }, [focused])

    const navigation = useNavigation()

    const showFile = (uri) => {
        if (Platform.OS === 'web') {
            window.open(uri, '_blank')
        } else {
            navigation.navigate('MaterialDisplay')
        }
    }

    return (
        <ScrollView>
            <View>
                {materiales.map((material) =>
                    <View key={material.idMateriales} style={styles.materialItem}>
                        <Pressable onPress={() => showFile(material.uri)}>
                            <Text style={styles.materialName}>{material.nombre}</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default MaterialListScreenStudent


const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        margin: 10
    },
    btn: {
        backgroundColor: '#3498db',
        padding: 10,
        width: '50%',
        alignSelf: 'flex-end',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        margin: 5
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    materialItem: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    materialName: {
        fontSize: 20,
        paddingLeft: 20
    },
    delBtn: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 10
    }
})