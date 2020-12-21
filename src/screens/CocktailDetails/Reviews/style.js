import { Right } from 'native-base';
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    addButton: {
        backgroundColor: Colors.success,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        width: 55,
        borderRadius: 50,
        position: 'absolute',
        zIndex: 100,
        bottom: 20,
        right: 10
    },
    textareaContainer: {
        marginTop: 25,
    },
    listItem: {
        marginVertical: 6,
        alignItems: 'flex-start'
    },
    reviewRatingContainer: {
        position: 'absolute',
        right: 10
    },
    reviewComment: {
        color: '#a7a7a7',
        fontStyle: 'italic',
        fontSize: 16
    },
    reviewAutor: {
        fontWeight: 'bold'
    },
    avatarContainer: {
        height: '90%'
    },
})

export default styles;