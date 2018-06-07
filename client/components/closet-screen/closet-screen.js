import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';

const Column = ({ onPress, children }) => {
  return (
    <View style={styles.column}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <View style={styles.button}>{children}</View>
      </TouchableOpacity>
    </View>
  );
};
const ClosetScreen = () => (
  <View style={styles.container}>
    <View style={[styles.row]}>
      <Column
        onPress={() => {
          console.log('A');
        }}
      >
        <Text>A</Text>
      </Column>
      <Column
        onPress={() => {
          console.log('B');
        }}
      >
        <Text>B</Text>
      </Column>
    </View>
    <View style={styles.row}>
      <Column
        onPress={() => {
          console.log('C');
        }}
      >
        <Text>C</Text>
      </Column>
      <Column
        onPress={() => {
          console.log('D');
        }}
      >
        <Text>D</Text>
      </Column>
    </View>
  </View>
);
export default ClosetScreen;

const styles = {
  container: {
    flex: 1,
    // width: '100%',
  },
  row: {
    // width: '100%',
    // height: '50%',
    flex: 1,
    // justifyContent: 'stretch',
    flexDirection: 'row',
    // alignContent: 'stretch',
  },
  column: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
};
