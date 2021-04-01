import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Header, Item, Input, Icon, Thumbnail } from 'native-base';
import CocktailList from '../CocktailList/CocktailList';
import { SearchBar } from 'react-native-elements';
import { getCocktailByName, clearData } from '../../store/actions/CocktailsActions';
import styles from './style';

const Search = props => {

    const { navigation, closeSearch, searchInput, setSearchInput } = props;
    const { searchResults } = useSelector(state => state.cocktails)
    // const searchBarRef = React.createRef();

    const dispatch = useDispatch();

    const searchHandler = input => {
        if (input === '') {
            dispatch(clearData('searchResults'))
        } else {
            dispatch(getCocktailByName(input))
        }
    }

    const handleClose = () => {
        setSearchInput('');
        dispatch(clearData('searchResults'));
        closeSearch()
    }

    const changeTextHandler = (input) => {
        searchHandler(input);
        setSearchInput(input);
    }

    return (
        <View style={styles.screen}>
            {/* {Platform.OS === 'ios' && <Header style={styles.header} />}
            {Platform.OS === 'android' && <View style={styles.m_t} ></View> }
            <SearchBar
                ref={searchBarRef}
                placeholder="Search Cocktail..."
                onChangeText={(input) => changeTextHandler(input)}
                value={searchInput}
                autoFocus
                searchIcon={
                    <TouchableOpacity onPress={goBack}>
                        <Icon name='arrow-back-outline' style={styles.arrowBack} />
                    </TouchableOpacity>
                }
                lightTheme
                containerStyle={styles.searchBar}
                inputContainerStyle={styles.input}
            /> */}
            <Header searchBar rounded androidStatusBarColor={'rgba(0,0,0,0.4)'} iosBarStyle={'light-content'} translucent style={styles.header}>
                <Item>
                    <Icon type="MaterialCommunityIcons" name="keyboard-backspace" onPress={handleClose} />
                    <Input placeholder="Search Cocktail" onChangeText={(input) => changeTextHandler(input)} value={searchInput} autoFocus />
                    {searchInput ? <Icon name="close-outline" onPress={(input) => changeTextHandler(input)} /> : null}
                </Item>
            </Header>
            {searchInput !== '' && <CocktailList navigation={navigation} cocktails={searchResults} /> }
        </View >
    );
}

export default Search;