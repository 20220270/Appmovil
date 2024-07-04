// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Buttons/Button';
import CarritoCard from '../components/CarritoCard/CarritoCard';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';
import { FontAwesome } from '@expo/vector-icons';
import CustomDrawer from '../../src/tabNavigator/CustomDrawer';

const Carrito = ({ navigation }) => {
  // Estado para almacenar los detalles del carrito
  const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
  // Estado para el ID del detalle a editar
  const [idDetalle, setIdDetalle] = useState(null);
  // Estado para la cantidad del producto en el carrito
  const [cantidadProductoCarrito, setCantidadProductoCarrito] = useState(0);
  // Estado para controlar la visibilidad del modal de edición de cantidad
  const [modalVisible, setModalVisible] = useState(false);
  // Estado para controlar la visibilidad del drawer personalizado
  const [drawerVisible, setDrawerVisible] = useState(false);
  // IP del servidor
  const ip = Constantes.IP;

  // Función para navegar a la pantalla de productos
  const backProducts = () => {
    navigation.navigate('Productos');
  };

  // Efecto para cargar los detalles del carrito cada vez que la pantalla gana foco
  useFocusEffect(
    React.useCallback(() => {
      getDetalleCarrito();
    }, [])
  );

  // Función para mostrar el drawer
  const volverInicio = () => {
    setDrawerVisible(true);
  };

  // Función para obtener los detalles del carrito desde el servidor
  const getDetalleCarrito = async () => {
    try {
      const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/ordenes.php?action=readDetail`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data, "Data desde getDetalleCarrito");
      if (data.status) {
        setDataDetalleCarrito(data.dataset);
      } else {
        console.log("No hay detalles del carrito disponibles");
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar las categorías');
    }
  };

  // Función para finalizar el pedido
  const finalizarPedido = async () => {
    try {
      const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/ordenes.php?action=finishOrder`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert("Se finalizó la compra correctamente");
        setDataDetalleCarrito([]);
        navigation.navigate('Productos', { screen: 'Productos' });
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
    }
  };

  // Función para manejar la edición de un detalle del carrito
  const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
    setModalVisible(true);
    setIdDetalle(idDetalle);
    setCantidadProductoCarrito(cantidadDetalle);
  };

  // Función para renderizar cada item en la lista del carrito
  const renderItem = ({ item }) => (
    <CarritoCard
      item={item}
      cargarCategorias={getDetalleCarrito}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      setCantidadProductoCarrito={setCantidadProductoCarrito}
      cantidadProductoCarrito={cantidadProductoCarrito}
      idDetalle={idDetalle}
      setIdDetalle={setIdDetalle}
      accionBotonDetalle={handleEditarDetalle}
      getDetalleCarrito={getDetalleCarrito}
      updateDataDetalleCarrito={setDataDetalleCarrito} // Nueva prop para actualizar la lista
    />
  );

  // Función para calcular el total con descuento
  const calcularTotalConDescuento = () => {
    return dataDetalleCarrito.reduce((total, item) => {
      const subtotalConDescuento = (
        parseFloat(item.precio_producto) * parseFloat(item.cantidad_producto) -
        (parseFloat(item.precio_producto) * parseFloat(item.cantidad_producto) * parseFloat(item.descuento_producto) / 100)
      );
      return total + subtotalConDescuento;
    }, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {/* Barra superior con imagen y botón de menú */}
      <View style={styles.topBar}>
        <Image
          source={require('../img/logoe.png')}
          style={styles.image}
        />
        <TouchableOpacity onPress={volverInicio}>
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Drawer personalizado */}
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />

      {/* Modal para editar la cantidad de productos */}
      <ModalEditarCantidad
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        idDetalle={idDetalle}
        setIdDetalle={setIdDetalle}
        setCantidadProductoCarrito={setCantidadProductoCarrito}
        cantidadProductoCarrito={cantidadProductoCarrito}
        getDetalleCarrito={getDetalleCarrito}
      />

      <Text style={styles.title}>Carrito de Compras</Text>

      {/* Lista de detalles del carrito d*/}
      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_detalle.toString()}
          contentContainerStyle={{ paddingBottom: 100 }} // Para asegurar que los últimos elementos no estén ocultos detrás de los botones
        />
      ) : (
        <Text style={styles.titleDetalle}>No hay detalles del carrito disponibles.</Text>
      )}

      {/* Muestra el total con descuento si hay items en el carrito */}
      {dataDetalleCarrito.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total de la compra: ${calcularTotalConDescuento()}</Text>
        </View>
      )}

      {/* Botones para finalizar pedido y regresar a productos */}
      <View style={styles.containerButtons}>
        {dataDetalleCarrito.length > 0 && (
          <Buttons
            textoBoton='Finalizar Pedido'
            accionBoton={finalizarPedido}
          />
        )}
        <Buttons
          textoBoton='Regresar a productos'
          accionBoton={backProducts}
        />
      </View>
    </View>
  );
};

export default Carrito;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#E9E8E8',
    height: 60 + Constants.statusBarHeight,
    width: '100%',
  },
  image: {
    width: 90,
    height: 35,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#000',
    marginTop: 70,
  },
  titleDetalle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 17,
  },
  totalText: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});
