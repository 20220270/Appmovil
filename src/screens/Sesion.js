
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import Input from '../components/Inputs/Input';
import Buttons from '../components/Buttons/Button';
import TopBar from '../components/topBar/topBar';
import * as Constantes from '../utils/constantes';


export default function Sesion({ navigation }) {
  const ip = Constantes.IP;

  // Estados para manejar la visibilidad de la contraseña, usuario y contraseña
  const [isContra, setIsContra] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  // Función para validar si hay una sesión activa y, si es así, cerrarla
  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
  
      const data = await response.json();
  
      if (data.status === 1) {
        cerrarSesion();
        console.log("Se eliminó la sesión");
      } else {
        console.log("No hay sesión activa");
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  };

  // Función para cerrar la sesión
  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada");
      } else {
        console.log('No se pudo eliminar la sesión');
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
    }
  };

  // Función para manejar el inicio de sesión
  const handlerLogin = async () => {
    try {
        const formData = new FormData();
        formData.append('correoCliente', usuario);
        formData.append('claveCliente', contrasenia);

        const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=logIn`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.status) {
            setContrasenia('');
            setUsuario('');
            
            navigation.navigate('Home'); // Navega a la pantalla Home dentro del draw
        } else {
            console.log(data);
            Alert.alert('Error sesión', data.error);
        }
    } catch (error) {
        console.error(error, "Error desde Catch");
        Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const olvidarClave = async () => {
    navigation.navigate('RecuperarClaveCorreo');
  }

  // Navegar a la pantalla de registro
  const irRegistrar = async () => {
    navigation.navigate('SignUp');
  };

  // Validar sesión al cargar el componente
  useEffect(() => { validarSesion() }, []);

  return (
    <View style={styles.container}>
      <TopBar />
      <Image
        source={require('../img/logoe.png')}
        style={styles.image}
      />
      <Text style={styles.texto}>Iniciar Sesión</Text>
      <Input
        placeHolder='Usuario'
        setValor={usuario}
        setTextChange={setUsuario}
      />
      <Input
        placeHolder='Contraseña'
        setValor={contrasenia}
        setTextChange={setContrasenia}
        contra={isContra} />
      <Buttons
        textoBoton='Iniciar Sesión'
        accionBoton={handlerLogin} />
      <TouchableOpacity onPress={irRegistrar}><Text style={styles.textRegistrar}>¿No tienes cuenta? Regístrate aquí</Text></TouchableOpacity>
      <TouchableOpacity onPress={olvidarClave}><Text style={styles.textRegistrar}>¿Olvidaste tu contraseña?</Text></TouchableOpacity>
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
    fontSize: 15,
    marginTop: 10
  },
  image: {
    width: 200,
    height: 75,
    marginBottom: 19,
    marginRight: 35
  },
});
