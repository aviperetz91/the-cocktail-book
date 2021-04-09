import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner as NBSpinner } from 'native-base';
import Colors from '../../constants/Colors';

const Spinner = (props) => {

    const { color } = props;

    return (
        <View style={styles.spinnerContainer}>
            <NBSpinner color={color ? color : Colors.dark} />
        </View>
    )
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Spinner;