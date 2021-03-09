import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Header } from 'native-base';
import CocktailList from '../../components/CocktailList/CocktailList';
import { SearchBar } from 'react-native-elements';
import { getCocktailByName, clearData } from '../../store/actions/CocktailsActions';
import styles from './style';

const Search = props => {

    const { navigation } = props;
    const [searchInput, setSearchInput] = useState('');
    const { searchResults } = useSelector(state => state.cocktails)
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

    const changeTextHandler = (input) => {
        setSearchInput(input);
        searchHandler(input);
    }

    return (
        <View style={styles.screen}>
            <Header
                style={styles.header}
                androidStatusBarColor={"white"}
                iosBarStyle={"dark-content"}
            />
            <SearchBar
                ref={searchBarRef}
                placeholder="Search cocktail..."
                onChangeText={(input) => changeTextHandler(input)}
                value={searchInput}
                autoFocus
                searchIcon={
                    <TouchableOpacity onPress={goBack}>
                        <Icon name='arrow-back' style={styles.arrowBack} />
                    </TouchableOpacity>
                }
                lightTheme
                containerStyle={styles.searchBar}
                inputContainerStyle={styles.input}
            />
            <CocktailList navigation={navigation} cocktails={searchResults} />
        </View >
    );
}

export default Search;