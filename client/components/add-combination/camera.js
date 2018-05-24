import React from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, Permissions } from 'expo';

import ButtonLine from './button-line';

// eslint-disable-next-line react/prefer-stateless-function
export default class AddScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onSnapPress = async () => {
    if (!this.camera) {
      return;
    }
    let { uri } = await this.camera.takePictureAsync({ base64: false });
    this.props.navigation.navigate('SaveSuit', { photo: uri });
  };

  onFlipPress = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (!hasCameraPermission || hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    // eslint-disable-next-line
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={this.state.type}
          ref={ref => (this.camera = ref)}
          onMountError={({ message }) => console.log(message)}
        />
        <ButtonLine
          onFlipPress={this.onFlipPress}
          onSnapPress={this.onSnapPress}
        />
      </View>
    );
  }
}

AddScreen.propTypes = {};

AddScreen.navigationOptions = {
  title: 'Add Combination',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  camera: {
    flex: 0.75,
    width: '100%',
  },
});
