import React from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const BrowseByFirstLetter = props => {

    const { navigation } = props;
    const { cocktails } = useSelector(state => state.cocktails);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const selectHandler = (letter) => {
        navigation.navigate('Cocktails', {
            title: `Starts with -${letter}-`,
            cocktails: cocktails.filter(drink => drink.strDrink.startsWith(letter))
        })
    }

    return (
        <View style={styles.container}>
            {letters.map((letter, index) => (
                <TouchableOpacity key={index.toString()} style={styles.letterCube} onPress={() => selectHandler(letter)}>
                    <Text style={styles.letterText}>{`${letter}`}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        paddingRight: 10
    },
    letterCube: {
        backgroundColor: '#e7e7e7', 
        width: 35, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 2, 
        padding: 5,
        borderRadius: 8
    },
    letterText: {
        color: '#565656',
        fontSize: Platform.OS === 'android' ? 25 : 27,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2, 
    }
})

export default BrowseByFirstLetter
