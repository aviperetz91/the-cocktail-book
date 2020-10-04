import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../store/actions/CocktailsActions';
import categoriesImages from '../../constants/categoriesImages';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import Colors from '../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';

const Categories = props => {

    const navigation = props.navigation;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const categories = useSelector(state => state.cocktails.categories);
    // marginVertical: 15, marginHorizontal: 30,
    if (!categories) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            // <ScrollView>
            //     {categories.map((category, index) => {
            //         return (
            //             <CategoryItem
            //                 key={index}
            //                 title={category}
            //                 image={categoriesImages[index]}
            //                 onSelect={() => navigation.navigate("CategoryCocktails", { title: category })}                        
            //             />
            //         )
            //     })}
            // </ScrollView>
            
            <FlatList
                keyExtractor={(item, index) => index}
                data={categories}
                numColumns={2}
                contentContainerStyle={{ backgroundColor: '#efefef' }}
                renderItem={({ item }) => (
                    <CategoryItem
                        title={item}
                        image={categoriesImages[categories.findIndex(el => el === item)]}
                        onSelect={() => navigation.navigate("CategoryCocktails", { title: item })}
                    />
                )}
            />

            // <ScrollView>
            //     {categories.map((category, index) => {
            //         return (
            //             <CocktailBox
            //                 key={index}
            //                 title={category}
            //                 image={categoriesImages[index]}
            //                 onSelect={() => navigation.navigate("CategoryCocktails", { title: item })}                      
            //             />
            //         )
            //     })}
            // </ScrollView>
        )
    }
}

export default Categories;