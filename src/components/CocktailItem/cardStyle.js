import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    itemContainer: {
        width: 300,
        marginRight: 20,
    },
    itemImage: {
        width: '100%',
        height: 250,
    },
    content: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
    info: {
        padding: 12, 
        width: '100%', 
        backgroundColor: 'rgba(0,0,0,0.4)', 
        borderBottomRightRadius: 10, 
        borderBottomLeftRadius: 10,
    },
    rowSpace: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    textContainer: {
        marginTop: 12,
        marginLeft: 4
    },
    itemTitle: {
        color: Colors.light,
        letterSpacing: 2,
        fontSize: 17,
        fontWeight: '600',
        // letterSpacing: 0.5,å
    },
    itemNote: {
        fontSize: 14,
        color: Colors.lightGrey
        // marginTop: 4,
    },

    // SMALL
    sm_itemContainer: {
        width: 150,
        marginTop: 20,
        marginRight: 20
    },
    sm_itemImage: {
        width: '100%',
        height: 115,
        borderRadius: 5
    },
    sm_textContainer: {
        marginTop: 12,
        marginLeft: 4
    },
    sm_itemTitle: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    sm_itemNote: {
        marginTop: 4,
    },
})

export default styles;