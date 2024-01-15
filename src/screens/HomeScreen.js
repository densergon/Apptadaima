import { Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Tadaima</Text>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})