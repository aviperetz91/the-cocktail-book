import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    accordion: {
        // marginVertical: 20
    },
    accordionHeader: {
        width: 350,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#e4e4e4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    accordionHeaderText: {
        fontSize: 18,
    },
    accordionBody: {
        backgroundColor: '#f4f4f4',
        padding: 15
    },
    filterContainer: {
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    filterText: {
        fontSize: 17,
    }
})
  
export default styles;