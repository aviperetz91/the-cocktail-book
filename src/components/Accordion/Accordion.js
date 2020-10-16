import React, { useState } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Spinner, Radio, Button } from 'native-base';
import { CheckBox, Icon } from 'react-native-elements';
import styles from './style';
import Colors from '../../constants/Colors';

const Accordion = props => {
    const { list, isMultiSelect, selected, checkedList, selectHandler } = props;

    const [isPressed, setIsPressed] = useState(false);

    const renderItem = (item) => {
        if (isMultiSelect) {
            return (
                <CheckBox
                    containerStyle={styles.checkboxContainer}
                    title={item}
                    checkedColor={'white'}
                    checked={checkedList.some(el => el === item)}
                    onPress={() => selectHandler(item)}
                    textStyle={{ color: checkedList.some(el => el === item) ? 'white' : '#a7a7a7', letterSpacing: 1, fontWeight: 'normal'}}
                />
            )
        } else {
            return (
                <Button transparent style={styles.radioContainer} onPress={() => selectHandler(item)}>
                    <View>
                        <Radio
                            color={'#a7a7a7'}
                            selectedColor={'white'}
                            selected={item === selected}
                            onPress={() => selectHandler(item)}
                        />
                    </View>
                    <View>
                        <Text
                            onPress={() => selectHandler(item)}
                            style={item === selected ? {...styles.radioText, color: 'white'} : styles.radioText}
                        >
                            {item}
                        </Text>
                    </View>
                </Button>
            )
        }
    }

    return (
        <View style={styles.accordion}>
            <TouchableWithoutFeedback onPress={() => setIsPressed(!isPressed)}>
                <View style={isPressed ? styles.accordionHeader: {...styles.accordionHeader, borderBottomWidth: 3}}>
                    <Text style={styles.accordionHeaderText}>
                        {props.title}
                    </Text>
                    <Icon type={'ionicon'} name={isPressed ? 'chevron-up' : 'chevron-down'} size={17} color={'white'} />
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