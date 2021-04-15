import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Thumbnail, Text, Button, Icon, Badge } from 'native-base';
import { Provider, Paragraph, Dialog, Portal, Button as Btn } from 'react-native-paper';
import Header from '../../components/Header/Header';
import styles from './style';
import { API_URL } from '@env';
import axios from 'axios';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import CocktailList from '../../components/CocktailList/CocktailList';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';
import { updateName, updatePhoto, signout } from '../../store/actions/UserActions';
import avatar from '../../assets/images/avatar2.png';

const Profile = props => {

    const { navigation } = props;
    const { userId } = props.route.params;
    const myId = useSelector(state => state.user.userId);
    const allReviews = useSelector(state => state.cocktails.reviews);
    const userReviews = allReviews.filter(rev => rev.userId === userId)
    const [user, setUser] = useState({ name: undefined, photo: undefined, favoritesIds: undefined })
    const [newName, setNewName] = useState();
    const [newPhoto, setNewPhoto] = useState();
    const [expandPhoto, setExpandPhoto] = useState(false);
    const [userFavorites, setUserFavorites] = useState();
    const [editMode, setEditMode] = useState(false);
    const [isSavePressed, setIsSavePressed] = useState(false);
    const [isLoadiing, setIsLoading] = useState(false);
    const [render, setRender] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        getUserDetails();
        setTimeout(() => {
            setRender(true)
        }, 1500)
    }, [])

    const getUserDetails = () => {
        database().ref(`users/${userId}`).on('value', userData => {
            const user = userData.val();
            const favoritesIds = user.favoritesIds ? Object.keys(user.favoritesIds) : null;
            setUser({
                name: user.userName,
                photo: user.userPhoto,
                favoritesIds: favoritesIds,
            })
            setNewName(user.userName);
            setNewPhoto(user.userPhoto);

            getFavoriteCocktailsByIds(favoritesIds);
        })
    }

    const getFavoriteCocktailsByIds = async (favoritesIds) => {
        const userFavorites = [];
        if (favoritesIds && favoritesIds.length > 0) {
            for (let i = 0; i < favoritesIds.length; i++) {
                const favItem = await axios.get(`${API_URL}/lookup.php?i=${favoritesIds[i]}`)
                userFavorites.push(favItem.data.drinks[0])
            }
            setUserFavorites(userFavorites)
        } else {
            setUserFavorites(null)
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

    const clearPhoto = () => {
        setNewPhoto(null);
    }

    const buttonPressHandler = () => {
        if (newPhoto !== user.photo || newName !== user.name) {
            saveHandler()
        }
        setEditMode(!editMode)
    }

    const saveHandler = async () => {
        setIsSavePressed(true);
        setIsLoading(true)
        try {
            if (newPhoto !== user.photo) {
                if (!newPhoto) {
                    await storage().ref(`/images/users/${userId}`).delete();
                    await database().ref(`users/${userId}`).update({ userName: newName, userPhoto: newPhoto });
                    dispatch(updatePhoto(newPhoto))
                } else {
                    await storage().ref(`/images/users/${userId}`).putFile(newPhoto);
                    const url = await storage().ref(`/images/users/${userId}`).getDownloadURL();
                    await database().ref(`users/${userId}`).update({ userName: newName, userPhoto: url });
                    dispatch(updatePhoto(url))
                    setNewPhoto(url)
                }
                dispatch(updateName(newName))
            } else {
                await database().ref(`users/${userId}`).update({ userName: newName });
                dispatch(updateName(newName))
            }
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    const getUserRatingAvg = () => {
        let sum = 0;
        if (userReviews && userReviews.length > 0) {
            userReviews.forEach(rev => sum += rev.rating);
            return sum / userReviews.length
        } else {
            return 0
        }
    }

    if (!render) {
        return (
            <Spinner />
        )
    } else {
        return (
            <Provider>
                <ScrollView contentContainerStyle={styles.screen}>
                    <Header
                        headerBackground={'black'}
                        statusBarColor={'rgba(0,0,0,0.4)'}
                        iosBarStyle={'light-content'}
                        pressHandler={navigation.goBack}
                        iconType={'MaterialCommunityIcons'}
                        iconName={'keyboard-backspace'}
                        iconColor={'white'}
                        iconSize={32}
                        titleColor={'white'}
                        letterSpacing={4}
                    />
                    <View style={styles.back}>
                        <Card>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.cardLeft} onPress={() => setExpandPhoto(true)}>
                                    <Thumbnail
                                        style={styles.thumbnail}
                                        square
                                        large
                                        source={newPhoto ? { uri: newPhoto } : avatar}
                                    />
                                    {editMode &&
                                        <View>
                                            <Badge style={styles.badgeRight}>
                                                <TouchableOpacity onPress={choosePhotoHandler}>
                                                    <Icon name="camera" style={styles.cameraIcon} />
                                                </TouchableOpacity>
                                            </Badge>
                                            {user.photo &&
                                                <Badge style={styles.badgeLeft}>
                                                    <TouchableOpacity onPress={clearPhoto}>
                                                        <Icon name="trash" style={styles.cameraIcon} />
                                                    </TouchableOpacity>
                                                </Badge>}
                                        </View>
                                    }
                                </TouchableOpacity>
                                <Portal>        
                                    <Dialog visible={expandPhoto} onDismiss={() => setExpandPhoto(false)}>
                                        <Dialog.Content style={styles.expandedThumbnailContainer}>
                                            <Thumbnail
                                                style={styles.expandedThumbnail}
                                                square
                                                large
                                                source={newPhoto ? { uri: newPhoto } : avatar}
                                            />
                                        </Dialog.Content>
                                    </Dialog>
                                </Portal>
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
                                                {userReviews && userReviews.length ? userReviews.length : 0}
                                            </Text>
                                        </View>
                                        <View style={{ marginRight: 8 }}>
                                            <Text style={styles.statusNote}>Rating</Text>
                                            <Text style={styles.statusVal}>{getUserRatingAvg().toFixed(1)}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.statusNote}>Favorites</Text>
                                            <Text style={styles.statusVal}>
                                                {userFavorites && userFavorites.length ? userFavorites.length : 0}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {userId === myId &&
                                <View style={styles.buttonsContainer}>
                                    <Button
                                        bordered
                                        block
                                        dark
                                        style={styles.button}
                                        onPress={buttonPressHandler}
                                    >
                                        {newPhoto !== user.photo || newName !== user.name ? <Text>SAVE</Text> :
                                            editMode ? <Text>CANCEL</Text> :
                                                <Text>EDIT</Text>}
                                    </Button>
                                    <Button
                                        dark
                                        block
                                        style={styles.button}
                                        onPress={() => dispatch(signout())}
                                    >
                                        <Text>SIGNOUT</Text>
                                    </Button>
                                </View>}
                        </Card>
                        <Portal>
                            <Dialog visible={isSavePressed} onDismiss={() => setIsSavePressed(false)}>
                                <Dialog.Content>
                                    {isLoadiing ?
                                        <Spinner />
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

                    {userFavorites && userFavorites.length > 0 ?
                        <View style={styles.favoritsContainer}>
                            <View>
                                <Text style={styles.title}>{userId === myId ? 'My Favorites' : 'Favorites'}</Text>
                            </View>
                            <CocktailList
                                navigation={navigation}
                                cocktails={userFavorites}
                                card
                                size={'small'}
                            />

                        </View>
                        : null}
                    {userReviews && userReviews.length > 0 ?
                        <View style={userFavorites && userFavorites.length > 0 ? styles.reviewsContainer : { ...styles.reviewsContainer, marginTop: 38 }}>
                            <View>
                                <Text style={styles.title}>{userId === myId ? 'My Last Reviews' : 'Last Reviews'}</Text>
                            </View>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={userReviews.slice(0, 5)}
                                renderItem={({ item }) => <ReviewItem navigation={navigation} review={item} profileFlag />}
                            />
                        </View>
                        : null}
                </ScrollView>
            </Provider>
        );
    }
}

export default Profile;