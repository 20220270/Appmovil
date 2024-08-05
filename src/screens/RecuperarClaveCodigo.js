import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Input from '../components/Inputs/Input';
import Buttons from '../components/Buttons/Button';
import TopBar from '../components/topBar/topBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../utils/constantes';
import enviarEmail from '../utils/Email';

export default function RecuperarClaveCodigo({ navigation }) {
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setCorreo(storedEmail);
      }
    };
    obtenerDatos();
  }, []);

  const verificarCodigo = async () => {
    try {
      const storedCode = await AsyncStorage.getItem('verificationCode');
      if (codigoIngresado === storedCode) {
        Alert.alert('Éxito', 'El código es correcto');
        navigation.navigate('ActualizarClave');
      } else {
        Alert.alert('Error', 'El código es incorrecto');
      }
    } catch (error) {
      console.error('Error al obtener el código', error);
      Alert.alert('Error', 'No se pudo verificar el código');
    }
  };

  const ReenviarCodigo = async () => {
    const FORM = new FormData();
    FORM.append('IngreseCorreo', correo);
    try {
      const response = await fetch(`${Constantes.IP}/OinosDeLaVid/api/services/public/cliente.php?action=checkCorreo`, {
        method: 'POST',
        body: FORM
      });

      const responseText = await response.text();
      console.log('Response Text:', responseText);
      if (response.ok) {
        const DATA = JSON.parse(responseText);
        const CODIGO = generateRandomCode(6);
        const EMAIL_ENVIADO = await enviarEmail(CODIGO, correo, DATA.dataset.nombre_cliente);
        if (EMAIL_ENVIADO) {
          await AsyncStorage.setItem('verificationCode', CODIGO);
          Alert.alert('Éxito', 'Se ha enviado un nuevo código');
        } else {
          Alert.alert('Error', 'Ocurrió un error al enviar el correo');
        }
      } else {
        Alert.alert('Error', `Error en la solicitud: ${response.status}`);
      }
    } catch (error) {
      console.error('Error desde Catch', error);
      Alert.alert('Error', `Ocurrió un error: ${error.message}`);
    }
  };

  const Regresar = () => {
    navigation.navigate('RecuperarClaveCorreo');
  };

  function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <View style={styles.container}>
      <TopBar />
      <Image source={require('../img/logoe.png')} style={styles.image} />
      <Text style={styles.texto}>Verificar Código</Text>
      <TouchableOpacity><Text style={styles.textRegistrar}>Ingresa el código</Text></TouchableOpacity>
      <Input placeHolder="Código" setValor={codigoIngresado} setTextChange={setCodigoIngresado} />
      <View>
        <Buttons textoBoton='Verificar código' accionBoton={verificarCodigo} />
        <Buttons textoBoton='Reenviar código' accionBoton={ReenviarCodigo} />
        <Buttons textoBoton='Regresar' accionBoton={Regresar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#322C2B', fontWeight: '900',
    fontSize: 20
  },
  textRegistrar: {
    color: '#322C2B', fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 75,
    marginBottom: 19,
    marginRight: 35
  },
});
