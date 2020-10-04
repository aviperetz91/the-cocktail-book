import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    accordion: {
        borderColor: Colors.textColor,
    },
    accordionHeader: {
        padding: 12,
        backgroundColor: '#f4f4f4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
    },
    accordionHeaderText: {
        fontSize: 18,
        color: Colors.textColor,
    },
    accordionBody: {
        borderWidth: 1,
        borderTopWidth: 0,
        backgroundColor: '#fafafa',
    },
    checkboxContainer: {
        borderTopWidth: 0,
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginVertical: 0
    },
    radioContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fafafa',
        borderColor: '#ededed',
        borderWidth: 1,
        borderTopWidth: 0,
        alignItems: 'center'
    },
    radioText: {
        color: Colors.textColor,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        marginLeft: 10
    }
})

export default styles;