import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Column = ({ onPress, children, title }) => {
  return (
    <View style={styles.column}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <View style={styles.button}>
          {title ? <Text style={styles.buttonText}>{title}</Text> : children}
        </View>
      </TouchableOpacity>
    </View>
  );
};
const ClosetScreen = () => (
  <View style={styles.container}>
    <View style={[styles.row]}>
      <Column
        onPress={() => {
          alert('Search');
        }}
        title={'Search'}
      />
      <Column
        onPress={() => {
          alert('Wardrobe');
        }}
        title="Wardrobe"
      />
    </View>
    <View style={styles.row}>
      <Column
        onPress={() => {
          alert('Statistics');
        }}
        title="Statistics"
      />
      <Column
        onPress={() => {
          alert('Calendar');
        }}
        title="Calendar"
      />
    </View>
  </View>
);

ClosetScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Closet',
    headerRight: (
      <TouchableOpacity
        style={styles.closeButton.container}
        onPress={() => navigation.navigate('Add')}
      >
        <View style={styles.closeButton.view}>
          <MaterialCommunityIcons name="window-closed" size={24} />
        </View>
      </TouchableOpacity>
    ),
  };
};

export default ClosetScreen;

const styles = {
  closeButton: {
    container: {
      flex: 1,
    },
    view: {
      padding: 5,
      margin: 3,
    },
  },
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
    backgroundColor: '#3F88C5',

    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F49D37',
  },
};
