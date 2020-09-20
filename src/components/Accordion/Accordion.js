import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Spinner, Radio } from 'native-base';
import { Icon, CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import styles from './style';
import Colors from '../../constants/Colors';

const Accordion = props => {
    const { list, isMultiSelect, selectHandler } = props;

    const [isPressed, setIsPressed] = useState(false);
    const [selected, setSelected] = useState([]);
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
    
    const renderItem = (item) => {
        if (isMultiSelect) {
            return (
                <CheckBox
                    containerStyle={styles.checkboxContainer}
                    title={item}
                    checkedColor={Colors.darkPrimary}
                    checked={checkedList.some(el => el === item)}
                    onPress={() => {
                        updateCheckedList(item)
                        selectHandler(item)
                    }}
                />
            )
        } else {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                    <View style={{ marginLeft: 13, marginRight: 6, padding: 5 }}>
                        <Radio
                            color={'#bfbfbf'}
                            selectedColor={Colors.darkPrimary}
                            selected={item == selected}
                            onPress={() => {
                                setSelected(item)
                                selectHandler(item)
                            }}
                        />
                    </View>
                    <View>
                        <Text
                            onPress={() => {
                                setSelected(item)
                                selectHandler(item)
                            }} style={{ color: '#43484d', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                            {item}
                        </Text>
                    </View>
                </View>
            )
        }
    }

    return (
        <View style={styles.accordion}>
            <TouchableWithoutFeedback onPress={() => setIsPressed(!isPressed)}>
                <View style={styles.accordionHeader}>
                    <Text style={styles.accordionHeaderText}>{props.title}</Text>
                    <Icon type={'font-awesome'} name={isPressed ? 'chevron-up' : 'chevron-down'} size={12} />
                </View>
            </TouchableWithoutFeedback>
            {isPressed ?
                <View style={styles.accordionBody}>
                    {list && list.length > 0 ?
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={list}
                            renderItem={({ item }) => renderItem(item)}
                        />
                        :
                        <Spinner color={Colors.darkPrimary} />
                    }
                </View>
                : null}
        </View>
    );
};

export default Accordion;