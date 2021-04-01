import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    ratingContainer: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ratingValue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.lightGrey
        // color: '#6c757d'
        // color: '#f1c40f'
    }
})

export default styles;