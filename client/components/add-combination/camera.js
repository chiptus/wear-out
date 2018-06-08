import React from 'react';
// import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Camera, Permissions, Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={this.state.type}
          ref={ref => (this.camera = ref)}
          onMountError={({ message }) => console.log(message)}
        >
          <OpenClosetButton onPress={() => navigate('Closet')} />
          <SnapPicture onSnap={this.onSnapPress} />
        </Camera>
      </View>
    );
  }

  static propTypes = {};

  static navigationOptions = {
    header: null,
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function OpenClosetButton({ onPress }) {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        marginTop: 5,
        marginLeft: 5,
        backgroundColor: '#D1E3DD',
        borderRadius: 3,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name="window-open" size={32} />
      </TouchableOpacity>
    </View>
  );
}

const SnapPicture = ({ onSnap }) => (
  <View
    style={{
      marginBottom: 5,
      backgroundColor: '#D1E3DD',
      borderRadius: 50,
    }}
  >
    <TouchableOpacity onPress={onSnap}>
      <View style={{}}>
        <MaterialCommunityIcons name="camera-iris" size={56} />
      </View>
    </TouchableOpacity>
  </View>
);
