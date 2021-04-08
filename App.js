import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { setUserDetails } from './src/store/actions/UserActions';
import auth from '@react-native-firebase/auth';
import Auth from './src/screens/Auth/Auth';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {

  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      dispatch(setUserDetails(user.uid))
    }
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber;
  }, []);

  if (user) {
    return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    );
  } else {
    return <Auth />
  }
};

export default App;
