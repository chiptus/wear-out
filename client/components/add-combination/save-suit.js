import React from 'react';
import {
  View,
  TextInput,
  Image,
  AsyncStorage,
  Button,
  ToastAndroid,
} from 'react-native';
import { FileSystem } from 'expo';
import uuid from 'uuid/v4';
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
    const id = uuid();
    await FileSystem.copyAsync({
      from: photo,
      to: `file://${FileSystem.documentDirectory}/${id}.png`,
    });
    const suits = await this.getSuits();
    suits.ids.push(id);
    suits.byId[id] = {
      description,
      createdAt: Date.now(),
      id,
    };
    await AsyncStorage.setItem('suits', JSON.stringify(suits));
    this.props.navigation.navigate('Suit', { id });
    ToastAndroid.show('Saved', ToastAndroid.SHORT);
  };

  async getSuits() {
    const suitsString = await AsyncStorage.getItem('suits');
    try {
      const suits = JSON.parse(suitsString);
      suits.ids = suits.ids || [];
      suits.byId = suits.byId || {};
      return suits;
    } catch (e) {
      return {
        byId: {},
        ids: [],
      };
    }
  }

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
