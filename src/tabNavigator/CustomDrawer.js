import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomDrawer = ({ visible, onClose, navigation }) => {
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
              navigation.navigate('Productos');
              onClose();
            }}
          >
            <Text style={styles.drawerItem}>Sobre nosotros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Productos');
              onClose();
            }}
          >
            <Text style={styles.drawerItem}>Mis compras</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Productos');
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
              <Text style={styles.updateUserText}>Actualizar Usuario</Text>
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
    fontSize: 18,
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
