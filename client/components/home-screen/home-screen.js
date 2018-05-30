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
        <Button title="Add Suit" onPress={() => navigate('Add')} />
        <Button title="Gallery" onPress={() => navigate('Gallery')} />
      </View>
    );
  }
}

HomeScreen.propTypes = {};

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: 'Welcome',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
