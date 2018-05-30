import React from 'react';
import Gallery from 'react-native-image-gallery';
import { View, Text, Button } from 'react-native';

import { getSuits } from '../../lib/state';
import { getImageName } from '../../lib/images';

import { format } from 'date-fns';

export default class GalleryScreen extends React.Component {
  state = {
    suits: [],
    currentImageIndex: -1,
    sortAsc: false,
  };

  async componentDidMount() {
    const { ids, byId } = await getSuits();
    this.setState({ suits: ids.map(id => byId[id]) });

    const { navigation } = this.props;
    const sortAsc = navigation.getParam('sortAsc', false);
    this.setState({ sortAsc });

    this.props.navigation.setParams({ onClickSort: this.onClickSort });
  }

  renderCaption() {
    const { suits, currentImageIndex } = this.state;
    if (!suits || !suits.length || currentImageIndex < 0) {
      return null;
    }
    const suit = suits[currentImageIndex];
    return (
      <View
        style={{
          bottom: 0,
          height: 65,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          width: '100%',
          position: 'absolute',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 15,
            fontStyle: 'italic',
          }}
        >
          {suit.description || ''}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 15,
            fontStyle: 'italic',
          }}
        >
          {format(suit.createdAt, 'DD/MM/YYYY')}
        </Text>
      </View>
    );
  }

  componentWillUnmount() {
    // makes this function a noop incase unmounted
    this.onChangeImage = () => {};
  }

  onChangeImage = (index, ...rest) => {
    this.setState({ currentImageIndex: index });
  };

  onClickSort = () => {
    const { sortAsc } = this.state;
    const sort = !sortAsc;
    this.setState({ sortAsc: sort });
    this.props.navigation.setParams({ sortAsc: sort });
  };

  render() {
    const { suits, sortAsc } = this.state;
    const images = suits
      .sort((a, b) => {
        if (!sortAsc) {
          return b.createdAt - a.createdAt;
        }
        return a.createdAt - b.createdAt;
      })
      .map(s => ({
        source: { uri: getImageName(s.id) },
        dimensions: { width: 150, height: 150 },
      }));
    return (
      <View style={{ flex: 1 }}>
        <Gallery
          style={{ flex: 1, backgroundColor: 'black' }}
          images={images}
          onPageSelected={this.onChangeImage}
        />
        {this.renderCaption()}
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {
      onClickSort: () => {},
      sortAsc: false,
    };

    return {
      title: 'Gallery',
      headerRight: (
        <Button
          title={params.sortAsc ? 'Asc' : 'Dec'}
          onPress={params.onClickSort}
        />
      ),
    };
  };
}
