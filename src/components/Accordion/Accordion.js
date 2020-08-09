import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Radio } from 'native-base';
import { Icon } from 'react-native-elements';
import styles from './style';


const Accordion = props => {
    const type = props.type;

    const [isPressed, setIsPressed] = useState(false);

    return (
        <ScrollView style={styles.accordion}>
            <TouchableOpacity style={styles.accordionHeader} onPress={() => setIsPressed(!isPressed)}>
                <Text style={styles.accordionHeaderText}>{props.title}</Text>
                <Icon type={'font-awesome'} name={isPressed ? 'chevron-up' : 'chevron-down'} size={16} />
            </TouchableOpacity>
            {isPressed && props.list && props.list.length > 0 ?
                <ScrollView style={styles.accordionBody}>
                    {props.list.map((item, index) => (
                        <View key={index} style={styles.filterContainer}>
                            <Text style={styles.filterText}>{type == 'i' ? item.strIngredient1 : type == 'g' ? item.strGlass : item.strAlcoholic}</Text>
                            <Radio onPress={() => { }} selected={false} selectedColor={'blue'} />
                        </View>
                    ))}
                </ScrollView>
                : null}
        </ScrollView>
    );
};

export default Accordion;