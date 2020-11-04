import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Right, Button, Label, Input, Item, Icon, Footer } from 'native-base';
import styles from './style';
import Colors from '../../constants/Colors';
import { signup, login } from '../../store/actions/AuthActions';

const SignupLogin = props => {

    const dispatch = useDispatch();
    const [mode, setMode] = useState('login');
    const [info, setInfo] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const changeTextHandler = (key, value) => {
        setInfo({
            ...info,
            [key]: value
        })
    }

    const signupHandler = () => {
        dispatch(signup(info.email, info.password))
    }

    const loginHandler = () => {
        dispatch(login(info.email, info.password))
    }

    return (
        <Container>
            <Header style={styles.header} androidStatusBarColor={'white'} iosBarStyle={'dark-content'}>
                <Left style={styles.row}>
                    <TouchableOpacity style={styles.m_x} transparent onPress={() => setMode('login')}>
                        <View style={mode === 'login' ? styles.headerTitleContainer : {}}>
                            <Text style={styles.headerTitle}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.m_x} transparent onPress={() => setMode('signup')}>
                        <View style={mode === 'signup' ? styles.headerTitleContainer : {}}>
                            <Text style={styles.headerTitle}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </Left>
                <Right />
            </Header>
            <View style={styles.container}>
                {mode === 'signup' ?
                    <View>
                        <Text style={styles.title}>Create Account,</Text>
                        <Text style={styles.subTitle}>Sign up to get started!</Text>
                    </View>
                    : null}
                {mode === 'login' ?
                    <View>
                        <Text style={styles.title}>Welcome Back,</Text>
                        <Text style={styles.subTitle}>Sign in to continue!</Text>
                    </View>
                    : null}
                <View style={styles.m_y}>
                    {mode === 'signup' ?
                        <Item style={styles.input} floatingLabel>
                            <Label style={styles.label}>Full Name</Label>
                            <Input
                                value={info.fullName}
                                onChangeText={(input) => changeTextHandler('fullName', input)}
                            />
                        </Item>
                        : null}
                    <Item style={styles.input} floatingLabel>
                        <Label style={styles.label}>Email Address</Label>
                        <Input
                            value={info.email}
                            keyboardType="email-address"
                            onChangeText={(input) => changeTextHandler('email', input)}
                        />
                    </Item>
                    <Item style={styles.input} floatingLabel>
                        <Label style={styles.label}>Password</Label>
                        <Input
                            value={info.password}
                            keyboardType="default"
                            secureTextEntry
                            onChangeText={(input) => changeTextHandler('password', input)}
                        />
                    </Item>
                </View>
            </View>
            <Content />
            <Footer style={styles.footer}>
                <Button
                    style={{ ...styles.nextButton, backgroundColor: mode === 'signup' ? Colors.danger : Colors.warning }}
                    onPress={() => mode === 'signup' ? signupHandler() : mode === 'login' ? loginHandler() : {}}
                >
                    <Icon type={"MaterialIcons"} name='trending-flat' style={styles.nextIcon} />
                </Button>
            </Footer>
        </Container>

    );
}

export default SignupLogin;