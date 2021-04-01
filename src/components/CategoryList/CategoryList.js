import React from 'react';
import { FlatList } from 'react-native';
import CategoryItem from '../CategoryItem/CategoryItem';

const CategoryList = props => {

    const { navigation, categories } = props

    const navigate = (name) => {
        navigation.navigate("Cocktails", { title: name, category: true })
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