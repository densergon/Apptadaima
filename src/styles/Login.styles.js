import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const fixedWidth = 300;

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%', // Asegúrate de que la imagen de fondo cubra toda la pantalla
        height: '100%', // Asegúrate de que la imagen de fondo cubra toda la pantalla
    },

    page: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    container: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
    },
    innerContainer: {
        width: fixedWidth,
        alignItems: 'center', // Asegura que todo el contenido interno también esté centrado
    },

    image: {
        width: '100%',
        height: 400,
    },
    content: {
        justifyContent: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'transparent', // Ajusta el color de fondo para que coincida con el diseño
        color: '#FFFFFF', // Color del texto
        paddingLeft: 10, // Espacio a la izquierda del texto en el input
        paddingRight: 10, // Espacio a la derecha del texto en el input
        borderRadius: 5, // Ajusta según la imagen proporcionada
        borderWidth: 1, // Ancho del borde
        borderColor: '#707070', // Color del borde
        fontSize: 16, // Ajusta el tamaño del texto
        fontFamily: 'serif', // Asegúrate de usar la fuente correcta
        width: '100%',// Añade altura y anchura si es necesario para que coincida con tu diseño
        height: 50, // Altura del campo de entrada
        // Añade cualquier otro estilo que necesites
    },
    inputContainer: {
        borderBottomWidth: 0, // Eliminar el borde inferior predeterminado de React Native Elements
        // Añade cualquier otro estilo que necesites
    },
    button: {
        backgroundColor: '#807BED', // Color de fondo del botón
        borderRadius: 25, // Bordes redondeados para el botón
        paddingVertical: 10, // Ajusta el padding vertical para cambiar la altura del botón
        paddingHorizontal: 20, // Ajusta el padding horizontal para cambiar la anchura del botón
        alignItems: 'center', // Alineación horizontal del texto dentro del botón
        marginTop: 20, // Espacio encima del botón
    },

    divider: {
        borderBottomColor: '#ffffff', // Color de la línea
        borderBottomWidth: 1, // Grosor de la línea
        marginVertical: 20, // Espaciado vertical antes y después de la línea
    },
    txtContainer: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 100
    },
    textRegister: {
        color: '#000', // Color del texto en blanco
        fontSize: 18, // Ajusta el tamaño de la fuente según sea necesario
        fontFamily: 'sans-serif-light', // Esto es un ejemplo, elige la fuente que se asemeje más
        fontWeight: "700"
    }, textregist: {
        color: '#000', // Color del texto en blanco
        fontSize: 18, // Ajusta el tamaño de la fuente según sea necesario
        fontFamily: 'sans-serif-light', // Esto es un ejemplo, elige la fuente que se asemeje más
        fontWeight: "500"
    },
    forgotPassword: {
        color: '#A98DFF', // Color del texto
        textAlign: 'left',
        paddingLeft: 10,
        marginBottom: 10, // Espacio debajo del texto
        textDecorationLine: 'underline', // Esto subrayará el texto
    },
    signupButton: {
        borderColor: '#ffffff', // Color del borde del botón
        borderWidth: 1, // Ancho del borde
        borderRadius: 25, // Bordes redondeados para el botón
        paddingVertical: 10, // Ajusta el padding vertical para cambiar la altura del botón
        marginTop: 15, // Espacio encima del botón
        marginBottom: 30, // Espacio debajo del botón, ajusta según sea necesario
        // Asegúrate de que el color de fondo sea transparente si deseas solo el borde
        backgroundColor: 'transparent',
    },
    signupButtonText: {
        color: '#ffffff', // Color del texto del botón
    },

});