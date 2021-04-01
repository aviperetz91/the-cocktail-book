import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './style';

const CategoryItem = props => {

    const { title, onSelect, image, subTitle } = props;

    if (title) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={onSelect}>
                <ImageBackground source={image} style={styles.imageContainer} imageStyle={styles.image}>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        {title !== '' ?
                            <Text style={styles.subTitle}>
                                {`${subTitle} ITEMS`}
                            </Text> : null}
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    } else {
        return null
    }
}

export default CategoryItem;

