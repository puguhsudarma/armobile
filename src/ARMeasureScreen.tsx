import React from 'react';
import ARNavigator from './ARMeasure';
import useARState from './ARState.store';
import BlankPage from './components/BlankPage.component';

const WrapperBlankPage = () => {
  const isARStarted = useARState(state => state.isARStarted);
  const onStartAR = useARState(state => state.startAR);

  if (!isARStarted) {
    return <BlankPage onPress={onStartAR} />;
  }

  return <ARNavigator />;
};

export default WrapperBlankPage;
