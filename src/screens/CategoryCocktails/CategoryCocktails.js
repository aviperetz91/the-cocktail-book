import React, { Fragment, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Left, Body, Right, Button, Title, Icon, Spinner } from 'native-base';
import { getCategoryCocktails } from '../../store/actions/CocktailsActions';
import CocktailBox from '../../components/CocktailBox/CocktailBox';

const CategoryCocktails = props => {

    const categoryTitle = props.route.params.title;
    const categoryCocktails = useSelector(state => state.cocktails.cocktails)
    const navigation = props.navigation;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryCocktails(categoryTitle))
    }, [dispatch])

    if (categoryCocktails.length == 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={'blue'} />
            </View>
        )
    } else {
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{categoryTitle}</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={categoryCocktails}
                    numColumns={2}
                    renderItem={(cocktail) => (
                        <CocktailBox
                            title={cocktail.item.strDrink}
                            image={cocktail.item.strDrinkThumb}
                            onSelect={() => navigation.navigate('CocktailDetails', {
                                id: cocktail.item.idDrink,
                                name: cocktail.item.strDrink
                            })}
                        />
                    )}
                />
            </Fragment>
        )
    } 
}



export default CategoryCocktails