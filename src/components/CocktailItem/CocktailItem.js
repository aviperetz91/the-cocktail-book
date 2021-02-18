import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { Rating } from 'react-native-elements';
import styles from './style';

const CocktailItem = props => {
    const { onSelect, image, title, alcoholic, category, glass, rating } = props;
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onSelect}>
            <View>
                <Image style={styles.itemImage} square source={{ uri: image }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemNote}>{`${alcoholic}, ${category}, ${glass}`}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <Rating
                    readonly
                    startingValue={rating ? rating : 0}
                    showRating={false}
                    imageSize={16}
                />
            </View>
        </TouchableOpacity>
    );
}

export default CocktailItem;