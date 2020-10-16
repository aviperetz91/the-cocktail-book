import React, { useEffect } from 'react';
import { View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { List, Text, ListItem, Left, Body, Right, Thumbnail, Tabs, Tab, Icon, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCocktailById, clearData } from '../../store/actions/CocktailsActions';
import styles from './style';
import { IMAGES_URL } from '@env';
import Colors from '../../constants/Colors';

const CocktailDetails = props => {

    const navigation = props.navigation;
    const id = props.route.params.id;
    const name = props.route.params.name;

    const selectedCocktail = useSelector(state => state.cocktails.selectedCocktail);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCocktailById(id))
    }, [dispatch])

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
        const ingredientAndMeasure = selectedCocktail.ingredientList.map((ingredient, index) => {
            return (
                <ListItem thumbnail key={index}>
                    <Left>
                        <Thumbnail source={{ uri: `${IMAGES_URL}/ingredients/${ingredient}.png` }} />
                    </Left>
                    <Body>
                        <Text style={styles.listItemTitle}>{ingredient}</Text>
                    </Body>
                    <Right>
                        <Text note>{selectedCocktail.measureList[index]}</Text>
                    </Right>
                </ListItem>
            );
        })
        return (
            <View style={styles.screen}>
                <StatusBar translucent hidden={true} />
                <ScrollView>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: selectedCocktail.strDrinkThumb }} />
                    </View>
                    <TouchableOpacity onPress={() => console.log("Favorite!")} style={styles.favoriteButton}>
                        <Icon type={'FontAwesome'} name='heart' style={{ fontSize: 20, color: 'red' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goBack} style={styles.backButton}>
                        <Icon type={'MaterialCommunityIcons'} name='keyboard-backspace' style={{ fontSize: 29, color: 'white' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goHome} style={styles.homeButton}>
                        <Icon type={'MaterialCommunityIcons'} name='home' style={{ fontSize: 25, color: 'white' }} />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{name}</Text>
                            <Text note>{selectedCocktail.strGlass}</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text>* ratings *</Text>
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
                            <List>{ingredientAndMeasure}</List>
                        </Tab>
                        <Tab
                            heading={'Details'}
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
                        </Tab>
                    </Tabs>
                </ScrollView>
            </View>
        )
    }
};

export default CocktailDetails;