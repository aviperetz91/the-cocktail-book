import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './style';

const CocktailItem = props => {
    return (                     
        <TouchableOpacity style={styles.itemContainer} onPress={props.onSelect}>
            <View>
                <Image style={styles.itemImage} square source={{ uri: props.image }} />
            </View>
            <View style={{ marginLeft: 15 }}>
                <Text style={styles.itemTitle}>{props.title}</Text>
                <Text style={styles.itemNote}>* Some Tags *</Text>
                <Text>* Ratings *</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CocktailItem;