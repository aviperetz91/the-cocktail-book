import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Card, List, ListItem, Left, Body, Right, Thumbnail, Header, Button, Title, Icon, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCocktailById } from '../../store/actions/CocktailsActions';
import styles from './style';
import { IMAGES_URL } from '@env';

const CocktailDetails = props => {

    const dispatch = useDispatch();
    const selectedCocktail = useSelector(state => state.cocktails.selectedCocktail);
    const navigation = props.navigation;
    const id = props.route.params.id;
    const name = props.route.params.name;

    useEffect(() => {
        dispatch(getCocktailById(id))
    }, [dispatch])
    
    if (Object.keys(selectedCocktail).length > 0) {
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
                        <Text style={styles.listItemTitle}>{selectedCocktail.measureList[index]}</Text>
                    </Right>
                </ListItem>
            );
        })
        return (
            <ScrollView>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{name}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { }}>
                            <Icon name={'star-outline'} />
                        </Button>
                        <Button transparent onPress={() => navigation.navigate("Home")}>
                            <Icon name='home' />
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    <Image
                        style={styles.image}
                        source={{ uri: selectedCocktail.strDrinkThumb }}
                    />
                    <View style={{ padding: 7, marginTop: 10 }}>
                        <Text style={styles.title}>Ingredients</Text>
                        <Card>
                            <List>{ingredientAndMeasure}</List>
                        </Card>
                        <Text style={{ ...styles.title, marginTop: 15 }}>Instructions</Text>
                        <Card>
                            <View style={{ padding: 7 }}>
                                <Text style={styles.content}>{selectedCocktail.strInstructions}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.iconContainer}
                                activeOpacity={0.6}
                                onPress={() => Linking.openURL(selectedCocktail.strYoutube)} >
                                <Icon
                                    size={40}
                                    name="logo-youtube"
                                    color="#ff0000"
                                />
                                <Text style={styles.iconTitle}>Recipe Video</Text>
                            </TouchableOpacity>
                        </Card>
                    </View>
                </ScrollView>
            </ScrollView>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={'blue'} />
            </View>
        )
    }
};

export default CocktailDetails;