import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import DrawerNavigation from './src/navigation/DrawerNavigator';

const App = () => {
  return (
    <NavigationContainer>    
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default App;
