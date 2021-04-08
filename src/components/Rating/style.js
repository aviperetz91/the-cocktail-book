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
    }
})

export default styles;