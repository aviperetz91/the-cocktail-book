import React from 'react';
import { View, Text } from 'react-native';
import { Rating as RNERating } from 'react-native-elements';
import styles from './style';
import Colors from '../../constants/Colors';

const Rating = props => {

    const { rating, counter, large, hideCounter } = props;

    return (
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingValue}>{`${rating ? rating : 0}  `}</Text>
            <RNERating
                readonly
                type="custom"                
                ratingBackgroundColor={Colors.lightGrey}
                startingValue={rating ? rating : 0}
                showRating={false}
                imageSize={large ? 17 : 14}
            />
            {!hideCounter && <Text style={styles.ratingValue}>{counter ? `  (${counter})` : `  (0)`}</Text>}
        </View>

    );
}

export default Rating;