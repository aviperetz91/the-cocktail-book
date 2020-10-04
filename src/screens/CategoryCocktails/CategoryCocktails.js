import React, { Fragment, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Left, Body, Right, Button, Title, Icon, Spinner } from 'native-base';
import { getCategoryCocktails, clearData } from '../../store/actions/CocktailsActions';
import CocktailItem from '../../components/CocktailItem/CocktailItem';
import Colors from '../../constants/Colors';

const CategoryCocktails = props => {

    const navigation = props.navigation;
    const categoryTitle = props.route.params.title;
    
    const categoryCocktails = useSelector(state => state.cocktails.categoryCocktails)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryCocktails(categoryTitle))
    }, [dispatch])

    if (!categoryCocktails) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            <Fragment>
                <Header style={{ backgroundColor: Colors.primary }} androidStatusBarColor={Colors.darkPrimary}>
                    <Left>
                        <Button 
                            transparent 
                            onPress={() => { 
                                dispatch(clearData('categoryCocktails')); 
                                navigation.goBack()
                            }}
                        >
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
                    style={{ backgroundColor: '#f4f4f4' }}
                    renderItem={({item}) => (
                        <CocktailItem
                            title={item.strDrink}
                            image={item.strDrinkThumb}
                            tags={item.strTags}
                            onSelect={() => navigation.navigate('CocktailDetails', {
                                id: item.idDrink,
                                name: item.strDrink
                            })}
                        />
                    )}
                />
            </Fragment>
        )
    } 
}



export default CategoryCocktails