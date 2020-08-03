import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200
    },
    ingredientsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
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
    }    
})
  
export default styles;