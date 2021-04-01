import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    itemContainer: {
        width: '95%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowOpacity: 0.22,
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
    imageContainer: {
        width: '25%', 
        height: '100%' 
    },
    itemImage: {
        width: '100%', 
        height: 90, 
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16
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
})

export default styles;