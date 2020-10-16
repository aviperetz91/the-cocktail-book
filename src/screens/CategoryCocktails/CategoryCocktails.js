import React, { Fragment, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'native-base';
import { getCategoryCocktails, clearData } from '../../store/actions/CocktailsActions';
import Header from '../../components/Header/Header';
import CocktailItem from '../../components/CocktailItem/CocktailItem';
import Colors from '../../constants/Colors';
import styles from './style';

const CategoryCocktails = props => {

    const navigation = props.navigation;
    const categoryTitle = props.route.params.title;

    const categoryCocktails = useSelector(state => state.cocktails.categoryCocktails)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryCocktails(categoryTitle))
    }, [dispatch])


    const goBack = () => {
        dispatch(clearData('categoryCocktails'));
        navigation.goBack()
    }

    const navigate = (item) => {
        navigation.navigate('CocktailDetails', {
            id: item.idDrink,
            name: item.strDrink
        })
    }

    if (!categoryCocktails) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            <Fragment>
                <Header
                    headerBackground={Colors.dark}
                    statusBarColor={'black'}
                    pressHandler={goBack}
                    iconType={'MaterialCommunityIcons'}
                    iconName={'keyboard-backspace'}
                    iconColor={'white'}
                    iconSize={29}
                    title={categoryTitle}
                    titleColor={'white'}
                    letterSpacing={3}
                />
                <FlatList
                    keyExtractor={(item, index) => item.idDrink}
                    data={categoryCocktails}
                    style={styles.listStyle}
                    renderItem={({ item }) => (
                        <CocktailItem
                            title={item.strDrink}
                            image={item.strDrinkThumb}
                            tags={item.strTags}
                            onSelect={() => navigate(item)}
                        />
                    )}
                />
            </Fragment>
        )
    }
}


export default CategoryCocktails