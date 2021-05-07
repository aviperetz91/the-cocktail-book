import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
    },
    imageContainer: {
        width: '100%',
        height: Platform.OS === "android" ? 250 : 280,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    back: {
        width: '100%',
        height: Platform.OS === "android" ? 329 : 350,
        backgroundColor: 'black',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    image: {
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    imageInnerContent: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    buttonsHeader: {
        borderBottomWidth: 0,
        elevation: 0,
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'android' ? 36 : 0
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: Colors.light,
        marginHorizontal: 6
    },
    headerIcon: {
        color: Colors.dark,
        fontSize: 20,
        alignSelf: 'center'
    },
    absolute: {
        position: 'absolute',
        top: Platform.OS === "android" ? 90 : 110,
        paddingLeft: 10,
    },
    mainTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
        letterSpacing: 2,
        textShadowColor: 'rgba(255, 255, 255, 0.6)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        marginBottom: 16,
        marginTop: 4
    },
    content: {
        marginTop: 60,
        paddingLeft: 10,
        marginBottom: 30
    },
    sectionContainer: {
        marginTop: 30
    },
    sectionTitle: {
        fontSize: 20,
        color: Colors.dark,
        fontWeight: '400',
        letterSpacing: 2,
        marginBottom: 12,
        fontWeight: 'bold'
    },
    seconaryText: {
        fontSize: 16,
        color: '#888',
        fontWeight: '400',
        letterSpacing: 2,
        marginBottom: 12,
    },
    seconaryIcon: {
        fontSize: 16,
        color: '#888',
    },
    rowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ingredientThumbnail: {
        width: 90,
        height: 90,
    },
    ingredientText: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 16,
        color: Colors.dark,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    letters: {
        alignItems: 'center'
    },
    letter: {
        fontSize: 22,
        margin: 6
    }
})

export default styles;