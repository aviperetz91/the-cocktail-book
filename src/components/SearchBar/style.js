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
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 12,
        marginBottom: 16
    },
    arrowBack: {
        fontSize: 23, 
        color: Colors.dark
    },
    input: {
        backgroundColor: 'white'
    },
    m_t: {
        marginTop: 20
    }
})

export default styles;