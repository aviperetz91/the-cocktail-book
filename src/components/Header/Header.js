import React from 'react';
import { Header as NBHeader, Left, Text, Right, Button, Title, Icon } from 'native-base';
import styles from './style';

const Header = props => {
    const { headerBackground, statusBarColor, iosBarStyle, pressHandler, iconType, iconName, iconColor, iconSize, title, titleColor, letterSpacing } = props;
    return (
        <NBHeader style={{ ...styles.header, backgroundColor: headerBackground }} androidStatusBarColor={statusBarColor} iosBarStyle={iosBarStyle}>
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

export default Header;

