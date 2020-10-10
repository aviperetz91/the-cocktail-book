import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 0.25,
        height: 150,
        backgroundColor: 'black'
    },  
    titleContainer: {
        paddingHorizontal: 15,
        position: 'absolute',
        top: 60,
        width: '100%',
    },
    title: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 1,
    },
    subTitle: {
        fontSize: 10,
        color: '#b7b7b7',
        textAlign: 'center',
        letterSpacing: 3,
    },
    bgImage: {
        width: '100%',
        height: '100%',  
        opacity: 0.4       
    }
})
  
export default styles;