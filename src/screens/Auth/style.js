import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        padding: 16,
        elevation: 0
    },
    headerTitleContainer: {
        borderColor: '#565656',
        borderBottomWidth: 3,
        borderRadius: 5,
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    m_x: {
        marginHorizontal: 20
    },
    m_y: {
        marginVertical: 64,
    },
    container: {
        marginVertical: 24,
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        letterSpacing: 3
    },
    subTitle: {
        fontSize: 23,
        color: '#a7a7a7',
        letterSpacing: 3
    },
    input: {
        padding: 4,
        marginVertical: 16
    },
    label: {
        letterSpacing: 2
    },
    footer: {
        position: 'relative',
        backgroundColor: '#e7e7e7'
    },
    alertContainer: {
        padding: 15,
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
    },
    alertText: {
        color: '#721c24',
    },
    nextButton: {
        width: 82,
        height: 48,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        top: -24,
        right: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextIcon: {
        fontSize: 35,
        color: 'white'
    }
})

export default styles;