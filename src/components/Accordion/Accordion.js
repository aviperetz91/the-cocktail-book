import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Spinner } from 'native-base';
import { Icon, CheckBox } from 'react-native-elements';
import styles from './style';
import Colors from '../../constants/Colors';

const Accordion = props => {
    const { itemStr, list } = props;

    const [isPressed, setIsPressed] = useState(false);
    const [checkedList, setCheckedList] = useState([]);    

    const updateCheckedList = (strItem) => {
        const isFound = checkedList.some(el => el === strItem);
        let updated;
        if (isFound) {
            updated = checkedList.filter(el => el !== strItem)
        } else {
            updated = [...checkedList, strItem]
        }
        setCheckedList(updated)
        console.log(checkedList)
    }

    return (
        <ScrollView style={styles.accordion}>
            <TouchableWithoutFeedback onPress={() => setIsPressed(!isPressed)}>
                <View style={styles.accordionHeader}>
                    <Text style={styles.accordionHeaderText}>{props.title}</Text>
                    <Icon type={'font-awesome'} name={isPressed ? 'chevron-up' : 'chevron-down'} size={16} />
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
                                    onPress={() => updateCheckedList(item[itemStr])}
                                    containerStyle={styles.checkboxContainer}                                 
                                    title={item[itemStr]}
                                    checked={checkedList.some(el => el === item[itemStr])}
                                />
                            )}
                        />
                        :
                        <Spinner color={Colors.darkPrimary} />
                    }
                </View> 
            : null }              
        </ScrollView>
    );
};

export default Accordion;