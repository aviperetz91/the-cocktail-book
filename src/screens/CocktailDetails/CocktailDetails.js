import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Tabs, Tab, Icon } from 'native-base';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import database from '@react-native-firebase/database';
import { getCocktailById, clearData } from '../../store/actions/CocktailsActions';
import { toggleFavorite } from '../../store/actions/UserActions';
import styles from './style';
import IngredientList from '../../components/IngredientList/IngredientList';
import ReviewList from '../../components/ReviewList/ReviewList';
import Rating from '../../components/Rating/Rating';
import Spinner from '../../components/Spinner/Spinner';

const CocktailDetails = props => {

    const { navigation } = props;
    const { id, name } = props.route.params;
    const { selectedCocktail, cocktailRatingMap, reviews } = useSelector(state => state.cocktails);
    const { userId } = useSelector(state => state.user);
    const [activeTab, setActiveTab] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const [userFavoritesIds, setUserFavoritesIds] = useState();
    const reviewsCounter = reviews.filter(rev => rev.idDrink === id).length

    const dispatch = useDispatch();

    useEffect(() => {
        getUserFavoritesIds();
        dispatch(getCocktailById(id))
    }, [dispatch])

    const getUserFavoritesIds = () => {
        database().ref(`users/${userId}/favoritesIds`).on('value', favIds => {
            const favoritesIds = favIds.val() ? Object.keys(favIds.val()) : null;
            setUserFavoritesIds(favoritesIds)
        })
    }

    const toggleFavoriteHandler = () => {
        console.log(userFavoritesIds)
        dispatch(toggleFavorite(userFavoritesIds, selectedCocktail.idDrink, userId))
    }

    const changeTabHandler = (tabIndex) => {
        const newIndex = parseInt(tabIndex.split('.')[1])
        setActiveTab(newIndex)
    }

    const goBack = () => {
        dispatch(clearData('selectedCocktail'))
        navigation.goBack()
    }

    if (!selectedCocktail) {
        return (
            <Spinner />
        )
    } else {
        return (
            <Provider>
                <View style={styles.screen}>
                    <StatusBar translucent hidden />
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: selectedCocktail.strDrinkThumb }} />
                        </View>
                        <TouchableOpacity onPress={toggleFavoriteHandler} style={styles.favoriteButton}>
                            <Icon
                                type={'MaterialCommunityIcons'}
                                name={userFavoritesIds && userFavoritesIds.some(fav => fav === selectedCocktail.idDrink) ? 'heart' : 'heart-outline'}
                                style={styles.heartIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goBack} style={styles.backButton}>
                            <Icon type={'MaterialCommunityIcons'} name='keyboard-backspace' style={styles.arrowBackIcon} />
                        </TouchableOpacity>
                        <View style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            marginTop: -15,
                            backgroundColor: 'white'
                        }}>
                            <View style={styles.info}>
                                <Text style={styles.title}>{name}</Text>
                                <Text note>
                                    {selectedCocktail.strAlcoholic}
                                    <Icon type="MaterialCommunityIcons" name="circle-small" style={styles.itemNote} />
                                    {selectedCocktail.strCategory}
                                    <Icon type="MaterialCommunityIcons" name="circle-small" style={styles.itemNote} />
                                    {selectedCocktail.strGlass}
                                </Text>
                                <Rating rating={cocktailRatingMap[id]} counter={reviewsCounter} large={true} />
                            </View>
                            <Tabs
                                tabBarUnderlineStyle={styles.tabBarUnderline} page={activeTab}
                                onChangeTab={({ ref }) => changeTabHandler(ref.key)}
                            >
                                <Tab
                                    heading={'Ingredients'}
                                    tabStyle={styles.whiteBack}
                                    textStyle={styles.textMuted}
                                    activeTabStyle={styles.whiteBack}
                                    activeTextStyle={styles.activeTabText}
                                >
                                    <IngredientList selectedCocktail={selectedCocktail} />
                                </Tab>
                                <Tab
                                    heading={'Instructions'}
                                    tabStyle={styles.whiteBack}
                                    textStyle={styles.textMuted}
                                    activeTabStyle={styles.whiteBack}
                                    activeTextStyle={styles.activeTabText}
                                >
                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.detailsTitle}>
                                            <Text note style={styles.detailsContent}>{selectedCocktail.strInstructions}</Text>
                                        </Text>
                                    </View>
                                </Tab>
                                <Tab
                                    heading={'Reviews'}
                                    tabStyle={styles.whiteBack}
                                    textStyle={styles.textMuted}
                                    activeTabStyle={styles.whiteBack}
                                    activeTextStyle={styles.activeTabText}
                                >
                                    <ReviewList
                                        navigation={navigation}
                                        idDrink={selectedCocktail.idDrink}
                                        strDrink={selectedCocktail.strDrink}
                                        strDrinkThumb={selectedCocktail.strDrinkThumb}
                                        showAddModal={showAddModal}
                                        setShowAddModal={setShowAddModal}
                                    />
                                </Tab>
                            </Tabs>
                        </View>
                    </ScrollView>
                    {activeTab === 2 ?
                        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
                            <Icon type={'Ionicons'} name="add" style={styles.addIcon} />
                        </TouchableOpacity>
                        : null}
                </View>
            </Provider>
        )
    }
};

export default CocktailDetails;