import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../store/actions/CocktailsActions';
import categoriesImages from '../../constants/categoriesImages';
import Colors from '../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import CategoryBox from '../../components/CategoryBox/CategoryBox';

const Categories = props => {

    const navigation = props.navigation;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const categories = useSelector(state => state.cocktails.categories);

    if (!categories) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            <FlatList
                keyExtractor={(item, index) => index}
                data={categories.length % 2 !== 0 ? [...categories, ''] : categories}
                numColumns={2}
                contentContainerStyle={{ backgroundColor: '#efefef' }}
                renderItem={({ item }) => (
                    <CategoryBox
                        title={item}
                        image={categoriesImages[categories.findIndex(el => el === item)]}
                        onSelect={() => navigation.navigate("CategoryCocktails", { title: item })}
                    />
                )}
            />
        )
    }
}

export default Categories;