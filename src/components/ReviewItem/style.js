import { StyleSheet } from 'react-native';

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