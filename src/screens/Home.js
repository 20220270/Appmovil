import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import TopBar from '../components/topBar/topBar';

export default function Home({ navigation }) {
  // Estado para almacenar el nombre del usuario
  const [nombre, setNombre] = useState(null);
  // IP del servidor
  const ip = Constantes.IP;

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Sesion');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  // Función para navegar a la pantalla de productos
  const irActualizar = () => {
    navigation.navigate('Productos');
  };

  // Función para navegar a la pantalla de actualización de usuario
  const EditUser = () => {
    navigation.navigate('UpdateUser');
  };

  // Función para obtener los datos del usuario desde el servidor
  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.username); // Establece el nombre del usuario en el estado
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener el usuario');
    }
  };

  // Efecto para obtener el usuario al montar el componente
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* Barra superior personalizada */}
      <TopBar/>
      {/* Imagen del logo */}
      <Image
        source={require('../../assets/logoe.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Bienvenid@</Text>
      {/* Muestra el nombre del usuario */}
      <Text style={styles.subtitle}>
        {nombre ? nombre : 'No hay correo para mostrar'}
      </Text>
      {/* Botón para cerrar sesión */}
      <Buttons
        textoBoton='Cerrar Sesión'
        accionBoton={handleLogout}
      />
      {/* Botón para ver productos */}
      <Buttons
        textoBoton='Ver Productos'
        accionBoton={irActualizar}
      />
      {/* Botón para editar usuario */}
      <Buttons
        textoBoton='Editar Usuario'
        accionBoton={EditUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 250,
    height: 100,
    marginBottom: 10,
    marginRight: 40
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    borderRadius: 10,
    backgroundColor: "darkblue"
  },
  buttonText: {
    textAlign: 'center',
    color: "white"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Color marrón para el título
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Color marrón para el subtítulo
  },
});
