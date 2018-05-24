import React from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, Permissions } from 'expo';

// eslint-disable-next-line react/prefer-stateless-function
export default class AddScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    // eslint-disable-next-line
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => (this.camera = ref)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                Flip
              </Text>
            </TouchableOpacity>
            <Button onPress={this.snap} title="Snap" />
          </View>
        </Camera>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
