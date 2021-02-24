import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, ImageBackground } from 'react-native';
import { Spinner } from 'native-base';
import { useSelector } from 'react-redux';
import { Text, Searchbar } from 'react-native-paper';
import Header from '../../components/Header/Header';
import styles from './style';
import Colors from '../../constants/Colors';
import CocktailCard from '../../components/CocktailCard/CocktailCard';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import collage from '../../assets/images/collage.jpg';

const Home = props => {

    const navigation = props.navigation;
    const { cocktails, ratingCocktailMap, reviews } = useSelector(state => state.cocktails);
    const [highestRated, setHighestRated] = useState();

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

    if (!(reviews && reviews.length > 0) || !(highestRated && highestRated.length > 0)) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={'#343434'} />
            </View>
        )
    } else {
        return (
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
                                    inputStyle={{ marginVertical: 20 }}
                                    placeholder="Search..."
                                    onFocus={goToSearch}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.highestRatedContainer}>
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
                <View style={styles.reviewsContainer}>
                    <View>
                        <Text style={styles.title}>Last Reviews</Text>
                    </View>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={reviews.slice(0, 5)}
                        renderItem={({ item }) => (
                            <ReviewItem
                                review={item}
                                selectHandler={() => navigate(item)}
                                profileFlag
                            />
                        )}
                    />
                </View>
            </ScrollView>
        );

    }
}

export default Home;