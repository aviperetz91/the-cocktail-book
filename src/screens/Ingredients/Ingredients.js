import React, { Fragment, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';
import { IMAGES_URL } from '@env';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './style';

const Ingredients = props => {

    const { navigation, slice } = props;
    const { ingredientList, cocktails } = useSelector(state => state.cocktails);
    const [searchInput, setSearchInput] = useState('');

    const goToCocktails = async (ingredient) => {
        const ingredientCocktails = [];
        cocktails.forEach(cocktail => {
            if (cocktail.ingredientList.some(ingr => ingr === ingredient)) {
                ingredientCocktails.push(cocktail)
            }
        })
        navigation.navigate("Cocktails", {
            title: ingredient,
            cocktails: ingredientCocktails
        })
    }

    const goBack = () => {
        setSearchInput('');
        navigation.goBack();
    }

    const setDataToRender = () => {
        let data;
        if (slice) {
            data = ingredientList.slice(0, 4);
        } else {
            data = ingredientList.filter(ingredient => {
                return ingredient.toLowerCase().includes(searchInput.toLowerCase()) && 
                cocktails.some(cocktail => cocktail.ingredientList.some(ingr => ingr === ingredient))
            })
        }
        return data;
    }

    const renderIngredient = (item) => {
        const str = item.replace('-', ' ').split(' ');
        const firstWord = str[0];
        const secondWord = str[1];
        const thirdWord = str[2];
        return (
            <TouchableOpacity style={styles.ingredientContainer} onPress={() => goToCocktails(item)}>
                <Thumbnail
                    style={styles.ingredientThumbnail}
                    source={{ uri: `${IMAGES_URL}/ingredients/${item}.png` }}
                />
                <Text style={styles.ingredientText}>{firstWord}</Text>
                {secondWord && <Text style={styles.ingredientText}>{secondWord}</Text>}
                {thirdWord && <Text style={styles.ingredientText}>{thirdWord}</Text>}
            </TouchableOpacity>
        )
    }

    if (!ingredientList) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <Fragment>
                {!slice &&
                    <SearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        closeSearch={goBack}
                        placeholder="Search Ingredient..."
                    />
                }
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={(item, index) => index.toString()}
                    data={setDataToRender()}
                    numColumns={4}
                    renderItem={({ item }) => renderIngredient(item)}
                />
            </Fragment>
        )
    }
}

export default Ingredients;