import React from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Image } from 'react-native'
import Colors from '../../constants/Colors';

const CategoryItem = props => {
    return (
        // <ListItem thumbnail style={{marginVertical: 2}}>
        //     <Left>
        //         <Thumbnail style={{width: 80, height: 80, borderRadius: 3}} square source={props.image} />
        //     </Left>
        //     <Body>
        //         <Text>{props.title}</Text>
        //         <Text note></Text>
        //     </Body>
        //     <Right>
        //         <Button transparent onPress={props.onSelect}>
        //             <Text>View</Text>
        //         </Button>
        //     </Right>
        // </ListItem>

        <Card onPress={props.onSelect} style={{ width: '45%', margin: 10, elevation: 3, color: Colors.textColor }}>        
            <Card.Cover source={props.image} />
            <Card.Actions style={{ justifyContent: 'center' }}>
                <Button transparent onPress={props.onSelect}>
                    <Text style={{ color: Colors.textColor,fontWeight: 'bold' }}>{props.title}</Text>
                </Button>
            </Card.Actions>
        </Card>
    );
}

export default CategoryItem;