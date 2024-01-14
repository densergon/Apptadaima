import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import { useAuthStore } from "../../store/authStore";
import { useNavigation } from '@react-navigation/native';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const onShowHidePassword = () => setShowPassword(!showPassword);

  const onSubmit = async () => {
    try {
      const { data } = await axios.post("http://192.168.100.165:3000/api/auth/custom", { email, password });
      // Si la autenticación es exitosa y recibimos un token del backend
      if (data.token) {
        // Actualizar el estado global usando Zustand
        useAuthStore.getState().login({
          email: data.email,
          authToken: data.token,
          tipo_usuario: data.rol,
          id_usuario: data.idUsuario,
          name: data.name
        });


      }
    } catch (error) {
      Alert.alert('Credenciales incorrectas')
      console.log(error)
    }
  };

  const auth = useAuthStore().isAuthenticated
  const userAuth = useAuthStore().user;

  useEffect(() => {
    if (auth) {
      navigation.navigate('Welcome')
    }
  }, [auth])

  return (
    <View style={styles.content}>
      <View style={styles.box}>
        <TextInput
          style={styles.input}
          placeholder="Correo Electronico"
          onChangeText={setEmail}
          underlineColorAndroid="transparent"
        />
        <Entypo name="email" size={20} color="#7f8c8d" />
      </View>
      <View style={styles.box}>
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={onShowHidePassword}>
          <Entypo name={showPassword ? "eye-with-line" : "eye"} size={24} color="#7f8c8d" />
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={onSubmit}
        >
          <Text style={styles.txtBtn}>Iniciar Sesion</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginForm;



const styles = StyleSheet.create({
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10
  },
  box: {
    backgroundColor: 'white',
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 10
  },
  txtBtn: {
    color: '#ecf0f1'
  }
})