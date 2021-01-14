import React, { useState, Fragment, useEffect } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, CardItem, Thumbnail, Text, Title, Body, Content, Left, Right, Button, Label, Input, Item, Icon, Footer, Spinner } from 'native-base';
import Header from '../../components/Header/Header';
import styles from './style';
import Colors from '../../constants/Colors';
import { API_URL } from '@env';
import axios from 'axios'
import database from '@react-native-firebase/database';
import CocktailCard from '../../components/CocktailCard/CocktailCard';             


const Profile = props => {

    const navigation = props.navigation;
    const favoriteIds = useSelector(state => state.cocktails.favorites);
    const userData = useSelector(state => state.auth);
    const [favorites, setFavorites] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getUserFavorites();
        getUserReviews();
    }, [])

    const getUserFavorites = () => {
        let favTemp = [];
        const savedPromises = [];
        favoriteIds.forEach(id => {
            savedPromises.push(axios.get(`${API_URL}/lookup.php?i=${id}`))
        })
        Promise.all(savedPromises)
        .then(res => {
            res.forEach(item => {
                favTemp.push(item.data.drinks[0])
            })
            console.log(favTemp)
            setFavorites(favTemp)
        })
        .catch(err => console.log(err))
    }

    const getUserReviews = async () => {
        let revTemp = [];
        const snapshot = await database().ref(`users/${userData.userId}/reviews`).once('value')
        const reviewsObj = snapshot.val()
        if (reviewsObj) {
            for (let index in reviewsObj) {
                revTemp.push(reviewsObj[index])
            }
            console.log(revTemp)
            setReviews(revTemp)
        }
    }

    const getRatingAvg = () => {
        let sum = 0;
        reviews.forEach(rev => sum += rev.rating);
        return sum / reviews.length
    }

    const navigate = (item) => {
        navigation.navigate('CocktailDetails', {
            id: item.idDrink,
            name: item.strDrink
        })
    }

    return (
        <Fragment>
            <Header
                headerBackground={Colors.dark}
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
            <View style={styles.back}>
                <Card style={styles.card}>
                    <View style={styles.container}>
                        <View style={styles.cardLeft}>
                            <Thumbnail style={styles.thumbnail} square large source={{ uri: 'https://cdn.onlinewebfonts.com/svg/img_149464.png' }} />
                        </View>
                        <View style={styles.cardRight}>
                            <Text style={styles.title}>{userData.userName}</Text>
                            <View style={styles.status}>
                                <View style={{ marginRight: 8 }}>
                                    <Text style={styles.statusNote}>Reviews</Text>
                                    <Text style={styles.statusVal}>
                                        {reviews && reviews.length ? reviews.length : 0}
                                    </Text>
                                </View>
                                <View style={{ marginRight: 8 }}>
                                    <Text style={styles.statusNote}>Rating</Text>
                                    <Text style={styles.statusVal}>{getRatingAvg().toFixed(1)}</Text>
                                </View>
                                <View>
                                    <Text style={styles.statusNote}>Favorites</Text>
                                    <Text style={styles.statusVal}>
                                        {favorites && favorites.length ?  favorites.length : 0}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Button 
                        bordered 
                        block 
                        dark
                        style={{ marginTop: 16 }} 
                        onPress={() => console.log("Edit")}
                    >
                        <Text>Edit</Text>
                    </Button>
                </Card>
            </View>
            <View style={styles.favoritsContainer}>
                <View>
                    <Text style={styles.title}>Favorites</Text>
                </View>
                <FlatList 
                    keyExtractor={(item, index) => item.idDrink}
                    data={favorites}
                    horizontal
                    renderItem={({ item }) => (
                        <CocktailCard
                            title={item.strDrink}
                            image={item.strDrinkThumb}
                            tags={item.strTags}
                            category={item.strCategory}
                            onSelect={() => navigate(item)}
                        />
                    )}
                />
            </View>
        </Fragment>
    );
}

export default Profile;