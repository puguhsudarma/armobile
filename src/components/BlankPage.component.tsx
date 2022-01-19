import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface Props {
  onPress(): void;
}

const BlankPage: React.FC<Props> = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'AR Measure'}</Text>
      <View style={styles.buttonContainer}>
        <Button color="#3498db" title="Start AR" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000',
    marginBottom: 8,
  },
  buttonContainer: {
    width: 200,
  },
});

export default BlankPage;
