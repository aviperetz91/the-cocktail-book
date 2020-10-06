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
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
    },
    bgImage: {
        width: '100%',
        height: '100%',  
        opacity: 0.4       
    }
})
  
export default styles;