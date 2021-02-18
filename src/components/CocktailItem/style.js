import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemImage: {
        width: 85, 
        height: 85, 
        borderRadius: 20
    },
    itemTitle: { 
        fontSize: 17, 
        marginBottom: 2,
        fontWeight: '700',
        letterSpacing: 0.5
    },
    textContainer: {
        marginLeft: 15,
        width: '75%'
    },
    itemNote: { 
        color: '#6c757d' 
    },
    ratingContainer: {
        position: 'absolute',
        right: 15,
        bottom: 10,
    },
})

export default styles;