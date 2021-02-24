import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigator';
import { getCocktails, getReviews, getCategories } from './src/store/actions/CocktailsActions';

const App = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    dispatch(getCocktails())
    dispatch(getReviews())
    dispatch(getCategories())
  }

  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default App;
