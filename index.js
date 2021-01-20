import React from 'react';
import { AppRegistry, I18nManager } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Store from './src/store/Store';

I18nManager.allowRTL(false)

console.disableYellowBox = true;

const AppRedux = () => (
    <Provider store={Store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
