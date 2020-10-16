import React, { useEffect, Fragment } from 'react';
import { View, FlatList } from 'react-native';
import { Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../store/actions/CocktailsActions';
import categoriesImages from '../../constants/categoriesImages';
import Colors from '../../constants/Colors';
import Header from '../../components/Header/Header';
import CategoryBox from '../../components/CategoryBox/CategoryBox';
import styles from './style';


const Categories = props => {

    const navigation = props.navigation;

    const categories = useSelector(state => state.cocktails.categories);
    const categoriesLength = useSelector(state => state.cocktails.categoriesLength);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const navigate = (item) => {
        navigation.navigate("CategoryCocktails", { title: item })
    }

    if (!categories) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            <Fragment>
                <View>
                    <Header
                        headerBackground={'white'}
                        statusBarColor={'black'}
                        pressHandler={navigation.openDrawer}
                        iconType={'Ionicons'}
                        iconName={'menu-outline'}
                        iconColor={'black'}
                        iconSize={32}
                        title={'Categories'}
                        titleColor={'black'}
                        letterSpacing={4}
                    />  
                </View>
                <FlatList
                    contentContainerStyle={styles.screen}
                    keyExtractor={(item, index) => index.toString()}
                    data={categories.length % 2 !== 0 ? [...categories, ''] : categories}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <CategoryBox
                                title={item}
                                subTitle={categoriesLength[item]}
                                image={categoriesImages[categories.findIndex(el => el === item)]}
                                onSelect={() => navigate(item)}
                            />
                        )
                    }}
                />
            </Fragment>
        )
    }
}

export default Categories;