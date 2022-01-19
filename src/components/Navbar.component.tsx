import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress(): void;
}

export const NAVBAR_HEIGHT = 56;

const Navbar: React.FC<Props> = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={onPress}
          style={styles.button}
          android_ripple={{color: '#ecf0f1', radius: 99, borderless: true}}>
          <Ionicons name="arrow-back-outline" color="#000" size={26} />
          <Text style={styles.text}>{'Back'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: NAVBAR_HEIGHT + 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 8,
    height: 48,
  },
  button: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  text: {
    marginBottom: 1,
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Navbar;
