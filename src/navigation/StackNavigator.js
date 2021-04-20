import React from 'react';
import Home from '../screens/Home/Home';
import Categories from '../screens/Categories/Categories';
import Cocktails from '../screens/Cocktails/Cocktails';
import CocktailDetails from '../screens/CocktailDetails/CocktailDetails';
import Filters from '../screens/Filters/Filters';
import Profile from '../screens/Profile/Profile';
import PhotoView from '../screens/PhotoView/PhotoView';
import Ingredients from '../screens/Ingredients/Ingredients';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Cocktails" component={Cocktails} />
      <Stack.Screen name="CocktailDetails" component={CocktailDetails} />
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Ingredients" component={Ingredients} />
      <Stack.Screen name="PhotoView" component={PhotoView} />
    </Stack.Navigator>
  );
}

export default StackNavigator;