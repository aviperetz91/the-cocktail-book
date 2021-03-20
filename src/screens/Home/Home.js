import React, { useEffect, useState } from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { Spinner } from 'native-base';
import { Text, Searchbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import styles from './style';
import CocktailList from '../../components/CocktailList/CocktailList';
import collage from '../../assets/images/collage.jpg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    getCocktails,
    getLatestCocktails,
    getPopularCocktails,
    getRandomCocktails,
    getReviews,
    getCategories,
    getAlcoholicList,
    getGlassList,
    getIngredientList
} from '../../store/actions/CocktailsActions'

const Home = props => {

    const { navigation } = props;
    const {
        latestCocktails,
        popularCocktails,
        randomCocktails,
        reviews,
        // cocktailRatingMap
    } = useSelector(state => state.cocktails);

    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
        // makeHighestRatedList();
    }, [])

    const loadData = () => {
        dispatch(getLatestCocktails());
        dispatch(getPopularCocktails());
        dispatch(getRandomCocktails());
        dispatch(getReviews());
        dispatch(getCategories());
        dispatch(getAlcoholicList());
        dispatch(getGlassList());
        dispatch(getIngredientList());
        // dispatch(getCocktails());
    }

    // const makeHighestRatedList = () => {
    //     console.log("cocktailRatingMap: ", cocktailRatingMap)
    //     let highestRated = [];
    //     for (let cocktail in cocktailRatingMap) {
    //         highestRated.push({
    //             cocktail: cocktail,
    //             rating: cocktailRatingMap[cocktail]
    //         });
    //     }
    //     highestRated.sort((a, b) => {
    //         return a.rating - b.rating;
    //     });
    //     console.log("highestRated: ", highestRated)
    // }

    const goToSearch = () => {
        navigation.navigate('Search')
    }

    const requiredData = latestCocktails && popularCocktails && randomCocktails && reviews;

    if (!requiredData) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.dark} />
            </View>
        )
    } else {
        return (
            <ScrollView contentContainerStyle={styles.screen}>
                <View>
                    <ImageBackground source={collage} style={styles.image}>
                        <View style={styles.imageInnerContent}>
                            <Header
                                headerBackground={'transparent'}
                                statusBarColor={'rgba(0,0,0,0.4)'}
                                iosBarStyle={'light-content'}
                                pressHandler={props.navigation.openDrawer}
                                iconType={'Ionicons'}
                                iconName={'menu-outline'}
                                iconColor={'white'}
                                iconSize={32}
                                titleColor={'white'}
                                letterSpacing={4}
                            />
                            <View style={styles.titleContainer}>
                                <Text style={styles.mainTitle}>{`The Cocktail\nBook`}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.searchBarContainer}>
                        <Searchbar
                            inputStyle={{ marginVertical: 0 }}
                            placeholder="Search cocktail..."
                            onFocus={goToSearch}
                        />
                    </View>
                    <View style={{ marginTop: 42 }}></View>
                    <View style={styles.horizontalListContainer}>
                        <View>
                            <Text style={styles.title}>Latest Drinks</Text>
                        </View>
                        <CocktailList
                            navigation={navigation}
                            card
                            horizontal
                            cocktails={latestCocktails}
                        />
                    </View>
                    <View style={styles.horizontalListContainer}>
                        <View>
                            <Text style={styles.title}>Popular Drinks</Text>
                        </View>
                        <CocktailList
                            navigation={navigation}
                            card
                            horizontal
                            cocktails={popularCocktails}
                        />
                    </View>
                    {/* <View style={styles.horizontalListContainer}>
                        <View>
                            <Text style={styles.title}>Highest Rated</Text>
                        </View>
                        <CocktailList
                            navigation={navigation}
                            card
                            horizontal
                            cocktails={highestRated}
                        />
                    </View> */}
                    <View style={styles.horizontalListContainer}>
                        <View>
                            <Text style={styles.title}>Random Drinks</Text>
                        </View>
                        <CocktailList
                            navigation={navigation}
                            card
                            horizontal
                            cocktails={randomCocktails}
                        />
                    </View>
                </View>
            </ScrollView>
        );

    }
}
export default Home;