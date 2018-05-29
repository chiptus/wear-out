import React from 'react';
import { View, TextInput, Image, Button, ToastAndroid } from 'react-native';
import { saveSuit } from '../../lib/state';
import { saveSuitImage } from '../../lib/images';

export default class SaveSuit extends React.Component {
  static navigationOptions = {
    title: 'Save Suit',
  };

  state = {
    description: '',
  };

  submit = async () => {
    const photo = this.props.navigation.getParam('photo', null);
    const { description } = this.state;
    const id = await saveSuit({ description });
    await saveSuitImage(id, photo);

    this.props.navigation.navigate('Suit', { id });
    ToastAndroid.show('Saved', ToastAndroid.SHORT);
  };

  componentDidMount() {}

  render() {
    const photo = this.props.navigation.getParam('photo', null);
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={{ width: 250, height: 250 }} />
        <TextInput
          style={{ height: 50, width: 300 }}
          placeholder="Description"
          multiline={true}
          onChangeText={text => this.setState({ description: text })}
        />
        <Button title="Save" onPress={this.submit} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
