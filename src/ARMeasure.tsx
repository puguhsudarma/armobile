import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroConstants,
  ViroNode,
  ViroText,
} from '@viro-community/react-viro';
import React, {useCallback} from 'react';
import {
  PixelRatio,
  StyleSheet,
  ToastAndroid,
  useWindowDimensions,
} from 'react-native';
import useARState from './ARState.store';
import ARNode from './components/ARNode.component';
import {formatCoordinates} from './utility';

const ARMeasure: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const ratio = PixelRatio.get();

  const arSceneRef = React.useRef<ViroARScene>(null);
  const nodeRef1 = React.useRef<ViroNode>(null);
  const nodeRef2 = React.useRef<ViroNode>(null);

  const setInitialized = useARState(state => state.setInitialized);
  const initialized = useARState(state => state.initialized);
  const distance = useARState(state =>
    state.distance ? state.distance.toFixed(2) : '',
  );
  const setDistance = useARState(state => state.setDistance);
  const setNode1Coord = useARState(state => state.setNode1Coord);
  const setNode2Coord = useARState(state => state.setNode2Coord);
  const firstNodePlaced = useARState(state => !!state.node1Coord);
  const coordOne = useARState(
    useCallback(state => formatCoordinates(state.node1Coord), []),
  );
  const coordTwo = useARState(
    useCallback(state => formatCoordinates(state.node2Coord), []),
  );

  const onSceneUpdated = useCallback(
    (state: number) => {
      // if the state changes to "TRACKING_NORMAL" for the first time, then
      // that means the AR session has initialized!
      if (!initialized && state === ViroConstants.TRACKING_NORMAL) {
        setInitialized(true);
      }
    },
    [setInitialized, initialized],
  );

  const pressSceneHandler = useCallback(async () => {
    if (!arSceneRef.current) {
      return false;
    }

    try {
      const testResults = await arSceneRef.current.performARHitTestWithPoint(
        (width * ratio) / 2,
        (height * ratio) / 2,
      );

      for (var i = 0; i < testResults.length; i++) {
        const result = testResults[i];

        if (result.type === 'ExistingPlaneUsingExtent') {
          // We hit a plane, do something!
          if (firstNodePlaced) {
            if (__DEV__) {
              console.log('MOVING_NODE_TWO');
            }

            // set node 2
            nodeRef2.current?.setNativeProps({
              position: result.transform.position,
              visible: true,
            });

            // store node 2 coords
            setNode2Coord(result.transform.position);

            // calculate distance
            nodeRef1.current?.getTransformAsync().then(transform => {
              setDistance(transform.position, result.transform.position);
            });
          } else {
            if (__DEV__) {
              console.log('MOVING_NODE_ONE');
            }

            nodeRef2.current?.setNativeProps({visible: false});
            nodeRef1.current?.setNativeProps({
              position: result.transform.position,
              visible: true,
            });

            setNode1Coord(result.transform.position);
          }
        }
      }
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  }, [
    firstNodePlaced,
    height,
    ratio,
    setDistance,
    setNode1Coord,
    setNode2Coord,
    width,
  ]);

  const nodeOneDragHandler = useCallback(
    async (dragedCoords: number[]) => {
      setNode1Coord(dragedCoords);

      //   if (!nodeRef2.current) {
      //     return false;
      //   }

      //   try {
      //     const transform = await nodeRef2.current.getTransformAsync();
      //     setDistance(transform.position, dragedCoords);
      //     setNode1Coord(dragedCoords);
      //   } catch (error: any) {
      //     ToastAndroid.show(error.message, ToastAndroid.LONG);
      //   }
    },
    [setNode1Coord],
  );

  const nodeTwoDragHandler = useCallback(
    async (dragedCoords: number[]) => {
      if (!nodeRef1.current) {
        return false;
      }

      try {
        const transform = await nodeRef1.current.getTransformAsync();
        setDistance(transform.position, dragedCoords);
        setNode2Coord(dragedCoords);
      } catch (error: any) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    },
    [setDistance, setNode2Coord],
  );

  return (
    <ViroARScene
      ref={arSceneRef}
      onTrackingUpdated={onSceneUpdated}
      onClick={pressSceneHandler}>
      <ARNode nodeRef={nodeRef1} onDrag={nodeOneDragHandler}>
        <ViroText
          text={coordOne}
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0.01, -0.05]}
          style={styles.text}
        />
      </ARNode>

      <ARNode nodeRef={nodeRef2} onDrag={nodeTwoDragHandler}>
        <ViroText
          text={coordTwo}
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0.06, -0.05]}
          style={styles.text}
        />

        <ViroText
          text={`${distance} cm`}
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0, -0.05]}
          style={styles.text}
        />
      </ARNode>
    </ViroARScene>
  );
};

const ARNavigator = () => {
  return <ViroARSceneNavigator initialScene={{scene: ARMeasure}} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
    fontSize: 18,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    width: 100,
  },
});

export default ARNavigator;
