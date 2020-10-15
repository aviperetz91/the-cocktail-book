import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({ 
    header: {
        backgroundColor: '#343434', 
        elevation: 0,
        marginTop: 6
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 4,
        marginLeft: 15
    },   
    screen: {                                
        flex: 1,
        justifyContent: 'center',    
        backgroundColor: '#343434' 
        
    },
    container: {    
        paddingBottom: 60,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    clearButton: {
        padding: 10, 
        backgroundColor: Colors.warning, 
        marginHorizontal: 18
    },
    showButton: {
        padding: 10, 
        backgroundColor: Colors.danger, 
        marginHorizontal: 18
    }
})
  
export default styles;