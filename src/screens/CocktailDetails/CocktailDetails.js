import React, { useEffect } from 'react';
import { View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Tabs, Tab, Icon, Spinner } from 'native-base';
import { Rating } from 'react-native-elements';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getCocktailById, toggleFavorite, clearData } from '../../store/actions/CocktailsActions';
import { getReviewsById } from '../../store/actions/ReviewsActions';
import styles from './style';
import Colors from '../../constants/Colors';
import IngredientList from './IngredientList/IngredientList';
import Reviews from './Reviews/Reviews';

const CocktailDetails = props => {

    const navigation = props.navigation;
    const id = props.route.params.id;
    const name = props.route.params.name;

    const selectedCocktail = useSelector(state => state.cocktails.selectedCocktail);
    const ratingAvg = useSelector(state => state.reviews.ratingAvg);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCocktailById(id))
        dispatch(getReviewsById(id))
    }, [dispatch])

    const toggleFavoriteHandler = () => {
        dispatch(toggleFavorite(selectedCocktail.idDrink, userId, token))
    }

    const goBack = () => {
        dispatch(clearData('selectedCocktail'))
        navigation.goBack()
    }

    const goHome = () => {
        dispatch(clearData('selectedCocktail'))
        navigation.navigate("Home")
    }

    if (!selectedCocktail) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            <Provider>
                <View style={styles.screen}>
                    <StatusBar translucent hidden={true} />
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: selectedCocktail.strDrinkThumb }} />
                        </View>
                        <TouchableOpacity onPress={toggleFavoriteHandler} style={styles.favoriteButton}>
                            <Icon type={'FontAwesome'} name='heart' style={{ fontSize: 20, color: 'red' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goBack} style={styles.backButton}>
                            <Icon type={'MaterialCommunityIcons'} name='keyboard-backspace' style={{ fontSize: 29, color: 'white' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goHome} style={styles.homeButton}>
                            <Icon type={'MaterialCommunityIcons'} name='home' style={{ fontSize: 25, color: 'white' }} />
                        </TouchableOpacity>
                        <View style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            marginTop: -15,
                            backgroundColor: 'white'
                        }}>
                            <View style={styles.container}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>{name}</Text>
                                    <Text note>{selectedCocktail.strGlass}</Text>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <Rating
                                        readonly
                                        startingValue={ratingAvg}
                                        showRating={false}
                                        imageSize={20}
                                    />
                                </View>
                            </View>
                            <Tabs tabBarUnderlineStyle={styles.tabBarUnderline}>
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
                                    <Reviews idDrink={selectedCocktail.idDrink} />
                                </Tab>
                            </Tabs>
                        </View>
                    </ScrollView>
                </View>
            </Provider>
        )
    }
};

export default CocktailDetails;