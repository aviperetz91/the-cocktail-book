import React from 'react';
import { FlatList } from 'react-native';
import CategoryItem from '../CategoryItem/CategoryItem';

const CategoryList = props => {

    const { navigation, categories, categoriesLength } = props

    const navigate = (item) => {
        navigation.navigate("Cocktails", { title: item, category: true })
    }

    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={categories.length % 2 !== 0 ? [...categories, ''] : categories}
            horizontal
            renderItem={({ item }) => {
                return (
                    <CategoryItem
                        title={item}
                        subTitle={categoriesLength[item]}
                        image={categoriesImages[categories.findIndex(el => el === item)]}
                        onSelect={() => navigate(item)}
                    />
                )
            }}
        />
    )
}

export default CategoryList;