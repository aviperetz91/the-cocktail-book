import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'


const styles = StyleSheet.create({
    accordion: {
        paddingHorizontal: 18,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        backgroundColor: 'black',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    checkboxText: {
        letterSpacing: 1, 
        fontWeight: 'normal' 
    },
    radioText: {
        color: '#a7a7a7',
        fontFamily: 'sans-serif',
        marginLeft: 10,
        letterSpacing: 1,
    }
})

export default styles;