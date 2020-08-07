import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 320,
        position: 'relative'
    },
    header: {
        backgroundColor: 'transparent',
        elevation: 0
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 10,
        width: '100%'
    },
    title: {
        fontSize: 20,
    },
    subTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20 
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    container: {
        backgroundColor: 'white'
    },
    ingredientsContainer: {
        flexDirection: "row",
        alignItems: "center",
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
    content: {
        fontSize: 16
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
    },
    iconTitle: {
        textAlign: "center",
        marginLeft: 5
    },
    col: {
        width: '33%',
    },
    spinnerContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})

export default styles;