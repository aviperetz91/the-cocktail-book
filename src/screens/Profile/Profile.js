import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Thumbnail, Text, Button, Icon, Badge, Spinner } from 'native-base';
import { Provider, Paragraph, Dialog, Portal, Button as Btn } from 'react-native-paper';
import Header from '../../components/Header/Header';
import styles from './style';
import Colors from '../../constants/Colors';
import { API_URL } from '@env';
import axios from 'axios'
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import CocktailCard from '../../components/CocktailCard/CocktailCard';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';
import { updateName, updatePhoto } from '../../store/actions/AuthActions';
import avatar from '../../assets/images/avatar2.png'

const Profile = props => {

    const navigation = props.navigation;
    const favoriteIds = useSelector(state => state.cocktails.favorites);
    const { userId, userName, userPhoto } = useSelector(state => state.auth);
    const [newName, setNewName] = useState(userName);
    const [newPhoto, setNewPhoto] = useState(userPhoto);
    const [favorites, setFavorites] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isSavePressed, setIsSavePressed] = useState(false);
    const [isLoadiing, setIsLoading] = useState(false);

    const dispatch = useDispatch()

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
                setFavorites(favTemp)
            })
            .catch(err => console.log(err))
    }

    const getUserReviews = async () => {
        let revTemp = [];
        const snapshot = await database().ref(`users/${userId}/reviews`).once('value')
        const reviewsObj = snapshot.val()
        if (reviewsObj) {
            for (let index in reviewsObj) {
                revTemp.push(reviewsObj[index])
            }
            setReviews(revTemp)
        }
    }

    const choosePhotoHandler = () => {
        const options = {};
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                ImageCropper.openCropper({
                    path: response.uri,
                    includeBase64: true
                }).then(image => {
                    setNewPhoto(image.path)
                })
            }
        });
    }

    const buttonPressHandler = () => {
        if (newPhoto !== userPhoto || newName !== userName) {
            saveHandler()
        }
        setEditMode(!editMode)
    }

    const saveHandler = async () => {
        console.log("SAVE!")
        setIsSavePressed(true);
        setIsLoading(true)
        if (newPhoto !== userPhoto) {
            await storage().ref(`/images/users/${userId}`).putFile(newPhoto);
            const url = await storage().ref(`/images/users/${userId}`).getDownloadURL();
            await database().ref(`users/${userId}`).update({ userName: newName, userPhoto: url });
            setNewPhoto(url)
            dispatch(updatePhoto(url))
            dispatch(updateName(newName))
        } else {
            await database().ref(`users/${userId}`).update({ userName: newName });
            dispatch(updateName(newName))
        }
        setIsLoading(false)
    }

    const getRatingAvg = () => {
        let sum = 0;
        reviews.forEach(rev => sum += rev.rating);
        if (reviews.length > 0) {
            return sum / reviews.length
        } else {
            return 0
        }
    }

    const navigate = (item) => {
        navigation.navigate('CocktailDetails', {
            id: item.idDrink,
            name: item.strDrink
        })
    }

    return (
        <Provider>
            <ScrollView contentContainerStyle={styles.screen}>
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
                            <View style={styles.cardLeft} onPress={choosePhotoHandler}>
                                <Thumbnail
                                    style={styles.thumbnail}
                                    square
                                    large
                                    source={newPhoto ? { uri: newPhoto } : avatar}
                                />
                                {editMode ?
                                    <Badge style={styles.badge}>
                                        <TouchableOpacity onPress={choosePhotoHandler}>
                                            <Icon name="camera" style={{ fontSize: 18, color: "#fff" }} />
                                        </TouchableOpacity>
                                    </Badge>
                                    : null}
                            </View>
                            <View style={styles.cardRight}>
                                <View style={styles.rowSpaceBetween}>
                                    {editMode ?
                                        <TextInput
                                            style={{ ...styles.title, padding: 0, margin: 0 }}
                                            value={newName}
                                            onChangeText={input => setNewName(input)}
                                        />
                                        :
                                        <Text style={styles.title}>{newName}</Text>
                                    }
                                    {editMode ?
                                        <Icon
                                            name={'pencil-outline'}
                                            style={{ fontSize: 18 }}
                                        />
                                        : null}
                                </View>
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
                                            {favorites && favorites.length ? favorites.length : 0}
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
                            onPress={buttonPressHandler}
                        >
                            {newPhoto !== userPhoto || newName !== userName ? <Text>Save</Text> :
                                editMode ? <Text>Cancel</Text> :
                                    <Text>Edit</Text>}
                        </Button>
                    </Card>
                    <Portal>
                        <Dialog visible={isSavePressed} onDismiss={() => setIsSavePressed(false)}>
                            <Dialog.Content>
                                {isLoadiing ?
                                    <Spinner color={Colors.dark} />
                                    :
                                    <Paragraph>Your info was saved successfully</Paragraph>
                                }
                            </Dialog.Content>
                            {!isLoadiing ?
                                <Dialog.Actions>
                                    <Btn onPress={() => setIsSavePressed(false)}>Great!</Btn>
                                </Dialog.Actions> : null}
                        </Dialog>
                    </Portal>
                </View>
                {favorites && favorites.length > 0 ?
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
                                    selectHandler={() => navigate(item)}
                                />
                            )}
                        />

                    </View>
                : null}
                {reviews && reviews.length > 0 ?
                    <View style={styles.reviewsContainer}>
                        <View>
                            <Text style={styles.title}>Reviews</Text>
                        </View>
                        <FlatList
                            keyExtractor={(item, index) => item.idDrink + item.date}
                            data={reviews}
                            renderItem={({ item }) => (
                                <ReviewItem
                                    review={item}
                                    selectHandler={() => navigate(item)}
                                    profileFlag
                                />
                            )}
                        />
                    </View>
                : null}
            </ScrollView>
        </Provider>
    );
}

export default Profile;