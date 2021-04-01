import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Header, Item, Input, Icon, Thumbnail } from 'native-base';
import { IMAGES_URL } from '@env';
import { useSelector } from 'react-redux';
import styles from './style';

const Ingredients = props => {

    const { navigation, slice } = props;
    const { ingredientList } = useSelector(state => state.cocktails);
    const [searchInput, setSearchInput] = useState('');

    const goToCocktails = (ingredient) => {
        navigation.navigate("Cocktails", { title: ingredient, ingredient: true })
    }

    const goBack = () => {
        setSearchInput('');
        navigation.goBack();
    }

    const renderIngredient = (item) => {
        const str = item.split(' ');
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
            <View style={styles.spinnerContainer} >
                <Spinner color={Colors.dark} />
            </View >
        )
    } else {
        return (
            <View>
                {!slice && <Header searchBar rounded androidStatusBarColor={'rgba(0,0,0,0.4)'} iosBarStyle={'light-content'} translucent style={styles.header}>
                    <Item>
                        <Icon type="MaterialCommunityIcons" name="keyboard-backspace" onPress={goBack} />
                        <Input placeholder="Search Ingredient" onChangeText={(input) => setSearchInput(input)} value={searchInput} />
                        {searchInput ? <Icon name="close-outline" onPress={() => setSearchInput('')} /> : null}
                    </Item>
                </Header>}
                <View>
                    <FlatList
                        contentContainerStyle={styles.list}
                        keyExtractor={(item, index) => index.toString()}
                        data={slice ? ingredientList.slice(0, 4) : ingredientList.filter(ingredient => ingredient.toLowerCase().includes(searchInput.toLocaleLowerCase()))}
                        numColumns={4}
                        renderItem={({ item }) => renderIngredient(item)}
                    />

                </View>
            </View>
        )
    }
}

export default Ingredients;