import React from 'react';
import { useSelector } from 'react-redux'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import StackNavigator from '../navigation/StackNavigator';
import SignupLogin from '../screens/SignupLogin/SignupLogin';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    const userId = useSelector(state => state.user.userId)

    if (!userId) {
        return <SignupLogin />
    } else {
        return (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={StackNavigator} />
            </Drawer.Navigator>
        );
    }
}

export default DrawerNavigator;