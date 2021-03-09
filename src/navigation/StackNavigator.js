import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Categories from '../screens/Categories/Categories';
import Cocktails from '../screens/Cocktails/Cocktails';
import CocktailDetails from '../screens/CocktailDetails/CocktailDetails';
import Filters from '../screens/Filters/Filters';
import Search from '../screens/Search/Search';
import Profile from '../screens/Profile/Profile';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Cocktails" component={Cocktails} />
      <Stack.Screen name="CocktailDetails" component={CocktailDetails} />
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default StackNavigator;