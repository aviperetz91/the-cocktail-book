import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, ListItem, Left, Body, Thumbnail } from 'native-base';
import Rating from '../Rating/Rating';
import moment from 'moment';
import avatar from '../../assets/images/avatar.jpg';
import styles from './style';
import storage from '@react-native-firebase/storage';


const ReviewItem = props => {

    const { navigation ,review, userId, profileFlag } = props;
    const [autorPhoto, setAutorPhoto] = useState();

    useEffect(() => {
        getAutorPhoto()
    }, [])

    const getAutorPhoto = async () => {
        if (!profileFlag) {
            const url = await storage().ref(`/images/users/${userId}`).getDownloadURL();
            setAutorPhoto(url);
        }
    }

    const navigate = () => {
        navigation.navigate('CocktailDetails', {
            id: review.idDrink,
            name: review.strDrink
        })
    }

    const selectItem = () => {
        if (profileFlag) {
            navigate()
        } else {
            return
        }
    }

    const thumbnailStyles = {
        marginLeft: profileFlag ? 0 : 8,
        width: profileFlag ? 70 : 60,
        height: profileFlag ? 70 : 60,
        borderRadius: profileFlag ? 10 : 30,
    }

    return (
        <ListItem onPress={selectItem} style={styles.listItem} thumbnail>
            <Left style={styles.avatarContainer}>
                <Thumbnail
                    style={thumbnailStyles}
                    source={
                        profileFlag ? { uri: review.strDrinkThumb } :
                        autorPhoto ? { uri: autorPhoto } : avatar
                    }
                />
            </Left>
            <Body>
                <Text style={styles.reviewAutor}>{profileFlag ? review.strDrink : review.autor}</Text>
                <Text style={styles.reviewContent}>{review.content}</Text>
                <Text note style={styles.reviewTimeText}>{moment(review.date).fromNow()}</Text>
            </Body>
            <View>
                <View style={styles.reviewRatingContainer}>
                    <Rating rating={review.rating} hideCounter/>
                </View>
            </View>
        </ListItem>
    )
}

export default ReviewItem;