import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 12,
        height: 150,
    },  
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    title: {
        fontSize: 15,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    bgImage: {
        width: '100%',
        height: '100%',        
        justifyContent: 'flex-end',
        borderRadius: 5,
       
    }
})
  
export default styles;