import React, { useState, useEffect } from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { Spinner } from 'native-base';
import { Text, Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import styles from './style';
import Colors from '../../constants/Colors';
import CocktailList from '../../components/CocktailList/CocktailList';
import collage from '../../assets/images/collage.jpg';


const Home = props => {

    const { navigation } = props;
    const {
        cocktails,
        latestCocktails,
        popularCocktails,
        randomCocktails,
        cocktailRatingMap,
        reviews
    } = useSelector(state => state.cocktails);
    const [highestRated, setHighestRated] = useState();

    useEffect(() => {
        makeHighestRatedList()
    }, [cocktailRatingMap])

    const makeHighestRatedList = () => {
        const drinkIdRating = [];
        for (let id in cocktailRatingMap) {
            drinkIdRating.push({
                idDrink: id,
                rating: cocktailRatingMap[id]
            })
        }
        drinkIdRating.sort((a, b) => b.rating - a.rating);
        const highestRated = [];
        if (cocktails && drinkIdRating) {
            drinkIdRating.forEach((el, index) => {
                const found = cocktails.find(cocktail => cocktail.idDrink === el.idDrink)
                highestRated.push(found);
            })
        }
        setHighestRated(highestRated)
    }

    const goToSearch = () => {
        navigation.navigate('Search')
    }

    if (!(reviews && reviews.length > 0) || !(highestRated && highestRated.length > 0)) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={'#343434'} />
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
                    <View style={styles.horizontalListContainer}>
                        <View>
                            <Text style={styles.title}>Highest Rated</Text>
                        </View>
                        <CocktailList
                            navigation={navigation}
                            card
                            horizontal
                            cocktails={highestRated}
                        />
                    </View>
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