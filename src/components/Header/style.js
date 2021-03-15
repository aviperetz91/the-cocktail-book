import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    header: {
        marginTop: Platform.OS === 'android' ? 30 : 0,
        backgroundColor: 'white',
        elevation: 0,
        marginVertical: 6,
        alignItems: 'center',
        borderBottomWidth: 0,                        
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: 4,
        marginLeft: 15
    },    
    
})
  
export default styles;