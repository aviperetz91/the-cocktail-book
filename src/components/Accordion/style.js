import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({ 
    accordion: {
        
    },
    accordionHeader: {
        width: 350,                
        padding: 15,
        borderRadius: 4,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    accordionHeaderText: {
        fontSize: 18,
    },
    accordionBody: {
        height: 300,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 15
    },
    checkboxContainer: {
        backgroundColor: '#f4f4f4',
        borderWidth: 0,
        margin: 0,
    }
})
  
export default styles;