import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 16 
    },
    ingredientContainer: {
        marginBottom: 20,
        marginHorizontal: 2,
    },
    ingredientThumbnail: {
        width: 90,
        height: 90,
    },
    ingredientText: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 14,
        color: Colors.dark,
        fontWeight: 'bold',
    },
})

export default styles;