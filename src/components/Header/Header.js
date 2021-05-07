import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Header as NBHeader, Left, Text, Right, Button, Icon } from 'native-base';

const Header = props => {
    const { headerBackground, statusBarColor, iosBarStyle, pressHandler, iconType, iconName, iconColor, iconSize, title, titleColor, letterSpacing } = props;
    return (
        <NBHeader 
            style={{ ...styles.header, backgroundColor: headerBackground }} 
            androidStatusBarColor={statusBarColor} 
            iosBarStyle={iosBarStyle}
            translucent
        >
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={pressHandler}>
                    <Icon
                        type={iconType}
                        name={iconName}
                        style={{ color: iconColor, fontSize: iconSize }} />
                </Button>
            </Left>
            <Text style={{ ...styles.title, color: titleColor, letterSpacing: letterSpacing }}>{title}</Text>
            <Right style={{ flex: 1 }} />
        </NBHeader>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        elevation: 0,
        marginVertical: 6,
        alignItems: 'center',
        borderBottomWidth: 0,                        
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: 4,
        marginLeft: 15
    },    
})
  

export default Header;

