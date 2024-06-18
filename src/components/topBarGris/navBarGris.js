import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';

const NavBarGris = ({ volverInicio }) => {
    return (
        <View style={styles.topBar}>
            <Image
                source={require('../../img/logoe.png')}
                style={styles.image}
            />
            <TouchableOpacity onPress={volverInicio}>
                <FontAwesome name="bars" size={24} color="black" style={styles.iconButton} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
    iconButton: {
        marginTop: 20, // Agrega el margen superior al icono
    },
});

export default NavBarGris;
