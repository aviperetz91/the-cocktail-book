import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './style';

const CocktailCard = props => {
    return (                     
        <TouchableOpacity style={styles.itemContainer} onPress={props.selectHandler}>
            <View>
                <Image style={styles.itemImage} square source={{ uri: props.image }} />
            </View>
            <View style={{ marginTop: 12, marginLeft: 4 }}>
                <Text style={styles.itemTitle}>{props.title}</Text>
                <Text style={styles.itemNote}>{props.category}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CocktailCard;