import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Thumbnail, Text, Button, Icon, Badge, Spinner } from 'native-base';
import { Provider, Paragraph, Dialog, Portal, Button as Btn } from 'react-native-paper';
import Header from '../../components/Header/Header';
import styles from './style';
import Colors from '../../constants/Colors';
import { API_URL } from '@env';
import axios from 'axios';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import CocktailList from '../../components/CocktailList/CocktailList';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import Card from '../../components/Card/Card';
import ImagePicker from 'react-native-image-picker';
import ImageCropper from 'react-native-image-crop-picker';
import { updateName, updatePhoto } from '../../store/actions/UserActions';
import avatar from '../../assets/images/avatar2.png';


const Profile = props => {

    const { navigation } = props;
    const { userId, userName, userPhoto, userFavoriteIds, userReviews } = useSelector(state => state.user);
    const [favorites, setFavorites] = useState();
    const [newName, setNewName] = useState(userName);
    const [newPhoto, setNewPhoto] = useState(userPhoto);
    const [editMode, setEditMode] = useState(false);
    const [isSavePressed, setIsSavePressed] = useState(false);
    const [isLoadiing, setIsLoading] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        getFavoritesByIds()
    }, [userFavoriteIds])

    getFavoritesByIds = async () => {
        const favorites = [];
        if (userFavoriteIds && userFavoriteIds.length > 0) {
            for (let i = 0; i < userFavoriteIds.length; i++) {
                const favItem = await axios.get(`${API_URL}/lookup.php?i=${userFavoriteIds[i]}`)
                favorites.push(favItem.data.drinks[0])
            }
            setFavorites(favorites)
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

    const getUserRatingAvg = () => {
        let sum = 0;
        if (userReviews && userReviews.length > 0) {
            userReviews.forEach(rev => sum += rev.rating);
            return sum / userReviews.length
        } else {
            return 0
        }
    }

    const requiredData = favorites && userReviews;

    if (!requiredData) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.dark} />
            </View>
        )
    } else {
        return (
            <Provider>
                <ScrollView contentContainerStyle={styles.screen}>
                    <Header
                        headerBackground={Colors.dark}
                        statusBarColor={'rgba(0,0,0,0.4)'}
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
                        <Card>
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
                                                <Icon name="camera" style={styles.cameraIcon} />
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
                                <Text style={styles.title}>My Favorites</Text>
                            </View>
                            <CocktailList
                                navigation={navigation}
                                horizontal
                                cocktails={favorites}
                            />

                        </View>
                        : null}
                    {userReviews && userReviews.length > 0 ?
                        <View style={userFavoriteIds ? styles.reviewsContainer : { ...styles.reviewsContainer, marginTop: 52 }}>
                            <View>
                                <Text style={styles.title}>My Last Reviews</Text>
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