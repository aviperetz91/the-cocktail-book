import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Thumbnail, Text, Button, Icon, Badge, List, ListItem, Spinner } from 'native-base';
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
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';
import { updateName, updatePhoto, signout } from '../../store/actions/UserActions';
import avatar from '../../assets/images/avatar2.png';
import Colors from '../../constants/Colors';

const Profile = props => {

    const { navigation } = props;
    const { userId } = props.route.params;
    const myId = useSelector(state => state.user.userId);
    const allReviews = useSelector(state => state.cocktails.reviews);
    const userReviews = allReviews.filter(rev => rev.userId === userId)
    const [user, setUser] = useState({ name: undefined, photo: undefined, favoritesIds: undefined })
    const [newName, setNewName] = useState();
    const [newPhoto, setNewPhoto] = useState();
    const [userFavorites, setUserFavorites] = useState();
    const [editMode, setEditMode] = useState(false);
    const [photoPopup, setPhotoPopup] = useState(false)
    const [isSavePressed, setIsSavePressed] = useState(false);
    const [isLoadiing, setIsLoading] = useState(false);
    const [render, setRender] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        setRender(false)
        getUserDetails();
        setTimeout(() => {
            setRender(true)
        }, 1000)
    }, [userId])

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

    const takePhotoHandler = () => {
        const options = {};
        ImagePicker.launchCamera(options, response => {
            if (response.uri) {
                ImageCropper.openCropper({
                    path: response.uri,
                    includeBase64: true
                }).then(image => {
                    setNewPhoto(image.path)
                    setPhotoPopup(false)
                })
            }
        });
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
                    setPhotoPopup(false)
                })
            }
        });
    }

    const clearPhotoHandler = () => {
        setNewPhoto(null);
        setPhotoPopup(false)
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

    const goToPhotoView = () => {
        if (user.photo) {
            navigation.navigate('PhotoView', {
                photoUri: newPhoto,
                choosePhotoHandler: choosePhotoHandler,
                saveHandler: saveHandler,
                clearPhotoHandler: clearPhotoHandler
            })
        }
    }

    if (!render) {
        return (
            <LoadingScreen />
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
                    <View style={{...styles.back, height: userId === myId ? 180 : 120 }}>
                        <Card>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.cardLeft} onPress={goToPhotoView}>
                                    <Thumbnail
                                        style={styles.thumbnail}
                                        square
                                        large
                                        source={newPhoto ? { uri: newPhoto } : avatar}
                                    />
                                    {editMode &&
                                        <View>
                                            <Badge style={styles.badgeRight}>
                                                <TouchableOpacity onPress={() => setPhotoPopup(true)}>
                                                    <Icon name="camera" style={styles.cameraIcon} />
                                                </TouchableOpacity>
                                            </Badge>
                                        </View>
                                    }
                                </TouchableOpacity>
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
                                        {newPhoto !== user.photo || newName !== user.name ? <Text style={styles.buttonText}>SAVE</Text> :
                                            editMode ? <Text style={styles.buttonText}>CANCEL</Text> :
                                                <Text style={styles.buttonText}>EDIT</Text>}
                                    </Button>
                                    <Button
                                        dark
                                        block
                                        style={styles.button}
                                        onPress={() => dispatch(signout())}
                                    >
                                        <Text style={styles.buttonText}>SIGNOUT</Text>
                                    </Button>
                                </View>}
                        </Card>
                        <Portal>
                            <Dialog visible={isSavePressed} onDismiss={() => setIsSavePressed(false)}>
                                <Dialog.Content>
                                    {isLoadiing ?
                                        <Spinner color={Colors.dark}/>
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
                        <Portal>
                            <Dialog visible={photoPopup} onDismiss={() => setPhotoPopup(false)}>
                                <Dialog.Title>Choose an option</Dialog.Title>
                                <Dialog.Content style={{paddingLeft: 10,}}>
                                    <List>
                                        <ListItem onPress={takePhotoHandler}>
                                            <Text>Take Photo...</Text>
                                        </ListItem>
                                        <ListItem onPress={choosePhotoHandler}>
                                            <Text>Choose from Library...</Text>
                                        </ListItem>
                                        <ListItem onPress={clearPhotoHandler}>
                                            <Text>Remove photo...</Text>
                                        </ListItem>
                                    </List>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Btn onPress={() => setPhotoPopup(false)}>Cancel</Btn>
                                </Dialog.Actions>
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