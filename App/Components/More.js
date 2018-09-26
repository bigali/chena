import React, {Component} from 'react'
import {TouchableNativeFeedback, View} from 'react-native'
import showPopupMenu from 'react-native-popup-menu-android'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from "../Themes/Colors";
import YoutubeActions from "../Redux/YoutubeRedux";
import PlaylistActions from "../Redux/PlaylistRedux";
import connect from "react-redux/es/connect/connect";
import ChoosePlaylistDialog from "./ChoosePlaylistDialog";

class More extends Component {
  moreButton: null | Element<typeof View>
  state = {
    visible2: false
  };

  _openDialog2 = () => this.setState({ visible2: true });
  _closeDialog2 = (index) => {
    this.setState({ visible2: false });
    console.log("choosed playlist: ", index)
    this.props.addToPlaylist(index, this.props.song)
  }


  render() {
    return (
      <TouchableNativeFeedback onPress={this.showMore}>
        <View ref={this.refMoreButton}>
          <Icon name="more-horiz" size={25} color={Colors.charcoal}/>
          <ChoosePlaylistDialog visible={this.state.visible2} close={this._closeDialog2} playlists={this.props.playlists} />
        </View>
      </TouchableNativeFeedback>
    )
  }

  refMoreButton = el => this.moreButton = el

  showMore = () => {
    showPopupMenu(
      [
        {id: 'add_playlist', label: 'add to playlist'},
        {id: 'add_favourites', label: 'add to favourites'}
      ],
      this.handleMoreItemSelect,
      this.moreButton
    );
  }

  handleMoreItemSelect = (item: PopupMenuItem) => {
    switch (item.id) {
      case 'add_playlist':
        this._openDialog2()
        break;
      case ('add_favourites'):
        this.props.addToFavourites(this.props.song)
        break;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    nav: state.nav,
    playlists: state.playlist.playlists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToPlaylist: (index, song) => dispatch(PlaylistActions.addToPlaylist(index, song))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(More)
