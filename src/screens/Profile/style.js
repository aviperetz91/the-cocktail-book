import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        backgroundColor: 'white',
        flexGrow: 1
    },
    back: {
        width: '100%',
        height: 180,
        backgroundColor: Colors.dark,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    card: {
        marginTop: 8,
        width: '85%',
        alignSelf: 'center',
        padding: 16,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
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
        marginTop: 52
    },
    reviewsContainer: {
        padding: 12,
        paddingRight: 0,
        marginTop: 6
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
    },
    cameraIcon: {
        fontSize: 18,
        color: "#fff"
    }
})

export default styles;