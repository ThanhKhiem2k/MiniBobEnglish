import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/app/navigation/stack/index';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);

export type IAppProps = {};
const App: React.FC<IAppProps> = ({}) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <MainStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
