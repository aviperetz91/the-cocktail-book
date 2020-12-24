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
        borderRadius: 30,
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
    reviewTimeContainer: {
        position: 'absolute',
        right: 10,
        bottom: -70
    },
    reviewTimeText: {
        fontStyle: 'italic'
    },
    reviewComment: {
        color: '#777',
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