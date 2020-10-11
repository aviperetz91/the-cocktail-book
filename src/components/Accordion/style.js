import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'


const styles = StyleSheet.create({
    accordion: {
        // backgroundColor: '#343434',
        paddingHorizontal: 18,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottomWidth: 3,
        borderBottomColor: '#666'
    },
    accordionHeaderText: {
        color: 'white',
        textTransform: 'uppercase',
        letterSpacing: 3,
        paddingVertical: 20
    },
    accordionBody: {
    
    },
    checkboxContainer: {
        borderWidth: 0,
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginVertical: 0,
        backgroundColor: '#343434',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    radioText: {
        color: '#a7a7a7',
        fontFamily: 'sans-serif',
        marginLeft: 10,
        letterSpacing: 1,
    }
})

// const styles = StyleSheet.create({
//     accordion: {
//         borderColor: Colors.textColor,
//     },
//     accordionHeader: {
//         padding: 12,
//         backgroundColor: '#f4f4f4',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: 10,
//         borderWidth: 1,
//     },
//     accordionHeaderText: {
//         fontSize: 18,
//         color: Colors.textColor,
//     },
//     accordionBody: {
//         borderWidth: 1,
//         borderTopWidth: 0,
//         backgroundColor: '#fafafa',
//     },
//     checkboxContainer: {
//         borderTopWidth: 0,
//         borderRadius: 0,
//         marginLeft: 0,
//         marginRight: 0,
//         marginVertical: 0
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         padding: 10,
//         backgroundColor: '#fafafa',
//         borderColor: '#ededed',
//         borderWidth: 1,
//         borderTopWidth: 0,
//         alignItems: 'center'
//     },
//     radioText: {
//         color: Colors.textColor,
//         fontWeight: 'bold',
//         fontFamily: 'sans-serif',
//         marginLeft: 10
//     }
// })

export default styles;