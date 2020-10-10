import React, { useEffect } from 'react';
import { View, ScrollView, Image, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { List, Text, ListItem, Left, Body, Right, Thumbnail, Header, Tabs, Tab, TabHeading, Button, Title, Icon, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCocktailById, clearData } from '../../store/actions/CocktailsActions';
import styles from './style';
import { IMAGES_URL } from '@env';
import Wrapper from '../../components/Wrapper/Wrapper';
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
                        <Icon type={'MaterialIcons'} name='arrow-back' style={{ fontSize: 26, color: 'white' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goHome} style={styles.homeButton}>
                        <Icon type={'MaterialIcons'} name='home' style={{ fontSize: 25, color: 'white' }} />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Title style={styles.title}>{name}</Title>
                        <Text note>{selectedCocktail.strTags ? selectedCocktail.strTags : 'No Tags'}</Text>
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
                                    Category:
                                    <Text note style={styles.detailsContent}>   {selectedCocktail.strCategory}</Text>
                                </Text>
                                <Text style={styles.detailsTitle}>
                                    Type:
                                    <Text note style={styles.detailsContent}>   {selectedCocktail.strAlcoholic}</Text>
                                </Text>
                                <Text style={styles.detailsTitle}>
                                    Glass:
                                    <Text note style={styles.detailsContent}>   {selectedCocktail.strGlass}</Text>
                                </Text>
                                <Text style={styles.detailsTitle}>
                                    Instructions:
                                    <Text note style={styles.detailsContent}>   {selectedCocktail.strInstructions}</Text>
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