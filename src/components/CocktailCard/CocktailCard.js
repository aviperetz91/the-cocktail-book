import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from 'native-base';
import Rating from '../Rating/Rating';
import styles from './style';

const CocktailCard = props => {

    const { selectHandler, idDrink, image, title, category } = props;
    const { reviews, cocktailRatingMap } = useSelector(state => state.cocktails);
    const reviewsCounter = reviews.filter(rev => rev.idDrink === idDrink).length

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={selectHandler}>
            <View>
                <Image style={styles.itemImage} square source={{ uri: image }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text note style={styles.itemNote}>{category}</Text>
                <Rating rating={cocktailRatingMap[idDrink]} counter={reviewsCounter}  />
            </View>
        </TouchableOpacity>
    );
}

export default CocktailCard;