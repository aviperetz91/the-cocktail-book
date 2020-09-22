import React, { Fragment } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Icon, Spinner, Card } from 'native-base';
import CocktailBox from '../../components/CocktailBox/CocktailBox';
import Colors from '../../constants/Colors';

const FilteredCocktails = props => {

    const navigation = props.navigation;
    const filteredCocktails = props.route.params.filteredCocktails;

    if (!filteredCocktails) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else if (filteredCocktails.length === 0) {
        return (
            <Fragment>
                <Header style={{ backgroundColor: Colors.primary }} androidStatusBarColor={Colors.darkPrimary}>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Results</Title>
                    </Body>
                    <Right />
                </Header>
                <Card style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginLeft: 15, marginRight: 15, padding: 15 }}>
                    <Text style={{ fontSize: 22, color: '#dc3545' }}>No results matched your filters</Text>
                </Card>
            </Fragment>

        )
    } else {
        return (
            <Fragment>
                <Header style={{ backgroundColor: Colors.primary }} androidStatusBarColor={Colors.darkPrimary}>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Results</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={filteredCocktails}
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



export default FilteredCocktails