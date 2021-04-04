import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Header, Item, Input, Icon, } from 'native-base';
import CocktailList from '../CocktailList/CocktailList';
import styles from './style';

const Search = props => {

    const { navigation, closeSearch, searchInput, setSearchInput } = props;
    const { cocktails } = useSelector(state => state.cocktails)

    const handleClose = () => {
        setSearchInput('');
        closeSearch()
    }

    return (
        <View style={styles.screen}>
            <Header searchBar rounded androidStatusBarColor={'rgba(0,0,0,0.4)'} iosBarStyle={'light-content'} translucent style={styles.header}>
                <Item>
                    <Icon type="MaterialCommunityIcons" name="keyboard-backspace" onPress={handleClose} />
                    <Input placeholder="Search Cocktail" onChangeText={(input) => setSearchInput(input)} value={searchInput} autoFocus />
                    {searchInput ? <Icon name="close-outline" onPress={(input) => setSearchInput(input)} /> : null}
                </Item>
            </Header>
            {searchInput !== '' && 
                <CocktailList 
                    navigation={navigation} 
                    cocktails={cocktails.filter(drink => drink.strDrink.toLowerCase().includes(searchInput.toLowerCase()))} 
                /> 
            }
        </View >
    );
}

export default Search;