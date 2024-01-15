import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'


const Page = ({ route }) => {
    const { id } = route.params;
    const focused = useIsFocused()
    const [entregadas, setEntregadas] = useState([])

    const getEntregadas = async () => {
        const response = await axios.get(`http://192.168.3.9:3000/api/delivered/all/${Number(id)}`)
        setEntregadas(response.data)
    }
    useEffect(() => {
        getEntregadas()
    }, [focused])
    return (
        <View>
            {entregadas.map((entregada) => (
                <Pressable style={styles.item} key={entregada.idEntregadas}>
                    <View>
                        <Text>{entregada.nombre}</Text>
                        <Text>{entregada.boleta}</Text>
                    </View>
                    <View>
                        <Text>{entregada.calificacion}</Text>
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})