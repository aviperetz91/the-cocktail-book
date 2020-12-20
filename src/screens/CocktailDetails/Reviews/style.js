import { Right } from 'native-base';
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        padding: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    textareaContainer: {
        marginTop: 25,
    },
})

export default styles;