import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import StackNavigator from '../navigation/StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={StackNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;