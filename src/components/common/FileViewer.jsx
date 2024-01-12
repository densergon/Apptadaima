import React from 'react';
import { StyleSheet, View } from 'react-native';

const FileViewer = () => {
    const uri = 'https://firebasestorage.googleapis.com/v0/b/tadaima-1e28f.appspot.com/o/EjemploPdf.pdf?alt=media&token=4724671e-6806-4bf5-94a3-a50c95905da7';
    const source = { uri: uri, cache: false };

    return (
        <View style={styles.container}>
            <Text>pdf</Text>
        </View>
    )

}

export default FileViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
    },
    pdf: {
        flex: 1,
        width: '100%'
    }
});