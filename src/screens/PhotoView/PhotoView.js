import React from 'react';
import { StyleSheet, Platform, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

const PhotoView = props => {

    const { navigation } = props;
    const { photoUri } = props.route.params;

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.closeButton} onPress={navigation.goBack}>
                <Icon name="close-outline" style={styles.closeIcon} />
            </TouchableOpacity>
            <Image
                style={styles.imageContainer}
                source={{ uri: photoUri }}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    imageContainer: {
        width: '100%',
        height: 400,
        backgroundColor: 'black',
    },
    closeButton: {
        width: '100%',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        left: 10
    },
    closeIcon: {
        color: 'white',
        fontSize: 40
    }
})

export default PhotoView;