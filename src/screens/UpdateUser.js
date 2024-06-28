import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import NavBarGris from '../components/topBarGris/navBarGris';
import CustomDrawer from '../../src/tabNavigator/CustomDrawer';
import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import TopBar from '../components/topBar/topBar';
import * as Constantes from '../utils/constantes';
import UserModal from '../Modales/UserModal';
import Buttons from '../components/Buttons/Button';

export default function UpdateUser({ navigation }) {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [idCliente, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmar] = useState('');
    const [modalType, setModalType] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [selectedUser, setSelectedUser] = useState({});

    const ip = Constantes.IP;

    const getProfileData = async () => {
        try {
            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=readProfile`, {
                method: 'GET',
                credentials: 'include' // Para enviar cookies con la solicitud
            });

            const data = await response.json();
            if (data.status) {
                setProfileData(data.dataset);
                setId(data.dataset.id_cliente); // Asegúrate de obtener y establecer el idCliente
                setNombre(data.dataset.nombre_cliente);
                setApellido(data.dataset.apellido_cliente);
                setCorreo(data.dataset.correo_cliente);
                setDireccion(data.dataset.direccion_cliente);
                setDui(data.dataset.dui_cliente);
                setTelefono(data.dataset.telefono_cliente);
            } else {
                Alert.alert('Error perfil', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil');
        }
    };

    const handleEditUser = async () => {
        try {
            const formData = new FormData();
            formData.append('idCliente', idCliente);
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', correo);
            formData.append('direccionCliente', direccion);
            formData.append('duiCliente', dui);
            formData.append('telefonoCliente', telefono);

            // Añadir estos logs para depuración
            console.log('Enviando datos:', {
                idCliente,
                nombreCliente: nombre,
                apellidoCliente: apellido,
                correoCliente: correo,
                direccionCliente: direccion,
                duiCliente: dui,
                telefonoCliente: telefono,
            });

            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=editProfile`, {
                method: 'POST',
                body: formData
            });

            // Verificar si la respuesta es JSON antes de analizarla
            const responseText = await response.text();
            console.log('Respuesta del servidor:', responseText);

            try {
                const data = JSON.parse(responseText);
                if (data.status) {
                    Alert.alert('Éxito', data.message);
                    setIsModalVisible(false);
                } else {
                    Alert.alert('Error', data.error);
                }
            } catch (error) {
                throw new Error('La respuesta del servidor no es un JSON válido.');
            }
        } catch (error) {
            // Capturar el mensaje de error real
            console.error('Error al editar el usuario:', error);
            Alert.alert('Error', `Ocurrió un error al editar el usuario: ${error.message}`);
        }
    };

    const openEditModal = () => {
        setModalType('edit');
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = () => {
        if (modalType === 'edit') {
            handleEditUser();
        }
    };

    const volverInicio = () => {
        setDrawerVisible(true);
    };

    useEffect(() => {
        getProfileData(); // Llamar a la función para obtener los datos del perfil
    }, []);

    return (
        <View style={styles.container}>
            <NavBarGris volverInicio={volverInicio} />
            <CustomDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                navigation={navigation}
            />
            <TopBar />
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Datos del usuario</Text>
                <Input
                    placeHolder='Nombre Cliente'
                    setValor={nombre}
                    setTextChange={setNombre}
                />
                <Input
                    placeHolder='Apellido Cliente'
                    setValor={apellido}
                    setTextChange={setApellido}
                />
                <InputEmail
                    placeHolder='Email Cliente'
                    setValor={correo}
                    setTextChange={setCorreo}
                />
                <InputMultiline
                    placeHolder='Dirección Cliente'
                    setValor={direccion}
                    valor={direccion}
                    setTextChange={setDireccion}
                />
                <MaskedInputDui
                    dui={dui}
                    setDui={setDui}
                />
                <MaskedInputTelefono
                    telefono={telefono}
                    setTelefono={setTelefono}
                />

                <Buttons
                textoBoton="Desplegar datos"
                accionBoton={openEditModal}/>

                <UserModal
                    isVisible={isModalVisible}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                    nombre={nombre}
                    setNombre={setNombre}
                    apellido={apellido}
                    setApellido={setApellido}
                    correo={correo}
                    setCorreo={setCorreo}
                    direccion={direccion}
                    setDireccion={setDireccion}
                    dui={dui}
                    setDui={setDui}
                    telefono={telefono}
                    setTelefono={setTelefono}
                    clave={clave}
                    setClave={setClave}
                    confirmarClave={confirmarClave}
                    setConfirmarClave={setConfirmar}
                    modalType={modalType}
                />
            </ScrollView>
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
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        color: '#322C2B', fontWeight: '900',
        fontSize: 20,
        marginTop: 100
    },
    button: {
        backgroundColor: '#AF8260',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    }
});
