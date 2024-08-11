import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ModalCompra from '../components/Modales/ModalCompra';
import * as Constantes from '../utils/constantes';
import CustomDrawer from '../../src/tabNavigator/CustomDrawer';
import Constants from 'expo-constants';
import NavBarGris from '../components/topBarGris/navBarGris';
import Footer from '../components/Footer/Footer';
import ProductoCard from '../components/Productos/ProductoCard';

export default function Productos({ navigation }) {
    // Constante IP del servidor
    const ip = Constantes.IP;
    // Estado para almacenar los productos
    const [dataProductos, setDataProductos] = useState([]);

    const [dataCategorias, setDataCategorias] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [idProductoModal, setIdProductoModal] = useState('');
    // Estado para almacenar el nombre del producto en el modal de compra
    const [nombreProductoModal, setNombreProductoModal] = useState('');
    // Estado para almacenar el índice de la imagen actual del carrusel
    const [currentIndex, setCurrentIndex] = useState(0);

    const volverInicio = () => {
        setDrawerVisible(true);
    };

    // Función para manejar la compra de un producto
    const handleCompra = (nombre, id) => {
        setModalVisible(true);
        setIdProductoModal(id);
        setNombreProductoModal(nombre);
    };
    
    const handleValoracion = (idProducto) => {
        navigation.navigate('CommentsProduct', {idProducto: idProducto})

        console.log(idProducto)
    };

    // Función para obtener los productos de una categoría
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

    // Función para obtener las categorías
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

    // Efecto para obtener los productos y categorías al cargar el componente
    useEffect(() => {
        getProductos();
        getCategorias();
    }, []);

    // Crear un array de imágenes para el carrusel
    const imagenes = [
        require('../img/imagenvinoB.png'),
        require('../img/vinito.png')
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
            {/* NavBar gris */}
            <NavBarGris volverInicio={volverInicio} />

            {/* Drawer personalizado */}
            <CustomDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                navigation={navigation}
            />

            {/* Modal de compra */}
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
                            nombreProducto={item.nombre_producto}
                            descripcionProducto={item.descripcion_producto}
                            precioProducto={item.precio_producto}
                            existenciasProducto={item.existencias_producto}
                            descuentoProducto={item.descuento_producto}
                            accionBotonProducto={() => handleCompra(item.nombre_producto, item.id_producto)}
                            accionBotonProducto2={() => handleValoracion(item.id_producto)}
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

                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.scrollContainer}
                                >
                                    {dataCategorias.map((categoria) => (
                                        <TouchableOpacity
                                            key={categoria.id_categoria}
                                            style={styles.categoriaItem}
                                            onPress={() => getProductos(categoria.id_categoria)}
                                        >
                                            <Text style={styles.categoriaText}>{categoria.nombre_categoria}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </>
                    }
                />
                <Footer />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    containerFlat: {
        flex: 1
    },
    scrollContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#6D0E0E',
    },
    categoriaItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 6,
    },
    categoriaText: {
        color: 'white',
        fontWeight: 'bold',
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
        fontWeight: 'bold',      // letra
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
        width: '100%',
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
    iconButton: {
        marginTop: 20, // Agrega el margen superior al icono
    },
});
