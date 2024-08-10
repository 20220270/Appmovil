import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Input from '../components/Inputs/Input';
import Buttons from '../components/Buttons/Button';
import TopBar from '../components/topBar/topBar';
import * as Constantes from '../utils/constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ActualizarClave({ navigation }) {
    const ip = Constantes.IP;
    const [claveNueva, setClaveNueva] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [correo, setCorreo] = useState(''); // Estado para almacenar el correo electrónico

    useEffect(() => {
        const obtenerDatos = async () => { //Obtiene los datos del usuario
          const storedEmail = await AsyncStorage.getItem('email');
          if (storedEmail) {
            setCorreo(storedEmail);
          }
        };
        obtenerDatos();
      }, []);

      // Función para actualizar la contraseña
    const Actualizar = async () => {
        const FORM = new FormData();
        FORM.append('claveCliente', claveNueva);
        FORM.append('confirmarClave', confirmarClave);
        FORM.append('IngreseCorreo', correo);
        try {
          const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=updateClave`, { // Manda a llamar la acción que actualiza la clave
            method: 'POST',
            body: FORM
          });
    
          const responseText = await response.text();
          console.log('Response Text:', responseText);
          const DATA = JSON.parse(responseText);
          if (DATA.status) {
            Alert.alert('Éxito', 'Se ha actualizado la contraseña');
            navigation.navigate('Sesion');
          } else {
            Alert.alert('Error', `Error en la solicitud: ${DATA.error}`);
          }
        } catch (error) {
          console.error('Error desde Catch', error);
          Alert.alert('Error', `Ocurrió un error: ${error.message}`);
        }
      };
      

      // Navegación
    const Regresar = () => {
        navigation.navigate('RecuperarClaveCodigo');
      };

    return (
        <View style={styles.container}>
          <TopBar />
          <Image source={require('../img/logoe.png')} style={styles.image} />
          <Text style={styles.texto}>Actualizar contraseña</Text>
          
          <Input placeHolder="Clave nueva" 
          setValor={claveNueva} setTextChange={setClaveNueva} contra={true}/>
          <Input placeHolder="Confirmar clave" setValor={confirmarClave} setTextChange={setConfirmarClave} contra={true}/>
          <View>
            <Buttons textoBoton='Aceptar' accionBoton={Actualizar} />
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
        fontSize: 20,
        marginBottom: 40
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