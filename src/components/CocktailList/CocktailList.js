import React from 'react';
import { FlatList } from 'react-native';
import CocktailItem from '../../components/CocktailItem/CocktailItem';

const CocktailList = props => {

    const { navigation, cocktails, horizontal } = props

    return (
        <FlatList
            contentContainerStyle={{ backgroundColor: 'white' }}
            keyExtractor={(item, index) => index.toString()}
            data={cocktails}
            horizontal={horizontal}
            renderItem={({ item }) => (
                <CocktailItem
                    navigation={navigation}
                    horizontal={horizontal}
                    idDrink={item.idDrink}
                    title={item.strDrink}
                    image={item.strDrinkThumb}
                    alcoholic={item.strAlcoholic}
                    category={item.strCategory}
                    glass={item.strGlass}
                />
            )}
        />
    )
}

export default CocktailList;