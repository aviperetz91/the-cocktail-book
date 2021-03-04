import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'native-base';
import Rating from '../Rating/Rating';
import styles from './style';

const CocktailItem = props => {

    const { onSelect, idDrink, image, title, alcoholic, category, glass } = props;
    const { reviews, cocktailRatingMap } = useSelector(state => state.cocktails);
    const reviewsCounter = reviews.filter(rev => rev.idDrink === idDrink).length

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onSelect}>
            <View>
                <Image style={styles.itemImage} square source={{ uri: image }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text note style={styles.itemNote}>{`${alcoholic}, ${category}, ${glass}`}</Text>
                <Rating rating={cocktailRatingMap[idDrink]} counter={reviewsCounter}  />
            </View>
        </TouchableOpacity>
    );
}

export default CocktailItem;