import { Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

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
        marginTop: '10%',
        gap: 15
    }
})