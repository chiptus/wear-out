import React from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
export default class HomeScreen extends React.Component {
  render() {
    // eslint-disable-next-line
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        <Button title="Add Combination" onPress={() => navigate('Add')} />
      </View>
    );
  }
}

HomeScreen.propTypes = {};

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Welcome',
  headerRight: (
    <Button onPress={() => navigation.navigate('Add')} title="Add" />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
