import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        flexGrow: 1
    },
    imageContainer: {

    },
    image: {
        width: '100%',
        height: 300,
    },
    imageInnerContent: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    }, 
    searchBarContainer: { 
        paddingHorizontal: 36, 
        position: 'absolute', 
        bottom: -18, 
        width: '100%' 
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardLeft: {
        paddingRight: 9
    },
    cardRight: {
        paddingLeft: 9,
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    badge: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: -5,
        right: 0,
        width: 32,
        height: 32,
        alignItems: 'center'
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 2
    },
    status: {
        marginTop: 6,
        backgroundColor: '#ebedf0',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 6,
        justifyContent: "space-between",
    },
    statusNote: {
        fontSize: 10,
        marginRight: 8,
        color: '#888'
    },
    statusVal: {
        fontSize: 20,
    },
    favoritsContainer: {
        padding: 12,
        marginTop: 42
    },
    reviewsContainer: {
        padding: 12,
        paddingRight: 0,
        marginTop: 18 
    },
    msgContainer: {
        paddingVertical: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    msgText: {
        color: '#a83236',
        fontSize: 18
    }
})

export default styles;