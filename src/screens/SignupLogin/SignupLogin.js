import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Right, Button, Label, Input, Item, Icon, Footer } from 'native-base';
import styles from './style';

const SignupLogin = props => {
    return (
        <Container>
            <Header style={styles.header} androidStatusBarColor={'white'} iosBarStyle={'dark-content'}>
                <Left style={styles.row}>
                    <TouchableOpacity style={styles.m_x} transparent>
                        <Text style={styles.headerTitle}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.m_x} transparent>
                        <Text style={styles.headerTitle}>Sign Up</Text>
                    </TouchableOpacity>
                </Left>
                <Right />
            </Header>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Create Account,</Text>
                    <Text style={styles.subTitle}>Sign up to get started!</Text>
                </View>                
                <View style={styles.m_y}>
                    <Item style={styles.input} floatingLabel>
                        <Label style={styles.label}>Full Name</Label>
                        <Input

                        />
                    </Item>
                    <Item style={styles.input} floatingLabel>
                        <Label style={styles.label}>Email Address</Label>
                        <Input

                        />
                    </Item>
                    <Item style={styles.input} floatingLabel>
                        <Label style={styles.label}>Password</Label>
                        <Input

                        />
                    </Item>
                </View>
            </View>
            <Content />
            <Footer style={styles.footer}>
                <Button style={styles.nextButton}>
                    <Icon type={"MaterialIcons"} name='trending-flat' style={styles.nextIcon} />
                </Button>
            </Footer>
        </Container>

    );
}

export default SignupLogin;