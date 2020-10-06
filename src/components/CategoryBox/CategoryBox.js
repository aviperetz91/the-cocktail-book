import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';

const CategoryBox = props => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={props.title === '' ? { ...styles.gridItem, backgroundColor: 'white' } : styles.gridItem}
            onPress={props.onSelect}>
            <View>
                <Image source={props.image} style={styles.bgImage} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {/* {props.title.length > 17 ? `${props.title.substring(0, 17)}...` : `${props.title}`} */}
                    {props.title}
                </Text>                
            </View>
        </TouchableOpacity>
    )
}

export default CategoryBox;

