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
                    checkedColor={Colors.darkPrimary}
                    checked={checkedList.some(el => el === item)}
                    onPress={() => selectHandler(item)}
                />                            
            )
        } else {
            return (
                <View>
                    <View>
                        <Radio
                            color={'#bfbfbf'}
                            selectedColor={Colors.darkPrimary}
                            selected={item === selected}
                            onPress={() => selectHandler(item)}
                        />
                    </View>
                    <View>
                        <Text
                            onPress={() => selectHandler(item)} 
                            // style={{ color: '#43484d', fontWeight: 'bold', fontFamily: 'sans-serif' }}
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
                <View style={styles.accordionHeader}>
                    <Text style={styles.accordionHeaderText}>{props.title}</Text>
                    <Icon type={'font-awesome'} name={isPressed ? 'chevron-up' : 'chevron-down'} size={12} />
                </View>
            </TouchableWithoutFeedback>
            {isPressed ?
                <View>
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