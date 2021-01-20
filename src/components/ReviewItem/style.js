import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listItem: {
        marginVertical: 6,
        alignItems: 'flex-start'
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
        // height: '70%',
    },
})

export default styles;