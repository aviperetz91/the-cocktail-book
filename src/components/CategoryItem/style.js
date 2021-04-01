import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 5,
        width: 120,
        height: 120,
    },  
    imageContainer: {
        width: '100%',
        height: '100%',  
    },
    image: {
        borderRadius: 70,
    },
    container: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        borderRadius: 70,
    },
    title: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 1,
    },
    subTitle: {
        fontSize: 9,
        color: Colors.lightGrey,
        textAlign: 'center',
        letterSpacing: 3,
    },
})
  
export default styles;