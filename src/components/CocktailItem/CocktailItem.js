import React from 'react';
import { Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, Icon } from 'native-base';
import Rating from '../Rating/Rating';
import Card from '../Card/Card';
import cardStyle from './cardStyle';
import itemStyle from './itemStyle';

const CocktailItem = props => {

    const { navigation, card, idDrink, image, title, alcoholic, category, glass, size } = props;
    const { reviews, cocktailRatingMap } = useSelector(state => state.cocktails);
    const reviewsCounter = reviews.filter(rev => rev.idDrink === idDrink).length
    const styles = card ? cardStyle : itemStyle;

    const navigate = () => {
        navigation.navigate('CocktailDetails', {
            id: idDrink,
            name: title
        })
    }

    if (card && size === 'large') {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={navigate}>
                <ImageBackground style={styles.itemImage} source={{ uri: image }} imageStyle={{ borderRadius: 10 }}>
                    <View style={styles.content}>
                        <View style={styles.info}>
                            <Text style={styles.itemTitle}>{title}</Text>
                            <View style={styles.rowSpace}>
                                <Text style={styles.itemNote}>
                                    {alcoholic}
                                    <Icon type="MaterialCommunityIcons" name="circle-small" style={styles.itemNote} />
                                    {category}
                                    <Icon type="MaterialCommunityIcons" name="circle-small" style={styles.itemNote} />
                                    {glass}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    } else if (card && size === 'small') {
        return (
            <TouchableOpacity style={styles.sm_itemContainer} onPress={navigate}>
                <View>
                    <Image style={styles.sm_itemImage} square source={{ uri: image }} />
                </View>
                <View style={styles.sm_textContainer}>
                    <Text style={styles.sm_itemTitle}>{title}</Text>
                    <Text note style={styles.sm_itemNote}>{category}</Text>
                    <Rating rating={cocktailRatingMap[idDrink]} counter={reviewsCounter} />
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={navigate}>
                <Card style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.itemImage} square source={{ uri: image }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle}>{title}</Text>
                        {/* <Text note style={styles.itemNote}>{`${alcoholic}, ${category}, ${glass}`}</Text> */}
                        <Rating rating={cocktailRatingMap[idDrink]} counter={reviewsCounter} />
                    </View>
                </Card>
            </TouchableOpacity>
        );
    }
}

export default CocktailItem;