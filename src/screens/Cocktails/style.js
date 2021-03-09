import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    card: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 25, 
        marginLeft: 15, 
        marginRight: 15, 
        padding: 15 
    },
    cardText: {
        fontSize: 22, 
        color: '#dc3545' 
    }
})
  
export default styles;