import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Provider, Text, Searchbar } from 'react-native-paper';
import Header from '../../components/Header/Header';
import styles from './style';
import Colors from '../../constants/Colors';
import { API_URL } from '@env';
import axios from 'axios';
import CocktailCard from '../../components/CocktailCard/CocktailCard';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import collage from '../../assets/images/collage.jpg';

const Home = props => {

    const navigation = props.navigation;
    const { userFavoriteIds, userReviews } = useSelector(state => state.user);
    const { cocktails, ratingCocktailMap, reviews } = useSelector(state => state.cocktails);
    const [highestRated, setHighestRated] = useState();

    const dispatch = useDispatch()

    useEffect(() => {
        makeHighestRatedList()
    }, [ratingCocktailMap])

    const makeHighestRatedList = () => {
        const drinkIdRating = [];
        for (let id in ratingCocktailMap) {
            drinkIdRating.push({
                idDrink: id,
                rating: ratingCocktailMap[id]
            })
        }
        drinkIdRating.sort((a, b) => b.rating - a.rating);
        console.log("drinkIdRating", drinkIdRating)
        const highestRated = [];
        if (cocktails && drinkIdRating) {
            drinkIdRating.forEach((el, index) => {
                const found = cocktails.find(cocktail => cocktail.idDrink === el.idDrink)
                highestRated.push(found);
            })
        }
        console.log("highestRated", highestRated)
        setHighestRated(highestRated)
    }

    const goToSearch = () => {
        navigation.navigate('Search')
    }

    const navigate = (item) => {
        navigation.navigate('CocktailDetails', {
            id: item.idDrink,
            name: item.strDrink
        })
    }

    return (
        <Provider>
            <ScrollView contentContainerStyle={styles.screen}>
                <View style={styles.imageContainer}>
                    <ImageBackground source={collage} style={styles.image}>
                        <View style={styles.imageInnerContent}>
                            <Header
                                headerBackground={'transparent'}
                                statusBarColor={Colors.dark}
                                iosBarStyle={'light-content'}
                                pressHandler={props.navigation.openDrawer}
                                iconType={'Ionicons'}
                                iconName={'menu-outline'}
                                iconColor={'white'}
                                iconSize={32}
                                titleColor={'white'}
                                letterSpacing={4}
                            />
                            <View style={styles.searchBarContainer}>
                                <Searchbar
                                    placeholder="Search"
                                    onFocus={goToSearch}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>


                {highestRated && highestRated.length > 0 ?
                    <View style={styles.favoritsContainer}>
                        <View>
                            <Text style={styles.title}>Highest rated</Text>
                        </View>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={highestRated}
                            horizontal
                            renderItem={({ item }) => (
                                <CocktailCard
                                    title={item.strDrink}
                                    image={item.strDrinkThumb}
                                    tags={item.strTags}
                                    category={item.strCategory}
                                    selectHandler={() => navigate(item)}
                                />
                            )}
                        />

                    </View>
                    : null}
                {reviews && reviews.length > 0 ?
                    <View style={styles.reviewsContainer}>
                        <View>
                            <Text style={styles.title}>Last Reviews</Text>
                        </View>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={reviews.slice(0,5)}
                            renderItem={({ item }) => (
                                <ReviewItem
                                    review={item}
                                    selectHandler={() => navigate(item)}
                                    profileFlag
                                />
                            )}
                        />
                    </View>
                    : null}
            </ScrollView>
        </Provider>
    );
}

export default Home;