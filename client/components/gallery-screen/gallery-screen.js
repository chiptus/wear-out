import React from 'react';
import Gallery from 'react-native-image-gallery';
import { View, Button } from 'react-native';

import { getSuits } from '../../lib/state';
import { getImageName } from '../../lib/images';
import Caption from './caption';

export default class GalleryScreen extends React.Component {
  state = {
    suits: [],
    currentImageIndex: -1,
    sortAsc: false,
  };

  async componentDidMount() {
    const { ids, byId } = await getSuits();
    this.setState({ suits: ids.map(id => byId[id]) });
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
    const { suits, currentImageIndex } = this.state;
    const sortAsc = this.props.navigation.getParam('sortAsc', false);
    const images = sortImages(suits, sortAsc);
    const currentImage =
      currentImageIndex >= 0 ? suits[currentImageIndex] : null;
    return (
      <View style={{ flex: 1 }}>
        <Gallery
          style={{ flex: 1, backgroundColor: 'black' }}
          images={images}
          onPageSelected={this.onChangeImage}
        />
        <Caption suit={currentImage} />
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    const { sortAsc } = navigation.state.params || {
      sortAsc: false,
    };

    return {
      title: 'Gallery',
      headerRight: (
        <Button
          title={sortAsc ? 'Asc' : 'Dec'}
          onPress={() => navigation.setParams({ sortAsc: !sortAsc })}
        />
      ),
    };
  };
}

function sortImages(suits, sortAsc) {
  return suits
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
}
