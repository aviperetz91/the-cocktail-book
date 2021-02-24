import React, { Fragment } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Spinner, Card } from 'native-base';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import CocktailItem from '../../components/CocktailItem/CocktailItem';
import Colors from '../../constants/Colors';
import styles from '../CategoryCocktails/style';

const FilteredCocktails = props => {

    const navigation = props.navigation;
    const filteredCocktails = props.route.params.filteredCocktails;
    const cocktailRatingMap = useSelector(state => state.cocktails.cocktailRatingMap)

    const goBack = () => {
        navigation.goBack()
    }

    const navigate = (item) => {
        navigation.navigate('CocktailDetails', {
            id: item.idDrink,
            name: item.strDrink
        })
    }

    return (
        <Fragment>
            <Header
                headerBackground={'black'}
                statusBarColor={'black'}
                iosBarStyle={'light-content'}
                pressHandler={goBack}
                iconType={'MaterialCommunityIcons'}
                iconName={'keyboard-backspace'}
                iconColor={'white'}
                iconSize={29}
                title={`${filteredCocktails.length} Results`}
                titleColor={'white'}
                letterSpacing={3}
            />
            {!filteredCocktails ?
                <View style={styles.spinnerContainer}>
                    <Spinner color={Colors.darkPrimary} />
                </View>
                : filteredCocktails && filteredCocktails.length === 0 ?
                    <Card style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginLeft: 15, marginRight: 15, padding: 15 }}>
                        <Text style={{ fontSize: 22, color: '#dc3545' }}>No results matched your filters</Text>
                    </Card>
                    :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={filteredCocktails}
                        style={styles.listStyle}
                        renderItem={({ item }) => (
                            <CocktailItem
                                title={item.strDrink}
                                image={item.strDrinkThumb}
                                alcoholic={item.strAlcoholic}
                                category={item.strCategory}
                                glass={item.strGlass}
                                rating={cocktailRatingMap[item.idDrink]}
                                onSelect={() => navigate(item)}
                            />
                        )}
                    />
            }
        </Fragment>
    )
}

export default FilteredCocktails