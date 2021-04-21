import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        flexGrow: 1
    },
    back: {
        width: '100%',
        backgroundColor: 'black',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
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
    expandedThumbnailContainer: {
        paddingBottom: 0, 
        paddingTop: 0, 
        paddingLeft: 0, 
        paddingRight: 0
    },
    expandedThumbnail: {
        width: '100%',
        height: 350,
    },
    badgeRight: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: -5,
        right: -10,
        width: 32,
        height: 32,
        alignItems: 'center'
    },
    badgeLeft: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: -5,
        left: -10,
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
        fontWeight: 'bold',
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
    buttonsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    button: {
        marginTop: 16, 
        width: '48%' 
    },
    favoritsContainer: {
        padding: 12,
        marginTop: 38
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