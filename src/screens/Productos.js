import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TopBar from '../components/topBar/topBar';
import ProductoCard from '../components/Productos/ProductoCard';
import ModalCompra from '../components/Modales/ModalCompra';
import * as Constantes from '../utils/constantes';
import CustomDrawer from '../../src/tabNavigator/CustomDrawer';
import Buttons from '../components/Buttons/Button';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';

export default function Productos({ navigation }) {
    const ip = Constantes.IP;
    const [dataProductos, setDataProductos] = useState([]);
    const [dataCategorias, setDataCategorias] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [idProductoModal, setIdProductoModal] = useState('');
    const [nombreProductoModal, setNombreProductoModal] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0); // Índice de la imagen actual

    const volverInicio = () => {
        setDrawerVisible(true);
    };
    const handleCompra = (nombre, id) => {
        setModalVisible(true);
        setIdProductoModal(id);
        setNombreProductoModal(nombre);
    };

    const getProductos = async (idCategoriaSelect = 1) => {
        try {
            if (idCategoriaSelect <= 0) {
                return;
            }
            const formData = new FormData();
            formData.append('idCategoria', idCategoriaSelect);
            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/productos.php?action=readProductosCategoria`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                setDataProductos(data.dataset);
            } else {
                Alert.alert('Error productos', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar los productos');
        }
    };

    const getCategorias = async () => {
        try {
            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/categorias.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataCategorias(data.dataset);
            } else {
                Alert.alert('Error categorias', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las categorias');
        }
    };

    const handleCategoriaChange = (itemValue, itemIndex) => {
        setSelectedCategoria(itemValue);
    };

    useEffect(() => {
        getProductos();
        getCategorias();
    }, []);

    const irCarrito = () => {
        navigation.navigate('Carrito');
    };

    // Crear un array de imágenes
    const imagenes = [
        require('../img/imagenvinoB.png'),
        require('../img/vinito.png'),
        require('../img/vinoss.png')
    ];

    // Funciones para manejar la navegación del carrusel
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1));
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Image
                    source={require('../img/logoe.png')}
                    style={styles.image}
                />
                <TouchableOpacity onPress={volverInicio}>
                    <FontAwesome name="bars" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <CustomDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                navigation={navigation}
            />

            <ModalCompra
                visible={modalVisible}
                cerrarModal={setModalVisible}
                nombreProductoModal={nombreProductoModal}
                idProductoModal={idProductoModal}
                cantidad={cantidad}
                setCantidad={setCantidad}
            />
            

            <SafeAreaView style={styles.containerFlat}>
                {/* Aquí reemplazamos ScrollView por FlatList */}
                <FlatList
                    data={dataProductos}
                    keyExtractor={(item) => item.id_producto}
                    renderItem={({ item }) => (
                        <ProductoCard
                            ip={ip}
                            imagenProducto={item.imagen_producto}
                            idProducto={item.id_producto}
                            nombreProducto={item.nombre_producto}
                            descripcionProducto={item.descripcion_producto}
                            precioProducto={item.precio_producto}
                            existenciasProducto={item.existencias_producto}
                            accionBotonProducto={() => handleCompra(item.nombre_producto, item.id_producto)}
                        />
                    )}
                    // Esta es la adición para permitir el desplazamiento
                    ListHeaderComponent={
                        <>
                            {/* Carrusel */}
                            <View style={styles.carouselContainer}>
                                <TouchableOpacity onPress={prevImage}>
                                    <FontAwesome name="chevron-left" size={24} color="black" />
                                </TouchableOpacity>
                                <Image
                                    source={imagenes[currentIndex]}
                                    style={styles.imagen2}
                                />
                                <TouchableOpacity onPress={nextImage}>
                                    <FontAwesome name="chevron-right" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.categoryContainer}>
                                <Text style={styles.subtitle}>
                                    Filtre por categoría de vinos
                                </Text>

                                <View style={styles.pickerContainer}>
                                    <RNPickerSelect
                                        style={{ inputAndroid: styles.picker }}
                                        onValueChange={(value) => getProductos(value)}
                                        placeholder={{ label: 'Selecciona una categoría...', value: null }}
                                        items={dataCategorias.map(categoria => ({
                                            label: categoria.nombre_categoria,
                                            value: categoria.id_categoria,
                                        }))}
                                    />
                                </View>
                            </View>
                        </>
                    }
                />

                {/* View con fondo negro */}
                <View style={styles.bottomView}>
                    <View style={styles.bottomContent}>
                        <Image
                            source={require('../img/equipod.png')}
                            style={styles.imagen3}
                        />
                        {/* Contenido del View */}
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Equipo Desarrollador</Text>
                            <FlatList
                                data={[
                                    'Iván Daniel Salguero Esperanza',
                                    'Ricardo Daniel De León Cruz',
                                    'Edgar Enrique Sacro García'
                                ]}
                                renderItem={({ item }) => (
                                    <View style={styles.listItem}>
                                        <FontAwesome name="check-square" size={18} color="white" style={styles.icon} />
                                        <Text style={styles.textItem}>{item}</Text>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
}
    const styles = StyleSheet.create({
        containerFlat: {
            flex: 1
        },
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
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
            marginTop: 20
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 16,
            color: '#5C3D2E',
        },
        subtitle: {
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 10,
            color: '#5C3D2E',
            marginTop: 20
        },
        categoryContainer: {
            alignItems: 'center', // Alinea horizontalmente el texto y el picker
        },
        pickerContainer: {
            width: '90%', // Ancho del contenedor del picker
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 5,
            marginBottom: 10,
            borderColor: '#6D0E0E',
            borderWidth: 2,
            backgroundColor: '#F5F5F5',
        },
        picker: {
            color: '#322C2B',
        },
        cartButton: {
            flexDirection: 'row',
            backgroundColor: '#6D0E0E',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        cartButtonText: {
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            marginLeft: 10,
        },
        imagen2: {
            width: "100%",
            height: "100%",
            flex: 1
        },
        carouselContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: "98%",
            height: 220, // Ajusta la altura del carrusel aquí
            marginTop: 0.5
        },
        bottomView: {
            width: '80%',
            height: 120,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center'
        },
        bottomContent: {
            flexDirection: 'row',
            alignItems: 'center',
            width: 390
        },
        imagen3: {
            width: 97,
            height: 100,
            marginRight: 10, // Ajusta el margen derecho
            marginLeft: 25
        },
        textContainer: {
            marginLeft: 10,
        },
        text: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 10
        },
        textItem: {
            color: 'white',
        },
        listItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            marginRight: 5,
        },
    });


