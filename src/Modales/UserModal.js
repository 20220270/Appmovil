
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Buttons from '../components/Buttons/Button';

const UserModal = ({
    isVisible,
    onClose,
    onSubmit,
    nombre, setNombre,
    apellido, setApellido,
    correo, setCorreo,
    direccion, setDireccion,
    dui, setDui,
    telefono, setTelefono,
    clave, setClave,
    confirmarClave, setConfirmarClave,
    modalType
}) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.modalContent}>
                {modalType === 'create' && <Text style={styles.modalTitle}>Crear Usuario</Text>}
                {modalType === 'edit' && <Text style={styles.modalTitle}>Editar Usuario</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={text => setNombre(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={text => setApellido(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    value={correo}
                    onChangeText={text => setCorreo(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dirección"
                    value={direccion}
                    onChangeText={text => setDireccion(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="DUI"
                    value={dui}
                    onChangeText={text => setDui(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={telefono}
                    onChangeText={text => setTelefono(text)}
                />
                {modalType === 'create' && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            secureTextEntry
                            value={clave}
                            onChangeText={text => setClave(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar Contraseña"
                            secureTextEntry
                            value={confirmarClave}
                            onChangeText={text => setConfirmarClave(text)}
                        />
                    </>
                )}

                <Buttons
                textoBoton="Actualizar datos"
                accionBoton={onSubmit}/>
                <Text style={styles.buttonText}>{modalType === 'create' ? 'Crear' : 'Editar'} Usuario</Text>
                
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#5C3D2E',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
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
    },
});

export default UserModal;
