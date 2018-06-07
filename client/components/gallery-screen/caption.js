import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';

export default ({ suit }) => {
  return suit ? (
    <View style={styles.container}>
      <Text style={styles.description}>{suit.description || ''}</Text>
      <Text style={styles.date}>{format(suit.createdAt, 'DD/MM/YYYY')}</Text>
    </View>
  ) : null;
};

const styles = {
  container: {
    bottom: 0,
    height: 65,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
  },
  date: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
  },
};
