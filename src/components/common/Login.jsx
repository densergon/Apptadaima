import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import LoginForm from "./LoginForm";
import { styles } from "../../styles/Login.styles";
import Img from '../../../assets/img/hollowprofile.jpg'

const Login = () => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <Image source={Img} style={styles.image} />
        <View style={styles.content}>
          <LoginForm />
        </View>
      </View>
    </ScrollView>
  )
}
export default Login