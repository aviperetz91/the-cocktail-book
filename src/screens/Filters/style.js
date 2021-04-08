import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    container: {
        paddingBottom: Platform.OS === 'android' ? 200 : 230,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    clearButton: {
        padding: 10,
        backgroundColor: Colors.danger,
        marginHorizontal: 18
    },
    filterButton: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 80 : 20,
        right: 16,
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: Colors.light,
        marginHorizontal: 6
    },
    clearButton: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 80 : 20,
        left: 16,
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: Colors.light,
        marginHorizontal: 6
    },
    filterIcon: {
        color: Colors.dark,
        fontSize: 35,
        alignSelf: 'center'
    }
})

export default styles;