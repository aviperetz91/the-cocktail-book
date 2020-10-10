import React from 'react';
import { View } from 'react-native';

const Wrapper = props => (
    <View style={props.styles}>
        {props.children}
    </View>   
)

export default Wrapper;