import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import NavBarGris from '../components/topBarGris/navBarGris';
import CustomDrawer from '../../src/tabNavigator/CustomDrawer';


export default function UpdateUser({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const volverInicio = () => {
    setDrawerVisible(true);
  };

  return (
    <View style={styles.container}>
      <NavBarGris volverInicio={volverInicio} />
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
      <Text style={styles.title}>Actualizar Usuario</Text>
      <Text style={styles.subtitle}>PROXIMAMENTE ...</Text>
      <TouchableOpacity style={styles.button} onPress={volverInicio}>
        <Text style={styles.buttonText}>Volver a Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#6D0E0E', // Brown color for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
    color: '#6D0E0E', // Brown color for the subtitle
  },
  button: {
    backgroundColor: '#6D0E0E', // Brown color for the button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
