import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { setUserDetails, signout } from './src/store/actions/UserActions';
import Header from './src/components/Header/Header';
import auth from '@react-native-firebase/auth';
import Auth from './src/screens/Auth/Auth';
import StackNavigator from './src/navigation/StackNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  // AUTO-LOGOUT:
  // let userSessionTimeout = null;
  // const authStateChanged = async (user) => {
  //   if (user === null && userSessionTimeout) {
  //     clearTimeout(userSessionTimeout);
  //     userSessionTimeout = null;
  //   } else {
  //     try {
  //       const idTokenResult = await auth().currentUser.getIdTokenResult();
  //       const authTime = idTokenResult.claims.auth_time * 1000;
  //       const sessionDurationInMilliseconds = 60 * 60 * 1000;
  //       const expirationInMilliseconds = sessionDurationInMilliseconds - (Date.now() - authTime);
  //       userSessionTimeout = setTimeout(() => dispatch(signout()), expirationInMilliseconds);
  //       dispatch(setUserDetails(user.uid))
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   setUserData(user)
  // }

  // NO AUTO-LOGOUT:
  const authStateChanged = user => {
    if (user) {
      dispatch(setUserDetails(user.uid))
    }
    setUserData(user);
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide()
    }
    const subscriber = auth().onAuthStateChanged(authStateChanged);
    return () => subscriber;
  }, []);

  if (userData === undefined) {
    return (
      <View style={styles.blackScreen}>
        <Header
          headerBackground={'transparent'}
          statusBarColor={'transparent'}
          iosBarStyle={'light-content'}
        />
      </View>
    )
  } else if (userData) {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  } else {
    return <Auth />
  }
};

const styles = StyleSheet.create({
  blackScreen: {
    flex: 1,
    backgroundColor: 'black'
  },
  header: {
    backgroundColor: 'black',
    borderBottomWidth: 0
  }
})


export default App;