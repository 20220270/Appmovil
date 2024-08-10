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
    // Estados para manejar la visibilidad del drawer y el modal
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Estados para almacenar los datos del usuario
    const [idCliente, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmar] = useState('');

    // Estado para manejar el tipo de modal (crear, editar o cambiar contraseña)
    const [modalType, setModalType] = useState('');

    // Estado para almacenar los datos del perfil del usuario
    const [profileData, setProfileData] = useState(null);

    // Constante que almacena la dirección IP del servidor
    const ip = Constantes.IP;

    // Función para obtener los datos del perfil del usuario desde el servidor
    const getProfileData = async () => {
        try {
            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=readProfile`, {
                method: 'GET',
                credentials: 'include' // Para enviar cookies con la solicitud
            });

            const data = await response.json();
            if (data.status) {
                // Si la solicitud es exitosa, se actualizan los estados con los datos del perfil
                setProfileData(data.dataset);
                setId(data.dataset.id_cliente);
                setNombre(data.dataset.nombre_cliente);
                setApellido(data.dataset.apellido_cliente);
                setCorreo(data.dataset.correo_cliente);
                setDireccion(data.dataset.direccion_cliente);
                setDui(data.dataset.dui_cliente);
                setTelefono(data.dataset.telefono_cliente);
            } else {
                // Si hay un error, se muestra una alerta
                Alert.alert('Error perfil', data.error);
            }
        } catch (error) {
            // Manejo de errores en caso de que la solicitud falle
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil');
        }
    };

    // Función para editar los datos del usuario
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

            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=editProfile`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Éxito', data.message);
                setIsModalVisible(false);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error al editar el usuario:', error);
            Alert.alert('Error', `Ocurrió un error al editar el usuario: ${error.message}`);
        }
    };

    // Función para cambiar la contraseña del usuario
    const handleChangePassword = async () => {
        try {
            const formData = new FormData();
            formData.append('claveActual', clave);
            formData.append('claveNueva', confirmarClave);
            formData.append('confirmarClave', confirmarClave);

            const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=changePassword`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Éxito', data.message);
                setIsModalVisible(false);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            Alert.alert('Error', `Ocurrió un error al cambiar la contraseña: ${error.message}`);
        }
    };

    // Función para abrir el modal de edición
    const openEditModal = () => {
        setModalType('edit');
        setIsModalVisible(true);
    };

    // Función para abrir el modal de cambio de contraseña
    const openChangePassword = () => {
        setModalType('password');
        setIsModalVisible(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalVisible(false);
    };

    // Función para manejar el envío del formulario según el tipo de modal
    const handleSubmit = () => {
        if (modalType === 'edit') {
            handleEditUser();
        } else if (modalType === 'password') {
            handleChangePassword();
        }
    };

    // Función para volver al inicio (mostrar el drawer)
    const volverInicio = () => {
        setDrawerVisible(true);
    };

    // Uso del hook useEffect para obtener los datos del perfil cuando el componente se monta
    useEffect(() => {
        getProfileData();
    }, []);

    //Componenete que se muestra
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
                    editable={!isModalVisible}
                    style={isModalVisible ? styles.inactivo : {}}
                />
                <Input
                    placeHolder='Apellido Cliente'
                    setValor={apellido}
                    setTextChange={setApellido}
                    editable={!isModalVisible}
                    style={isModalVisible ? styles.inactivo : {}}
                />
                <InputEmail
                    placeHolder='Email Cliente'
                    setValor={correo}
                    setTextChange={setCorreo}
                    editable={!isModalVisible}
                    style={isModalVisible ? styles.inactivo : {}}
                />
                <InputMultiline
                    placeHolder='Dirección Cliente'
                    setValor={direccion}
                    valor={direccion}
                    setTextChange={setDireccion}
                    editable={!isModalVisible}
                    style={isModalVisible ? styles.inactivo : {}}
                />
                <MaskedInputDui
                    dui={dui}
                    setDui={setDui}
                    editable={!isModalVisible}
                    style={isModalVisible ? styles.inactivo : {}}
                />
                <MaskedInputTelefono
                    telefono={telefono}
                    setTelefono={setTelefono}
                    editable={!isModalVisible}
                    style={isModalVisible ? styles.inactivo : {}}
                />


                <Buttons
                    textoBoton="Editar datos"
                    accionBoton={openEditModal}
                />
                <Buttons
                    textoBoton="Cambiar contraseña"
                    accionBoton={openChangePassword}
                />
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
        color: '#322C2B',
        fontWeight: '900',
        fontSize: 20,
        marginTop: 100
    },
    inactivo: {
        opacity: 0.5,  // Cambia la opacidad para indicar que está inactivo
        pointerEvents: 'none'  // Evita que responda a eventos de toque
    }
});
