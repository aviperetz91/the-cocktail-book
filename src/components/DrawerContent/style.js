import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },    
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },   
    drawerSection: {
        marginTop: 25
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
})
  
export default styles;