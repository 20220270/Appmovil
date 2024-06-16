// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Productos';
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';
import UpdateUser from '../screens/UpdateUser';
import Sesion from '../screens/Sesion'; // Importa la pantalla de Sesion

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Sesion" // Establece Sesion como la primera pantalla
            screenOptions={({ route }) => ({
                headerShown: false, // Oculta el header
                drawerActiveTintColor: '#AF8260', // Color de los íconos activos
                drawerInactiveTintColor: '#B99873', // Color de los íconos inactivos
                drawerStyle: { backgroundColor: '#FFF' }, // Estilo del drawer
                drawerIcon: ({ focused, color, size }) => { // Función que define el ícono del drawer
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Productos') {
                        iconName = focused ? 'cafe' : 'cafe-outline';
                    } else if (route.name === 'Carrito') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'UpdateUser') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} color={color} size={size} />;
                },
            })}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{ title: 'Inicio' }}
            />
            <Drawer.Screen
                name="Productos"
                component={Productos}
                options={{ title: 'Productos' }}
            />
            <Drawer.Screen
                name="Carrito"
                component={Carrito}
                options={{ title: 'Carrito' }}
            />
            <Drawer.Screen
                name="UpdateUser"
                component={UpdateUser}
                options={{ title: 'Actualizar Usuario' }}
            />
            <Drawer.Screen
                name="Sesion"
                component={Sesion}
                options={{ title: 'Iniciar Sesión' }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
