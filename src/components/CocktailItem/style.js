import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    itemImage: {
        width: 85, 
        height: 85, 
        borderRadius: 3
    },
    itemTitle: { 
        fontSize: 16, 
        fontWeight: '600' 
    },
    itemNote: { 
        color: '#6c757d' 
    }
})

export default styles;