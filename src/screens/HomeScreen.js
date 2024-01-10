import { Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>HomeScreen</Text>
            <Link to={{ screen: 'Profesores' }}>
                Admin
            </Link>
            <Link to={{ screen: 'Cursos' }}>
                Teacher
            </Link>
            <Link to={{ screen: 'Profesores' }}>
                Student
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