import React from 'react';
import { List, Text, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { IMAGES_URL } from '@env';

const IngredientList = props => {
    return (
        <List>
            {props.selectedCocktail.ingredientList.map((ingredient, index) => (
                <ListItem thumbnail key={index}>
                    <Left>
                        <Thumbnail source={{ uri: `${IMAGES_URL}/ingredients/${ingredient}.png` }} />
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 16 }}>{ingredient}</Text>
                    </Body>
                    <Right>
                        <Text note>{props.selectedCocktail.measureList[index]}</Text>
                    </Right>
                </ListItem>
            ))}
        </List>
    )
}

export default IngredientList;