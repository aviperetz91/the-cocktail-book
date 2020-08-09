import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Categories from '../screens/Categories/Categories';
import CategoryCocktails from '../screens/CategoryCocktails/CategoryCocktails';
import CocktailDetails from '../screens/CocktailDetails/CocktailDetails';
import Filters from '../screens/Filters/Filters';

const Stack = createStackNavigator();

const CocktailsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Categories" component={Categories}/>
      <Stack.Screen name="CategoryCocktails" component={CategoryCocktails}/>
      <Stack.Screen name="CocktailDetails" component={CocktailDetails}/>
      <Stack.Screen name="Filters" component={Filters}/>
    </Stack.Navigator>
  );
}

export default CocktailsNavigator;