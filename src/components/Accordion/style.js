import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    accordion: {
                
    },
    accordionHeader: {
        width: 350,        
        padding: 15,
        borderRadius: 4,
        backgroundColor: '#e4e4e4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6
    },
    accordionHeaderText: {
        fontSize: 18,
    },
    accordionBody: {
        maxHeight: 350,
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