import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const NewTChat = () => {
    return (
        <Pressable style={styles.btn}>
            <Entypo name="new-message" size={24} color="black" />
        </Pressable>
    )
}

export default NewTChat

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        marginRight: 5
    }
})