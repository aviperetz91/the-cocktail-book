import React, { Fragment, useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Text, Right, Icon } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import styles from './style';
import CocktailList from '../../components/CocktailList/CocktailList';
import CategoryList from '../../components/CategoryList/CategoryList';
import Ingredients from '../Ingredients/Ingredients';
import SearchBar from '../../components/SearchBar/SearchBar';
import Spinner from '../../components/Spinner/Spinner';
import BrowseByFirstLetter from '../../components/BrowseByFirstLetter/BrowseByFirstLetter';
import {
    getCocktails,
    getLatestCocktails,
    getPopularCocktails,
    getRandomCocktails,
    getReviews,
    getCategories,
    getAlcoholicList,
    getGlassList,
    getIngredientList,
} from '../../store/actions/CocktailsActions'

const Home = props => {

    const { navigation } = props;
    const {
        cocktails,
        latestCocktails,
        popularCocktails,
        randomCocktails,
        reviews,
        categories,
        cocktailRatingMap
    } = useSelector(state => state.cocktails);

    const [searchInput, setSearchInput] = useState('');
    const [displaySearchBar, setDisplaySearchBar] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        dispatch(getCocktails());
        dispatch(getLatestCocktails());
        dispatch(getPopularCocktails());
        dispatch(getRandomCocktails());
        dispatch(getReviews());
        dispatch(getCategories());
        dispatch(getAlcoholicList());
        dispatch(getGlassList());
        dispatch(getIngredientList());
    }

    const makeHighestRatedList = () => {
        let cocktailRating = [];
        for (let cocktail in cocktailRatingMap) {
            cocktailRating.push({
                cocktail: cocktail,
                rating: cocktailRatingMap[cocktail]
            });
        }
        cocktailRating.sort((a, b) => {
            return b.rating - a.rating;
        });
        let highestRated = [];
        for (let i = 0; i < cocktailRating.length; i++) {
            highestRated.push(cocktails.find(el => el.idDrink === cocktailRating[i].cocktail))
        }
        return highestRated;
    }

    const requiredData = cocktails && latestCocktails && popularCocktails && randomCocktails && reviews && categories;

    if (!requiredData) {
        return (
            <Spinner />
        )
    } else {
        const highestRated = makeHighestRatedList();
        return (
            <ScrollView contentContainerStyle={styles.screen}>
                <View style={searchInput === '' ? styles.back : { flex: 1, backgroundColor: 'white' }}>
                    {displaySearchBar ?
                        <SearchBar
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            closeSearch={() => setDisplaySearchBar(false)}
                            autoFocus
                        />
                        :
                        <Header androidStatusBarColor={'rgba(0,0,0,0.4)'} iosBarStyle={'light-content'} translucent style={styles.header}>
                            <Right>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => setDisplaySearchBar(true)}>
                                    <Icon name='search' style={styles.headerIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Filters')}>
                                    <Icon type={"FontAwesome5"} name="sort-amount-down" style={styles.headerIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Profile')} >
                                    <Icon name='person' style={styles.headerIcon} />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                    }
                </View>
                { searchInput === '' ?
                    <Fragment>
                        <View style={styles.absolute}>
                            <View>
                                <TouchableOpacity
                                    style={styles.rowBetween}
                                    onPress={() => navigation.navigate('Cocktails', { title: 'Latest Drinks', cocktails: latestCocktails })}>
                                    <Text style={styles.mainTitle}>Latest Drinks</Text>
                                    <Text style={styles.seconaryText}>
                                        list view
                                        <Icon name="chevron-forward-outline" style={styles.seconaryText} />
                                    </Text>
                                </TouchableOpacity>
                                <CocktailList
                                    navigation={navigation}
                                    cocktails={latestCocktails}
                                    card
                                    size={'large'}
                                />
                            </View>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.sectionContainer}>
                                <TouchableOpacity style={styles.rowBetween} onPress={() => navigation.navigate('Categories')}>
                                    <Text style={styles.sectionTitle}>Categories</Text>
                                    <Text style={styles.seconaryText}>
                                        see all
                                        <Icon name="chevron-forward-outline" style={styles.seconaryText} />
                                    </Text>
                                </TouchableOpacity>
                                <CategoryList navigation={navigation}
                                />
                            </View>
                            <View style={styles.sectionContainer}>
                                <TouchableOpacity
                                    style={styles.rowBetween}
                                    onPress={() => navigation.navigate('Cocktails', { title: 'Familar Drinks', cocktails: popularCocktails })}>
                                    <Text style={styles.sectionTitle}>Familar Drinks</Text>
                                    <Text style={styles.seconaryText}>
                                        list view
                                        <Icon name="chevron-forward-outline" style={styles.seconaryText} />
                                    </Text>
                                </TouchableOpacity>
                                <CocktailList
                                    navigation={navigation}
                                    cocktails={popularCocktails}
                                    card
                                    size={'large'}
                                />
                            </View>
                            <View style={styles.sectionContainer}>
                                <TouchableOpacity style={styles.rowBetween} onPress={() => navigation.navigate('Ingredients')}>
                                    <Text style={styles.sectionTitle}>Ingredients</Text>
                                    <Text style={styles.seconaryText}>
                                        see all
                                    <Icon name="chevron-forward-outline" style={styles.seconaryText} />
                                    </Text>
                                </TouchableOpacity>
                                <Ingredients navigation={navigation} slice />
                            </View>
                            {highestRated && highestRated.length > 0 &&
                                <View>
                                    <TouchableOpacity
                                        style={styles.rowBetween}
                                        onPress={() => navigation.navigate('Cocktails', { title: 'Random Drinks', cocktails: highestRated })}>
                                        <Text style={styles.sectionTitle}>Highest Rated</Text>
                                        <Text style={styles.seconaryText}>
                                            list view
                                            <Icon name="chevron-forward-outline" style={styles.seconaryText} />
                                        </Text>
                                    </TouchableOpacity>
                                    <CocktailList
                                        navigation={navigation}
                                        cocktails={highestRated}
                                        card
                                        size={'large'}
                                    />
                                </View>
                            }
                            <View style={highestRated && highestRated.length > 0 ? styles.sectionContainer : {}}>
                                <Text style={styles.sectionTitle}>Browse By First Letter</Text>
                                <BrowseByFirstLetter navigation={navigation} />
                            </View>
                            <View style={styles.sectionContainer}>
                                <TouchableOpacity
                                    style={styles.rowBetween}
                                    onPress={() => navigation.navigate('Cocktails', { title: 'Random Drinks', cocktails: randomCocktails })}>
                                    <Text style={styles.sectionTitle}>Random Drinks</Text>
                                    <Text style={styles.seconaryText}>
                                        list view
                                        <Icon name="chevron-forward-outline" style={styles.seconaryText} />
                                    </Text>
                                </TouchableOpacity>
                                <CocktailList
                                    navigation={navigation}
                                    cocktails={randomCocktails}
                                    card
                                    size={'large'}
                                />
                            </View>
                        </View>
                    </Fragment>
                    :
                    <CocktailList
                        navigation={navigation}
                        cocktails={cocktails.filter(drink => drink.strDrink.toLowerCase().includes(searchInput.toLowerCase()))}
                    />
                }
            </ScrollView >
        );
    }
}
export default Home;