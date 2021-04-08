import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    header: {
        backgroundColor: 'black',
        marginTop: Platform.OS === 'android' ? 28 : 0,
        borderBottomWidth: 0,
        elevation: 0,
    },
    searchBar: {
        backgroundColor: Colors.light, 
        borderRadius: 50,
        height: 35
    },
})

export default styles;