import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from '../app.json';
import ARMeasureScreen from './ARMeasureScreen';

const App: React.FC = () => {
  return <ARMeasureScreen />;
};

AppRegistry.registerComponent(appName, () => App);
