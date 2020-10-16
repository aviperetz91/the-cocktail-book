import React from 'react';
import { Header as NBHeader, Left, Right, Button, Title, Icon } from 'native-base';
import styles from './style';

const Header = props => {
    const { headerBackground, statusBarColor, pressHandler, iconType, iconName, iconColor, iconSize, title, titleColor, letterSpacing } = props;
    return (
        <NBHeader style={{...styles.header, backgroundColor: headerBackground}} androidStatusBarColor={statusBarColor}>
            <Left>
                <Button transparent onPress={pressHandler}>
                    <Icon 
                        type={iconType}
                        name={iconName}
                        style={{ color: iconColor , fontSize: iconSize }} />
                </Button>
            </Left>
            <Title style={{...styles.title, color: titleColor, letterSpacing: letterSpacing }}>{title}</Title>
            <Right />
        </NBHeader>
    )
}

export default Header;

