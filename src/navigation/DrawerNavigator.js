import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Categories from '../screens/Categories/Categories';
import Filters from '../screens/Filters/Filters';
import StackNavigator from '../navigation/StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Categories" component={StackNavigator} />
            <Drawer.Screen name="Filters" component={Filters} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;