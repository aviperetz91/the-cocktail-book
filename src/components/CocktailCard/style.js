import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    itemContainer: {
        width: 150,
        marginTop: 20,
        marginRight: 20
    },
    itemImage: {
        width: '100%', 
        height: 115, 
        borderRadius: 5
    },
    itemTitle: { 
        fontSize: 17, 
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    itemNote: { 
        marginTop: 4,
        color: '#6c757d' 
    }
})

export default styles;