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
    image: {
        width: '100%',
        height: 320,
    },
    imageInnerContent: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    mainTitle: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        letterSpacing: 10,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20,
    },
    searchBarContainer: {
        paddingHorizontal: 44,
        position: 'absolute',
        top: -26,
        width: '100%'
    },
    contentContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -15,
        marginBottom: 30
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
    horizontalListContainer: {
        paddingHorizontal: 12,
        paddingTop: 12
    },
    listContainer: {
        padding: 12,
        paddingRight: 0,
        marginTop: 12
    },
})

export default styles;