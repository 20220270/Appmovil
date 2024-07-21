import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, Alert, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as Constantes from '../utils/constantes';
import NavBarGris from '../components/topBarGris/navBarGris';
import Footer from '../components/Footer/Footer';
import CustomDrawer from '../../src/tabNavigator/CustomDrawer';
import Comments from '../components/CommentsCards/CommentsCards';

const CommentsProduct = () => {
    // Constante IP del servidor
    const ip = Constantes.IP;

    const route = useRoute();
    const {idProducto } = route.params;

    // Estado para controlar la visibilidad del drawer
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [dataComments, setDataComments] = useState([]);

    // Función para mostrar el drawer
    const volverInicio = () => {
        setDrawerVisible(true);
    };

    // Función para obtener las valoraciones de los productos
    const getValoraciones = async (idproducto) => {
        try {
            if (idProducto <= 0) {
                return;
            }
            const formData = new FormData();
            formData.append('idProducto', idproducto);
            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/productos.php?action=commentsProduct`, {
                method: 'POST',
                body: formData
            });

            

            const data = await response.json();


            if (data.status) {
                setDataComments(data.dataset);
            } else {
                Alert.alert('Error valoraciones', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar las valoraciones');
        }
    };


    // Efecto para obtener las compras del usuario al cargar el componente
    useEffect(() => {
        getValoraciones(idProducto);
    });

    return (
        <View style={styles.container}>
            {/* Barra de navegación gris */}
            <NavBarGris volverInicio={volverInicio} />

            <SafeAreaView style={styles.containerFlat}>
                <View style={styles.titleContainer}>
                    <Text style={styles.text1}>Valoraciones</Text>
                    {/* Contenedor de búsqueda */}
                    
                </View>
                {/* Lista de compras */}
                <FlatList
                    data={dataComments}
                    keyExtractor={(item) => item.id_producto}
                    renderItem={({ item }) => {
                        return (
                            <Comments
                                ip={ip}
                                idProducto={item.id_producto}
                                idValoracion={item.id_valoracion}
                                comentarioProducto={item.comentario_producto}
                                calificacionProducto={item.calificacion_producto}
                                nombreCliente={item.Nombre}
                                fechaValoracion={item.fecha_valoracion}
                            />
                        );
                    }}
                    ListHeaderComponent={<></>}
                />
                {/* Pie de página */}
                <Footer />
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

export default CommentsProduct;
