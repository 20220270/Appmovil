import React, { useEffect, useState } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constantes from '../utils/constantes';

const ip = Constantes.IP;

const handleLogout = async (navigation) => {
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

const CustomDrawer = ({ visible, onClose, navigation }) => {
  const [nombre, setNombre] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.username); // Asegúrate de acceder al campo correcto
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener el usuario');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.drawerOverlay}>
        <View style={styles.drawer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
              onClose();
            }}
          >
            <Text style={styles.drawerItem}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Productos');
              onClose();
            }}
          >
            <Text style={styles.drawerItem}>Menú</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MisCompras');  // Navega a la pantalla 'MisCompras'
              onClose();
            }}
          >
            <Text style={styles.drawerItem}>Mis compras</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleLogout(navigation);
              onClose();
            }}
          >
            <Text style={styles.drawerItem}>Cerrar sesión</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.updateUserButton}
              onPress={() => {
                navigation.navigate('UpdateUser');
                onClose();
              }}
            >
              <Text style={styles.updateUserText}>{nombre ? nombre : 'Actualizar Usuario'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => {
                navigation.navigate('Carrito');
                onClose();
              }}
            >
              <FontAwesome name="shopping-cart" size={24} color="white" />
              <Text style={styles.cartButtonText}>Ir al carrito</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  drawer: {
    backgroundColor: '#E9E8E8',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  updateUserButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  updateUserText: {
    fontSize: 14,
  },
  cartButton: {
    flexDirection: 'row',
    backgroundColor: '#6D0E0E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
  },
});

export default CustomDrawer;
