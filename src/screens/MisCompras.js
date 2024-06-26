// MisCompras.js
import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, Alert, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ModalValoracion from '../components/Modales/ModalValoracion'; // Importa el ModalValoracion
import * as Constantes from '../utils/constantes';
import NavBarGris from '../components/topBarGris/navBarGris';
import ComprasViews from '../components/Compras/ComprasViews';
import Footer from '../components/Footer/Footer';
import CustomDrawer from '../../src/tabNavigator/CustomDrawer';

export default function MisCompras({ navigation }) {
    const ip = Constantes.IP;
    const [datCompras, setDataCompras] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [idDetalleModal, setIdDetalleModal] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setComentario] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const volverInicio = () => {
        setDrawerVisible(true);
    };

    const handleCompra = (id) => {
        setModalVisible(true);
        setIdDetalleModal(id);
    };

    const getCompras = async () => {
        try {
            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/ordenes.php?action=myOrders`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataCompras(data.dataset);
            } else {
                Alert.alert('Error al cargar tus compras', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las compras');
        }
    };

    const getComprasSearch = async () => {
        try {
            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/ordenes.php?action=searchOrders&search=${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataCompras(data.dataset);
            } else {
                Alert.alert('Error al cargar tus compras', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al buscar las compras');
        }
    };

    useEffect(() => {
        if (searchTerm.trim() === '') {
            getCompras();
        } else {
            getComprasSearch();
        }
    }, [searchTerm]);

    return (
        <View style={styles.container}>
            <NavBarGris volverInicio={volverInicio} />

            <CustomDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                navigation={navigation}
            />

            <SafeAreaView style={styles.containerFlat}>
                <View style={styles.titleContainer}>
                    <Text style={styles.text1}>Mis compras</Text>
                    <View style={styles.searchContainer}>
                        <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChangeText={text => setSearchTerm(text)}
                        />
                    </View>
                </View>
                <FlatList
                    data={datCompras}
                    keyExtractor={(item) => item.id_detalle}
                    renderItem={({ item }) => {
                        const precioTotal = ((item.precio_producto * item.cantidad_producto) - (item.precio_producto * item.cantidad_producto * item.descuento_producto / 100)).toFixed(2);

                        return (
                            <ComprasViews
                                ip={ip}
                                idDetalle={item.id_detalle}
                                idOrden={item.id_orden}
                                imagenProducto={item.imagen_producto}
                                nombreProducto={item.nombre_producto}
                                precioProducto={item.precio_producto}
                                cantidad={item.cantidad_producto}
                                descuentoProducto={item.descuento_producto}
                                precioTotal={precioTotal}
                                fechaCompra={item.fecha_registro}
                                estado={item.estado_orden}
                                accionBotonCompras={() => handleCompra(item.id_detalle)}
                            />
                        );
                    }}
                    ListHeaderComponent={<></>}
                />
                <Footer />
            </SafeAreaView>

            {/* Agrega el ModalValoracion aquí */}
            <ModalValoracion
                visible={modalVisible}
                cerrarModal={() => setModalVisible(false)}
                idDetalle={idDetalleModal}
                calificacion={calificacion}
                comentario={comentario}
            />
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
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    text1: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
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
        marginRight: 10,
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '90%'
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
});
