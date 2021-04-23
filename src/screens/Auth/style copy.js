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
    colCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainIcon: {
        color: Colors.light,
        fontSize: 70,
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
        fontSize: 26,
        fontWeight: '300',
        letterSpacing: 3,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 20,
    },
    subTitle: {
        marginTop: 6,
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
        marginHorizontal: 4,
        borderRadius: 30
    },
    buttonText: {
        fontSize: 19,
        fontWeight: '300',
        alignSelf: 'center',
        letterSpacing: 1
    },
    helperText: {
        marginTop: 12,
        color: Colors.lightGrey,
        fontWeight: '100',
        fontSize: 16,
        alignSelf: 'center',
    },
    modeText: {
        fontWeight: '400',
        color: Colors.link
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