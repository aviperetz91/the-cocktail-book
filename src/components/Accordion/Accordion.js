import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Spinner, Radio } from 'native-base';
import { Icon, CheckBox } from 'react-native-elements';
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
                    checkedColor={Colors.textColor}
                    checked={checkedList.some(el => el === item)}
                    onPress={() => selectHandler(item)}
                    textStyle={{  color: Colors.textColor}}
                />                            
            )
        } else {
            return (
                <View style={styles.radioContainer} onPress={() => selectHandler(item)}>
                    <View>
                        <Radio
                            color={'#bfbfbf'}
                            selectedColor={Colors.textColor}
                            selected={item === selected}
                            onPress={() => selectHandler(item)}
                        />
                    </View>
                    <View>
                        <Text
                            onPress={() => selectHandler(item)} 
                            style={styles.radioText}
                        >
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
                <View style={isPressed ? {...styles.accordionHeader, borderBottomWidth: 0} : styles.accordionHeader}>
                    <Text style={styles.accordionHeaderText}>
                        {props.title}
                    </Text>
                    <Icon type={'font-awesome'} name={isPressed ? 'chevron-up' : 'chevron-down'} size={13}  />
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