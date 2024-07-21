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
import SignUp from '../screens/SignUp';
import MisCompras from '../screens/MisCompras';
import Comments from '../screens/Comments';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Sesion" // Establece Sesion como la primera pantalla
            screenOptions={({ route }) => ({
                headerShown: false, // Oculta el header
                drawerActiveTintColor: '#6D0E0E', // Color de los íconos activos
                drawerInactiveTintColor: '#000', // Color de los íconos inactivos
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
                    } else if (route.name === 'Sesion') {
                        iconName = focused ? 'person' : 'person-outline';
                    }else if (route.name === 'SignUp') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    else if (route.name === 'CommentsProduct') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} color={color} size={size} />;
                },
            })}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{ 
                    title: 'Inicio',
                    headerShown: false, // Oculta el título de la pantalla
                }}
            />
            <Drawer.Screen
                name="Productos"
                component={Productos}
                options={{ 
                    title: 'Productos',
                    headerShown: false, // Oculta el título de la pantalla
                }}
            />
            <Drawer.Screen
                name="CommentsProduct"
                component={Comments}
                options={{ 
                    title: 'CommentsProduct',
                    headerShown: false, // Oculta el título de la pantalla
                }}
            />
            <Drawer.Screen
                name="Carrito"
                component={Carrito}
                options={{ 
                    title: 'Carrito',
                    headerShown: false, // Oculta el título de la pantalla
                }}
            />
            <Drawer.Screen
                name="MisCompras"
                component={MisCompras}
                options={{ 
                    title: 'Compras',
                    
                }}
            />
            <Drawer.Screen
                name="UpdateUser"
                component={UpdateUser}
                options={{ 
                    title: 'Actualizar Usuario',
                    headerShown: false, // Oculta el título de la pantalla
                }}
            />
            <Drawer.Screen
                name="Sesion"
                component={Sesion}
                options={{ 
                    title: 'Iniciar Sesión',
                    drawerItemStyle: { display: 'none' }, // Ocultar este ítem del drawer
                    headerShown: false, // Oculta el título de la pantalla
                }}
            />
            <Drawer.Screen
                name="SignUp"
                component={SignUp}
                options={{ 
                    title: 'Registrarse',
                    drawerItemStyle: { display: 'none' }, // Ocultar este ítem del drawer
                    headerShown: false, // Oculta el título de la pantalla
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
