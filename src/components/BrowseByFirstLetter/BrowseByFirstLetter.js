import React from 'react';
import { Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';


const BrowseByFirstLetter = props => {

    const { navigation } = props;
    const { cocktails } = useSelector(state => state.cocktails);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const selectHandler = (letter) => {
        navigation.navigate('Cocktails', {
            title: `Starts with -${letter}-`,
            cocktails: cocktails.sort((a,b) => b.strDrink - a.strDrink).filter((drink, index) => drink.strDrink.startsWith(letter))
        })
    }

    return (
        <Text style={{paddingHorizontal: 2}}>
            {letters.map((letter, index) => (
                <Text 
                    key={index.toString()}
                    onPress={() => selectHandler(letter)}
                    style={{ fontSize: Platform.OS === 'android' ? 25 : 28 }}>{`${index === 0 ? '' : ' '}${letter} /` }
                </Text>
            ))}
        </Text>

    )
}

export default BrowseByFirstLetter
