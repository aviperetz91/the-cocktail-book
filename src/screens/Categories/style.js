import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    screen: {
        paddingVertical: 6,
        paddingHorizontal: 12, 
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        letterSpacing: 4,
    },    
    header: {
        backgroundColor: 'white', 
        elevation: 0,
        marginVertical: 6
    }
})
  
export default styles;