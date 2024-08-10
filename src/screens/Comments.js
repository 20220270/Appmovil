import React, { useState, useEffect } from 'react';
import {  StyleSheet, Text, View, SafeAreaView, Alert, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Importa useNavigation
import * as Constantes from '../utils/constantes';
import NavBarGris from '../components/topBarGris/navBarGris';
import Footer from '../components/Footer/Footer';
import CustomDrawer from '../../src/tabNavigator/CustomDrawer';
import Comments from '../components/CommentsCards/CommentsCards';

const CommentsProduct = () => {
    const ip = Constantes.IP;
    const route = useRoute();
    const navigation = useNavigation(); // Usa useNavigation para obtener el objeto de navegación

    const { idProducto } = route.params;

    const [drawerVisible, setDrawerVisible] = useState(false);
    const [dataComments, setDataComments] = useState([]);

    const volverInicio = () => {
        setDrawerVisible(true);
    };

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

    useEffect(() => {
        getValoraciones(idProducto);
    }, [idProducto]);

    return (
        <View style={styles.container}>
            <NavBarGris volverInicio={volverInicio} />

            <SafeAreaView style={styles.containerFlat}>
                <View style={styles.titleContainer}>
                    <Text style={styles.text1}>Valoraciones</Text>
                </View>

                <CustomDrawer
                    visible={drawerVisible}
                    onClose={() => setDrawerVisible(false)}
                    navigation={navigation}
                />
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
    // Otros estilos...
});

export default CommentsProduct;
