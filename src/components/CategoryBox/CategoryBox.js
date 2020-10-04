import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';

const CategoryBox = props => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.gridItem}
            onPress={props.onSelect}>
            <View>
                <Image source={props.image} style={styles.bgImage} />               
            </View>
            {props.title !== '' ?
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {props.title.length > 17 ? `${props.title.substring(0, 17)}...` : `${props.title}`}
                </Text>
            </View>
            : null }
        </TouchableOpacity>
    )
}

export default CategoryBox;

