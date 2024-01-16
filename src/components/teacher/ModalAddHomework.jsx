import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const ModalAddHomework = ({ visible, onHide, getData, route }) => {
  const { id } = route.params;
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [prioridad, setPrioridad] = useState(0);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const format = (dateObject) => {
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const Homework = {
    nombre,
    descripcion,
    dateDelivery: format(deliveryDate),
    curso: Number(id),
    prioridad
  };


  const HandleSubmit = async () => {
    console.log(Homework)
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
            <DatePicker
              selected={deliveryDate}
              onChange={(date) => setDeliveryDate(date)}
              dateFormat="yyyy-MM-dd HH:mm:ss"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15} // Intervalo de minutos para la selección de hora
              timeCaption="Hora"
            />
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
