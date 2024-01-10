import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import Login from '../components/common/Login'

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Login />
        </SafeAreaView>
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
    container: {
        marginTop: '10%'
    }
})