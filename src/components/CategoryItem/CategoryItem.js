import React from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

const CategoryItem = props => {
    return (
        <ListItem thumbnail style={{marginVertical: 2}}>
            <Left>
                <Thumbnail style={{width: 80, height: 80, borderRadius: 3}} square source={props.image} />
            </Left>
            <Body>
                <Text>{props.title}</Text>
                <Text note></Text>
            </Body>
            <Right>
                <Button transparent onPress={props.onSelect}>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
    );
}

export default CategoryItem;