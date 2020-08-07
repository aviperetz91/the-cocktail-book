import React from 'react';
import { View } from 'react-native';

const DarkenImg = props => (
    <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        {props.children}
    </View>   
)

export default DarkenImg;