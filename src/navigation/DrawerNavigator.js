import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import StackNavigator from '../navigation/StackNavigator';
import SignupLogin from '../screens/SignupLogin/SignupLogin';
import auth from '@react-native-firebase/auth';
import { setUserDetails } from '../store/actions/UserActions';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    const [user, setUser] = useState();
    const dispatch = useDispatch();

    const onAuthStateChanged = user => {
        console.log(user)
        if(user) {
            dispatch(setUserDetails(user.uid))
        }
        setUser(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (!user) {
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