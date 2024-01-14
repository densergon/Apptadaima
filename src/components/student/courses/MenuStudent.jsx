// CourseDetailsScreen.js

import React from 'react';
import { View, Text } from 'react-native';

const MenuStudent = ({ route }) => {
  // Obtén los parámetros de la ruta, que incluyen el ID del curso
  const { id } = route.params;

  // Aquí deberías cargar la información del curso usando el ID y mostrarla
  // Puedes utilizar la lógica que ya tienes para obtener detalles del curso desde tu API

  return (
    <View>
      <Text>Detalles del Curso ID: {id}</Text>
      {/* Mostrar más detalles del curso aquí */}
    </View>
  );
};

export default MenuStudent;
