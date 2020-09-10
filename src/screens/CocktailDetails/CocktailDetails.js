import React, { useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { List, ListItem, Left, Body, Right, Thumbnail, Header, Button, Title, Icon, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCocktailById } from '../../store/actions/CocktailsActions';
import styles from './style';
import { IMAGES_URL } from '@env';
import DarkenImg from '../../components/DarkenImg/DarkenImg';
import Colors from '../../constants/Colors';

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
            <ScrollView style={{backgroundColor: 'white'}}>
                <ScrollView>
                    <ImageBackground style={styles.image} source={{ uri: selectedCocktail.strDrinkThumb }}>
                        <DarkenImg>
                            <Header style={styles.header} androidStatusBarColor={'black'}>
                                <Left>
                                    <Button transparent onPress={() => navigation.goBack()}>
                                        <Icon name='arrow-back' />
                                    </Button>
                                </Left>
                                <Right>
                                    <Button transparent onPress={() => { }}>
                                        <Icon name={'star-outline'} />
                                    </Button>
                                    <Button transparent onPress={() => navigation.navigate("Home")}>
                                        <Icon name='home' />
                                    </Button>
                                </Right>
                            </Header>
                            <View style={styles.titleContainer}>
                                <Title style={styles.title}>{name}</Title>
                            </View>
                        </DarkenImg>
                    </ImageBackground>
                    <View style={styles.container}>
                        <List>{ingredientAndMeasure}</List>
                        <View header style={styles.subTitleContainer}>
                            <Text style={styles.subTitle}>Instructions</Text>
                        </View>
                        <View style={{ padding: 20, paddingTop: 10 }}>
                            <Text style={styles.content}>{selectedCocktail.strInstructions}</Text>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
        )
    } else {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    }
};

export default CocktailDetails;