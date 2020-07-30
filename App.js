import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CocktailsNavigator from './src/navigation/CocktailsNavigator'

const App = () => {
  return (
    <NavigationContainer>    
      <CocktailsNavigator />
    </NavigationContainer>
  );
};

export default App;
