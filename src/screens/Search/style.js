import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        display: 'none'
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
        color: Colors.primary
    },
    input: {
        backgroundColor: 'white'
    }
})

export default styles;