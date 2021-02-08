import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content, Header, Left, Right, Button, Label, Input, Item, Icon, Footer, Spinner } from 'native-base';
import styles from './style';
import Colors from '../../constants/Colors';
import { signup, login, setAuthError } from '../../store/actions/UserActions';

const SignupLogin = props => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.user.authError)

    const [mode, setMode] = useState('login');
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState({
        // fullName: '',
        // email: '',
        // password: '',
        fullName: 'Avi Peretz',
        email: 'pavi@gmail.com',
        password: '123456',
    });

    const changeTextHandler = (key, value) => {
        setInfo({
            ...info,
            [key]: value
        });
        dispatch(setAuthError(null));
    }

    const authHandler = async () => {
        if (info.email === '' || info.password === '') {
            dispatch(setAuthError('Please enter the missing fields'))
        } else {
            setIsLoading(true);
            if (mode === 'signup') {
                await dispatch(signup(info.fullName, info.email, info.password))
            } else if (mode === 'login') {
                await dispatch(login(info.email, info.password))
            }
            setIsLoading(false)            
        }
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
                {isLoading ? <Spinner color={'#343434'} /> : null}
                {error ?
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertText}>{error.toString()}</Text>
                    </View>
                    : null}
            </View>
            <Content />
            <Footer style={styles.footer}>
                <Button
                    style={{ ...styles.nextButton, backgroundColor: mode === 'signup' ? Colors.danger : Colors.warning }}
                    onPress={authHandler}
                >
                    <Icon type={"MaterialIcons"} name='trending-flat' style={styles.nextIcon} />
                </Button>
            </Footer>
        </Container>

    );
}

export default SignupLogin;