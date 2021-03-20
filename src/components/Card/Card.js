import React from 'react';
import { Card as NBCard } from 'native-base';
import styles from './style';

const Card = props => {
    return (
        <NBCard style={styles.card}>
            {props.children}
        </NBCard>
    )
}

export default Card;