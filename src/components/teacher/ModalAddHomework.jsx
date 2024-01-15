import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, TextInput, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
// Importa el datepicker solo en web
let DatePicker;
if (Platform.OS === 'web') {
  DatePicker = require('react-datepicker').default;
  require('react-datepicker/dist/react-datepicker.css');
}

const ModalAddHomework = ({ visible, onHide, getData, route }) => {

  const { id } = route.params;
  const [date, setDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState('')
  const [prioridad, setPrioridad] = useState(0);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('')

  const Homework = {
    nombre,
    descripcion,
    dateDelivery: convertirFormatoFecha(deliveryDate),
    curso: Number(id),
    prioridad
  }

  function convertirFormatoFecha(fechaOriginal) {
    // Parsea la fecha original
    const fechaParseada = new Date(fechaOriginal);

    // Obtiene los componentes de la fecha
    const year = fechaParseada.getFullYear();
    const month = String(fechaParseada.getMonth() + 1).padStart(2, '0');
    const day = String(fechaParseada.getDate()).padStart(2, '0');
    const hours = String(fechaParseada.getHours()).padStart(2, '0');
    const minutes = String(fechaParseada.getMinutes()).padStart(2, '0');
    const seconds = String(fechaParseada.getSeconds()).padStart(2, '0');

    // Formatea la fecha en el nuevo formato
    const fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return fechaFormateada;
  }



  const HandleSubmit = async () => {
    try {
      await axios.post('http://192.168.3.9:3000/api/homeworks', Homework);
      getData()
      onHide()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onHide()}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.form}>
            <View style={styles.closeBtn}>
              <Pressable onPress={() => onHide()}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            <TextInput style={styles.txtIpt} placeholder='Nombre de la Tarea' onChangeText={setNombre} />
            <TextInput style={styles.txtIpt} placeholder='Descripcion de la Tarea' onChangeText={setDescripcion} />
            <Text style={styles.label}>Fecha de Entrega:</Text>

            {Platform.OS === 'web' ? (
              <DatePicker
                selected={deliveryDate}
                onChange={setDeliveryDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}

                dateFormat="yyyy MMMM d,h:mm aa"
              />
            ) : (
              <TextInput
                style={styles.txtIpt}
                placeholder="Selecciona una fecha"
                value={deliveryDate}
                onChangeText={setDeliveryDate}
                type={Platform.OS === 'web' ? 'datetime-local' : undefined}
              />
            )}
            <Pressable style={styles.addBtn} onPress={HandleSubmit}>
              <Text style={styles.addTxtBtn}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    width: '95%',
    borderRadius: 10,
    marginTop: 100
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  form: {
    margin: 5
  },
  txtIpt: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
    margin: 5
  },
  h1: {
    fontSize: 20,
    margin: 10
  },
  addBtn: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  addTxtBtn: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
  delivery: {
    padding: 10
  },
  label: {
    padding: 10
  }
});

export default ModalAddHomework;
