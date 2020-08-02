import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Categories from '../screens/Categories/Categories';
import CategoryCocktails from '../screens/CategoryCocktails/CategoryCocktails';

const Stack = createStackNavigator();

const CocktailsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Categories" component={Categories}/>
      <Stack.Screen name="CategoryCocktails" component={CategoryCocktails}/>
    </Stack.Navigator>
  );
}

export default CocktailsNavigator;