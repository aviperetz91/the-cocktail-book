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
    highestRatedContainer: {
        padding: 12,
        marginTop: 42
    },
    reviewsContainer: {
        padding: 12,
        paddingRight: 0,
        marginTop: 18 
    },
})

export default styles;