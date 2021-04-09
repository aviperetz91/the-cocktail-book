import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as NBCard } from 'native-base';

const Card = props => {
    return (
        <NBCard style={{...styles.card, ...props.style}}>
            {props.children}
        </NBCard>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 8,
        width: '85%',
        alignSelf: 'center',
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
})

export default Card;