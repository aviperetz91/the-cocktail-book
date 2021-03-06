import React from 'react';
import { FlatList } from 'react-native';
import CocktailItem from '../../components/CocktailItem/CocktailItem';

const CocktailList = props => {

    const { navigation, cocktails, card, size } = props

    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={cocktails}
            horizontal={card}
            renderItem={({ item }) => (
                <CocktailItem
                    navigation={navigation}
                    card={card}
                    size={size}
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