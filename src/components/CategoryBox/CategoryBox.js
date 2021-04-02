import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';

const CategoryBox = props => {

    const { title, subTitle, image, onSelect } = props;

    if (title) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.gridItem}
                onPress={onSelect}>
                <View>
                    <Image source={image} style={styles.bgImage} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.subTitle}>
                        {`${subTitle} ITEMS`}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <View style={{ ...styles.gridItem, backgroundColor: 'white' }}></View>
        )
    }
}

export default CategoryBox;

