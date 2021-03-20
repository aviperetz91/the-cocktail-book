import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    backImg: {
        width: '100%',
        height: '100%',
    },
    imageInnerContent: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    header: {
        marginTop: Platform.OS === 'android' ? 20 : 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        padding: 16,
        elevation: 0
    },
    colCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainIcon: {
        color: Colors.light,
        fontSize: 62,
        marginBottom: 12
    },
    m_x: {
        marginHorizontal: 20
    },
    m_y: {
        marginVertical: 24
    },
    container: {
        padding: 24,
    },
    title: {
        color: Colors.light,
        // fontSize: Platform.OS === 'android' ? 26 : 31,
        // fontWeight: Platform.OS === 'android' ? '100' : '300',
        fontSize: 26,
        fontWeight: '300',
        letterSpacing: 3,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 20,
    },
    subTitle: {
        marginTop: 6,
        // color: Platform.OS === 'android' ? Colors.lightGrey : Colors.light,
        // fontSize: Platform.OS === 'android' ? 18 : 23,
        // fontWeight: Platform.OS === 'android' ? '100' : '200',
        color: Colors.lightGrey,
        fontSize: 18,
        fontWeight: '100',
        alignSelf: 'center',
        letterSpacing: 1
    },
    input: {
        marginVertical: 12,
    },
    inputText: {
        color: Colors.light,
        letterSpacing: 2,
    },
    textboxIcon: {
        color: Colors.light,
    },
    button: {
        padding: 10, 
        backgroundColor: Colors.danger, 
        marginHorizontal: 4,
        borderRadius: 30
    },
    buttonText: {
        color: Colors.light,
        // fontSize: Platform.OS === 'android' ? 21 : 25,
        fontSize: 19,
        fontWeight: '300',
        alignSelf: 'center',
        letterSpacing: 1
    },
    helperText: {
        marginTop: 12,
        // color: Platform.OS === 'android' ? Colors.lightGrey : Colors.light,
        // fontWeight: Platform.OS === 'android' ? '100' : '300',
        // fontSize: Platform.OS === 'android' ? 16 : 20,
        color: Colors.lightGrey,
        fontWeight: '100',
        fontSize: 16,
        alignSelf: 'center',
    },
    modeText: {
        fontWeight: '400'
    },
    alertContainer: {
        marginTop: 36,
        padding: 15,
        backgroundColor: '#f8d7da',
        opacity: 0.5,
        borderColor: '#f5c6cb',
    },
    alertText: {
        color: '#721c24',
        fontWeight: '600'
    },
})

export default styles;