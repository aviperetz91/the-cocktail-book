import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({ 
    backImage: {                                
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",    
        backgroundColor: '#343434' 
        
    },
    container: {      
        paddingBottom: 20,
        paddingHorizontal: 30,
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