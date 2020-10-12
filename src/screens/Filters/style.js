import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({ 
    header: {
        backgroundColor: '#343434', 
        elevation: 0,
        position: 'absolute',
        top: 30,
        left: 10,
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 4,
    },   
    screen: {                                
        flex: 1,
        justifyContent: 'flex-start',    
        backgroundColor: '#343434' 
        
    },
    container: {    
        marginTop: 130,
        paddingBottom: 20,
        paddingHorizontal: 30,
        justifyContent: 'center'
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