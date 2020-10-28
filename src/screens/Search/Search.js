import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Item, Input, Icon } from 'native-base';
import { View, FlatList } from 'react-native';
import CocktailItem from '../../components/CocktailItem/CocktailItem';
import { getCocktailByName, clearData } from '../../store/actions/CocktailsActions';
import styles from './style';

const Search = props => {

    const navigation = props.navigation;
    const [searchInput, setSearchInput] = useState('');
    const searchResults = useSelector(state => state.cocktails.searchResults)
    
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

    const clearHandler = () => {
        setSearchInput('');
        dispatch(clearData('searchResults'))
    }

    return (
        <View style={styles.screen}>
            <Container>
                <Header searchBar style={styles.searchBar} androidStatusBarColor={'white'} iosBarStyle={'dark-content'}>
                    <Item style={{ backgroundColor: 'white' }}>
                        <Icon name="arrow-back-outline" onPress={goBack} />
                        <Input                            
                            style={styles.input}
                            value={searchInput}
                            placeholder="Search..."
                            onChangeText={(input) => changeTextHandler(input)}
                        />
                        { searchInput !== '' ? <Icon name="close-outline" style={{ color: '#aaa' }} onPress={clearHandler} /> : null } 
                    </Item>
                </Header>
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
            </Container>
        </View>
    );
}

export default Search;