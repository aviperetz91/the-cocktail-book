import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Spinner } from 'native-base';
import { Icon, CheckBox } from 'react-native-elements';
import styles from './style';
import Colors from '../../constants/Colors';

const Accordion = props => {
    const { list } = props;

    const [isPressed, setIsPressed] = useState(false);
    const [checkedList, setCheckedList] = useState([]);    

    const updateCheckedList = (item) => {
        const isFound = checkedList.some(el => el === item);
        let updated;
        if (isFound) {
            updated = checkedList.filter(el => el !== item)
        } else {
            updated = [...checkedList, item]
        }
        setCheckedList(updated)
    }
    
    return (
        <View style={styles.accordion}>
            <TouchableWithoutFeedback onPress={() => setIsPressed(!isPressed)}>
                <View style={ styles.accordionHeader}>
                    <Text style={styles.accordionHeaderText}>{props.title}</Text>
                    <Icon type={'font-awesome'} name={isPressed ? 'chevron-up' : 'chevron-down'} size={12} />
                </View>
            </TouchableWithoutFeedback>
            {isPressed ?
                <View style={styles.accordionBody}>
                    { list && list.length > 0 ?
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={list}
                            renderItem={({ item }) => (
                                <CheckBox
                                    onPress={() => updateCheckedList(item)}
                                    containerStyle={styles.checkboxContainer}                                 
                                    title={item}
                                    checkedColor={Colors.darkPrimary}
                                    checked={checkedList.some(el => el === item)}
                                />
                            )}
                        />
                        :
                        <Spinner color={Colors.darkPrimary} />
                    }
                </View> 
            : null }              
        </View>
    );
};

export default Accordion;