import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({   
    screen: {                                
        flex: 1,
        justifyContent: 'center',    
        backgroundColor: Colors.dark 
    },
    container: {    
        paddingBottom: 200,
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