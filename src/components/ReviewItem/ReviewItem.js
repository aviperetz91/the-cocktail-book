import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, ListItem, Left, Body, Thumbnail } from 'native-base';
import { Rating } from 'react-native-elements';
import moment from 'moment';
import styles from './style';


const ReviewItem = props => {

    const { review, profileFlag, selectHandler } = props;

    const selectItem = () => {
        if (profileFlag) {
            selectHandler()
        } else {
            return
        }
    }

    const thumbnailStyles = {
        marginLeft: profileFlag ? 0 : 8,
        width: profileFlag ? 70 : 60,
        height: profileFlag ? 70 : 60,
        borderRadius: profileFlag ? 10 : 0,
    }

    return (
        <ListItem onPress={selectItem} style={styles.listItem} thumbnail>
            <Left style={styles.avatarContainer}>
                <Thumbnail
                    style={thumbnailStyles}
                    square={profileFlag ? true : false}
                    source={{ uri: profileFlag ? review.strDrinkThumb : 'https://www.computerhope.com/jargon/g/guest-user.jpg' }}
                />
            </Left>
            <Body>
                <Text style={styles.reviewAutor}>{profileFlag ? review.strDrink : review.autor}</Text>
                <Text style={styles.reviewContent}>{review.content}</Text>
                <Text note style={styles.reviewTimeText}>{moment(review.date).fromNow()}</Text>
            </Body>
            <View>
                <View style={styles.reviewRatingContainer}>
                    <Rating
                        readonly
                        startingValue={review.rating}
                        showRating={false}
                        imageSize={16}
                    />
                </View>
            </View>
        </ListItem>
    )
}

export default ReviewItem;