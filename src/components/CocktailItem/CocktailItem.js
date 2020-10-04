import React from 'react';
import { ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors';
import styles from './style';

const CocktailItem = props => {
    return (                     
        <TouchableOpacity style={styles.itemContainer} onPress={props.onSelect}>
            <View>
                <Image style={styles.itemImage} square source={{ uri: props.image }} />
            </View>
            <View style={{ marginLeft: 15 }}>
                <Text style={styles.itemTitle}>{props.title}</Text>
                <Text style={styles.itemNote}>Some note</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CocktailItem;