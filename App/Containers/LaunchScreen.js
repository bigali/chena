import React, {Component} from 'react'
import {FlatList, Image, ScrollView, Text, View} from 'react-native'
import {Images} from '../Themes'
import {Colors} from '../Themes'
import HeaderButtons, {Item} from 'react-navigation-header-buttons';
import {Item as MaterialItem, MaterialHeaderButtons} from "../Components/MyHeaderButtons";

// Styles
import styles from './Styles/LaunchScreenStyles'
import {connect} from 'react-redux'
import YoutubeActions from '../Redux/YoutubeRedux'
import PlaylistActions from '../Redux/PlaylistRedux'
import Card from "./Card";
import {Button, Dialog, FAB, Paragraph, TextInput} from 'react-native-paper';
import SongRow from "../Components/SongRow";


class LaunchScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderButtons>
          <Item
            title="hamburger"
            ButtonElement={<Image source={Images.menuButton}
                                  style={{height: 30, width: 30, backgroundColor: 'transparent'}}/>}
            buttonWrapperStyle={{marginLeft: 10}}
            onPress={() => navigation.navigate('DrawerOpen')}
          />
        </HeaderButtons>
      ),
      headerRight: (
        <MaterialHeaderButtons>
          <MaterialItem title="add" iconName="search" onPress={() => navigation.navigate('SearchScreen')}/>
        </MaterialHeaderButtons>

      ),
      title: 'Library',
    }
  };
  state = {
    visible: false,
    text: ''
  };
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });
  _keyExtractor = (item, index) => item.id;
  _renderPopularItem = ({item}) => {
    const id = item.id
    const snippet = item.snippet
    const titleAuthor = snippet.title.split(' - ')
    const title = titleAuthor[0]
    const author = titleAuthor[1]
    return (
      <Card
        uri={snippet.thumbnails.medium.url}
        titleText={styles.titleText} title={title}
        author={author}
        onPress={() => this.props.navigation.navigate('PlayNowScreen', {videoId: id})}
      />
    )
  }

  _renderPlaylistItem = ({item}) => {
    return (
      <Card
        onPress={() => this.props.navigation.navigate('PlaylistScreen', {playlist: item})}
        playlist={item}
        uri={'http://www.prun.net/im/design/cover-default.png'}
        titleText={styles.titleText}
        title={item.name}
        author={item.songs.length}/>
    )
  }


  _renderHeader = (title) => {
    return (
      <Text style={[styles.titleText, {fontSize: 24, margin: 16}]}>
        {title}
      </Text>
    )
  }

  componentDidMount() {
    const {navigation, getPopular} = this.props
    getPopular()
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={{marginTop: 16}}>

            {this.props.payload ?
              <View>
                {this._renderHeader('POPULAR')}
                <FlatList
                  style={{ marginHorizontal: 12 }}
                  data={this.props.payload.items}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderPopularItem}
                  horizontal
                />
              </View>
              :
              <View/>
            }
          </View>
          <View style={{marginTop: 16}}>

            {this.props.playlists.length ?
              <View>
                {this._renderHeader('PLAYLISTS')}
                <FlatList
                  style={{ marginHorizontal: 12 }}
                  data={this.props.playlists}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderPlaylistItem}
                  horizontal
                />
              </View>
              :
              <View/>
            }
          </View>

        </ScrollView>
        <FAB
          style={{ position: 'absolute', bottom: 16, right: 16 }}
          small={false}
          icon="add"
          onPress={this._showDialog}
        />
        <Dialog
          visible={this.state.visible}
          onDismiss={this._hideDialog}
        >
          <Dialog.Title>Add Playlist</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label='Playlist'
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              this.props.addPlaylist(this.state.text)
              this.setState({
                text: '',
                visible: false
              })
            }}>Add</Button>
            <Button onPress={this._hideDialog}>cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    nav: state.nav,
    payload: state.youtube.popularPayload,
    fetching: state.youtube.popularFetching,
    playlists: state.playlist.playlists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPopular: () => dispatch(YoutubeActions.youtubePopularRequest()),
    addPlaylist: (name) => dispatch(PlaylistActions.addPlaylist(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
