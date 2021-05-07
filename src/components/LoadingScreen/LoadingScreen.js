import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Spinner } from 'native-base';
import Header from '../../components/Header/Header';

const LoadingScreen = () => {
    return (
        <View style={styles.loadingScreen}>
            {Platform.OS === 'ios' ?
                <StatusBar barStyle="light-content" backgroundColor="black" />
                :
                <Header
                    headerBackground={'transparent'}
                    statusBarColor={'transparent'}
                    iosBarStyle={'light-content'}
                />
            }
            <Spinner color={'white'} />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingBottom: Platform.OS === 'android' ? 56 : 0
    },
})

export default LoadingScreen;