import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../store/actions/CocktailsActions';
import categoriesImages from '../../constants/categoriesImages';
import CategoryItem from '../../components/CategoryItem/CategoryItem';

const Categories = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const categories = useSelector(state => state.cocktails.categories);

    if (categories.length == 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={'blue'} />
            </View>            
        )
    } else {
        return (
            <ScrollView>
                {categories.map((category, index) => {
                    console.log(category)
                    return (
                        <CategoryItem
                            key={index}
                            title={category}
                            image={categoriesImages[index]}
                            onSelect={() => console.log(`${category} selected!`)}
                        />
                    )
                })}
            </ScrollView>
        )
    }
}

export default Categories;