import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import CategoryItem from '../CategoryItem/CategoryItem';

const CategoryList = props => {

    const { navigation } = props;
    const { categories, cocktails } = useSelector(state => state.cocktails);

    const navigate = (name) => {
        navigation.navigate("Cocktails", {
            title: name,
            cocktails: cocktails.filter(cocktail => cocktail.strCategory === name)
        })
    }

    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={categories}
            horizontal
            renderItem={({ item }) => {
                return (
                    <CategoryItem
                        title={item.name}
                        subTitle={item.length}
                        image={categoriesImages[categories.findIndex(el => el === item)]}
                        onSelect={() => navigate(item.name)}
                    />
                )
            }}
        />
    )
}

export default CategoryList;