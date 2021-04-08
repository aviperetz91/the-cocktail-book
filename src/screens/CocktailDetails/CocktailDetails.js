import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Tabs, Tab, Icon, Spinner } from 'native-base';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getCocktailById, clearData } from '../../store/actions/CocktailsActions';
import { toggleFavorite } from '../../store/actions/UserActions';
import styles from './style';
import Colors from '../../constants/Colors';
import IngredientList from './IngredientList/IngredientList';
import Reviews from './Reviews/Reviews';
import Rating from '../../components/Rating/Rating';

const CocktailDetails = props => {

    const { navigation } = props;
    const { id, name } = props.route.params;
    const { selectedCocktail, cocktailRatingMap, reviews } = useSelector(state => state.cocktails);
    const { userId, userFavoriteIds } = useSelector(state => state.user);
    const [activeTab, setActiveTab] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const reviewsCounter = reviews.filter(rev => rev.idDrink === id).length

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCocktailById(id))
    }, [dispatch])

    const toggleFavoriteHandler = () => {
        dispatch(toggleFavorite(userFavoriteIds, selectedCocktail.idDrink, userId))
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
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.dark} />
            </View>
        )
    } else {
        return (
            <Provider>
                <View style={styles.screen}>
                    <StatusBar translucent hidden/>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: selectedCocktail.strDrinkThumb }} />
                        </View>
                        <TouchableOpacity onPress={toggleFavoriteHandler} style={styles.favoriteButton}>
                            <Icon
                                type={'MaterialCommunityIcons'}
                                name={userFavoriteIds && userFavoriteIds.some(fav => fav === selectedCocktail.idDrink) ? 'heart' : 'heart-outline'}
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
                                    <Icon type="MaterialCommunityIcons" name="circle-small" style={styles.itemNote}/>
                                    {selectedCocktail.strCategory}
                                    <Icon type="MaterialCommunityIcons" name="circle-small" style={styles.itemNote}/>
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
                                    <Reviews
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