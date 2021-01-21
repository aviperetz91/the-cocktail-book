import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {        
        backgroundColor: 'black',
    },
    image: {
        width: "100%",
        height: 330,
        opacity: 0.8
    },
    backButton: {
        position: 'absolute',
        left: 6,
        top: 25,
        padding: 15,
    },
    homeButton: {
        position: 'absolute',
        right: 6,
        top: 25,
        padding: 15,
    },
    favoriteButton: {
        position: 'absolute',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        top: 290,
        left: 325,
        width: 45,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    titleContainer: {
        width: '70%',
    },
    ratingContainer: {
        width: '30%',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    tabBarUnderline: {
        backgroundColor: 'black',
        height: 1
    },
    whiteBack: {
        backgroundColor: 'white',
    },
    textMuted: {
        color: '#a7a7a7'
    },
    marginTop: {
        marginTop: 10
    },
    activeTabText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    detailsContainer: {
        padding: 20,
        paddingTop: 10
    },
    detailsContent: {
        fontSize: 16,
        lineHeight: 30
    },
    detailsTitle: {
        color: '#444',
    },
    ingredientImage: {
        width: 50,
        height: 50,
        marginRight: 7,
        alignItems: "center",
    },
    listItemImg: {
        fontSize: 16,
        alignSelf: 'center'
    },
    listItemTitle: {
        fontSize: 16,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        backgroundColor: Colors.success,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 68,
        width: 68,
        borderRadius: 50,
        position: 'absolute',
        zIndex: 100,
        top: '90%',
        right: 15
    },
})

export default styles;