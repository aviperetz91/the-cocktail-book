import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        flex: 1,
        backgroundColor: 'white'
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
        borderTopWidth: 1,
        borderColor: '#dedede',
        marginBottom: 16
    },
    input: {
        backgroundColor: "white",
    }
})

export default styles;