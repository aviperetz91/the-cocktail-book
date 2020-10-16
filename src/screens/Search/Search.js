import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'native-base';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import CocktailItem from '../../components/CocktailItem/CocktailItem';
import Colors from '../../constants/Colors';
import { getCocktailByName, clearData } from '../../store/actions/CocktailsActions';
import styles from './style';

const Search = props => {

    const navigation = props.navigation;
    const [searchInput, setSearchInput] = useState('');
    const searchResults = useSelector(state => state.cocktails.searchResults)
    const searchBarRef = React.createRef();

    const dispatch = useDispatch();

    const searchHandler = input => {
        if (input === '') {
            dispatch(clearData('searchResults'))
        } else {
            dispatch(getCocktailByName(input))
        }
    }

    const goBack = () => {
        setSearchInput('');
        dispatch(clearData('searchResults'));
        navigation.goBack();
    }

    const navigate = (item) => {
        navigation.navigate('CocktailDetails', {
            id: item.idDrink,
            name: item.strDrink
        })
    }

    const changeTextHandler = (input) => {
        setSearchInput(input);
        searchHandler(input);
    }

    return (
        <View style={styles.screen}>
            <SearchBar
                ref={searchBarRef}
                placeholder="Search..."
                onChangeText={(input) => changeTextHandler(input)}
                value={searchInput}
                searchIcon={
                    <TouchableOpacity onPress={goBack}>
                        <Icon name='arrow-back' style={{ fontSize: 23, color: Colors.primary }} />
                    </TouchableOpacity>
                }
                lightTheme
                containerStyle={{ backgroundColor: 'white', elevation: 10 }}
                inputContainerStyle={{ backgroundColor: 'white' }}
            />
            <FlatList
                keyExtractor={(item) => item.idDrink}
                data={searchResults}
                renderItem={({ item }) => (
                    <CocktailItem
                        title={item.strDrink}
                        image={item.strDrinkThumb}
                        tags={item.strTags}
                        onSelect={() => navigate(item)}
                    />
                )}
            />
        </View>
    );
}

export default Search;