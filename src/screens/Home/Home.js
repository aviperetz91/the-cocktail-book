import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Spinner, Header, Text, Right, Icon } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import styles from './style';
import CocktailList from '../../components/CocktailList/CocktailList';
import CategoryList from '../../components/CategoryList/CategoryList';
import Ingredients from '../Ingredients/Ingredients';
import SearchBar from '../../components/SearchBar/SearchBar';
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
    getIngredientList,
} from '../../store/actions/CocktailsActions'

const Home = props => {

    const { navigation } = props;
    const {
        latestCocktails,
        popularCocktails,
        randomCocktails,
        reviews,
        categories,
        categoriesLength,
        // cocktailRatingMap
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

    const requiredData = latestCocktails && popularCocktails && randomCocktails && reviews && categories;

    if (!requiredData) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.dark} />
            </View>
        )
    } else {
        return (
            <ScrollView contentContainerStyle={styles.screen}>
                <View style={searchInput === '' ? styles.back : {flex: 1, backgroundColor: 'white'}}>
                    { displaySearchBar ?
                        <SearchBar
                            navigation={navigation}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput} 
                            closeSearch={() => setDisplaySearchBar(false)} />
                        :
                        <Header androidStatusBarColor={'rgba(0,0,0,0.4)'} iosBarStyle={'light-content'} translucent style={styles.header}>
                            <Right>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => setDisplaySearchBar(true)}>
                                    <Icon name='search' style={styles.headerIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Filters')}>
                                    <Icon type={"FontAwesome5"} name="sort-amount-down" style={styles.headerIcon}  />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Profile')} >
                                    <Icon name='person' style={styles.headerIcon} />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                    }
                </View>
                { searchInput === '' && 
                <View style={styles.absolute}>
                    <View>
                        <Text style={styles.mainTitle}>Most Popular</Text>
                        <CocktailList
                            navigation={navigation}
                            cocktails={popularCocktails}
                            card
                            size={'large'}
                        />
                    </View>
                </View> }
                { searchInput === '' &&
                <View style={styles.content}>
                    <View style={styles.sectionContainer}>
                        <TouchableOpacity style={styles.rowBetween} onPress={() => navigation.navigate('Categories')}>
                            <Text style={styles.sectionTitle}>Categories</Text>
                            <Text style={styles.seconaryText}>
                                see all
                                <Icon name="chevron-forward-outline" style={styles.seconaryText} />
                            </Text>
                        </TouchableOpacity>
                        <CategoryList
                            navigation={navigation}
                            categories={categories}
                            categoriesLength={categoriesLength}
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Latest Drinks</Text>
                        <CocktailList
                            navigation={navigation}
                            cocktails={latestCocktails}
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
                    <View>
                        <Text style={styles.sectionTitle}>Random Drinks</Text>
                        <CocktailList
                            navigation={navigation}
                            cocktails={randomCocktails}
                            card
                            size={'large'}
                        />
                    </View>
                </View> }
            </ScrollView >
        );
    }
}
export default Home;