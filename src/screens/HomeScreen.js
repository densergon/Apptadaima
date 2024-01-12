import { Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>HomeScreen</Text>
            <Link to={{ screen: 'Profesores' }}>
                Profesores
            </Link>
            <Link to={{ screen: 'Cursos' }}>
                Cursos
            </Link>
            <Link to={{ screen: 'Profesores' }}>
                Profesores
            </Link>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        gap: 15
    }
})