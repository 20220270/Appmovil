// Footer.js
import React from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Footer = () => {
    return (
        <View style={styles.bottomView}>
            <View style={styles.bottomContent}>
                <Image
                    source={require('../../img/equipod.png')}
                    style={styles.imagen3}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Equipo Desarrollador</Text>
                    <FlatList
                        data={[
                            'Iván Daniel Salguero Esperanza',
                            'Ricardo Daniel De León Cruz',
                            'Edgar Enrique Sarco García'
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
    );
}

const styles = StyleSheet.create({
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
});

export default Footer;
