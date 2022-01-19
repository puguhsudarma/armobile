import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useARState from '../ARState.store';
import {formatCoordinates} from '../utility';

const BottomInfo: React.FC = () => {
  const coordOne = useARState(
    useCallback(state => formatCoordinates(state.node1Coord), []),
  );
  const coordTwo = useARState(
    useCallback(state => formatCoordinates(state.node2Coord), []),
  );
  const distance = useARState(state =>
    state.distance ? state.distance.toFixed(2) : '0',
  );
  const isTrackingPlane = useARState(state => state.isTrackingPlane);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.text}>{`Status: ${
          isTrackingPlane ? 'Ready' : 'Tracking None'
        }`}</Text>
        <Text style={styles.text}>{`Node 1: ${coordOne}`}</Text>
        <Text style={styles.text}>{`Node 2: ${coordTwo}`}</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.column}>
        <Text style={styles.text}>{`Distance: ${distance} cm`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    minHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  column: {
    flex: 1,
  },
  spacer: {
    width: 16,
  },
  text: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
});

export default BottomInfo;
