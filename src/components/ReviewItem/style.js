import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    listItem: {
        marginVertical: 6,
        marginLeft: 0,
        alignItems: 'flex-start'
    },
    reviewBody: {
        paddingBottom: 7
    },
    reviewRatingContainer: {
        position: 'absolute',
        right: 10,
    },
    bottomLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    action: {
        marginTop: 6,
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 20,
    },
    actionIcon: {
        color: 'white',
        fontSize: 18
    },
    reviewTimeText: {
        fontStyle: 'italic',
        textAlign: 'right',
        marginTop: 10
    },
    reviewContent: {
        color: '#777',
        fontSize: 16
    },
    reviewAutor: {
        fontWeight: 'bold'
    },
    avatarContainer: {
        height: '70%',
    },
})

export default styles;