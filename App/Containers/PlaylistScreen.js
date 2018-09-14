import React from 'react'
import {View, Text, FlatList, Image, Slider} from 'react-native'
import {connect} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButtons, {HeaderButton, Item} from 'react-navigation-header-buttons';
import {IconButton, Colors, FAB} from 'react-native-paper';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/PlaylistScreenStyle'
import SongRow from "../Components/SongRow";
import Fonts from "../Themes/Fonts";

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={24} color="white"/>
);


class PlaylistScreen extends React.PureComponent {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="back" iconName="ios-arrow-back" onPress={() => navigation.goBack()}/>
        </HeaderButtons>
      ),
      title: navigation.state.params.playlist.name,
      headerRight: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="search" iconName="ios-search" onPress={() => navigation.navigate('SearchScreen')}/>
        </HeaderButtons>
      ),
    }
  }

  _renderSongItem = ({item}) => {
    const snippet = item.snippet
    const titleAuthor = snippet.title.split(' - ')
    const title = titleAuthor[1]
    const author = titleAuthor[0]
    return (
      <SongRow
        uri={snippet.thumbnails.medium.url} song={item} titleText={styles.titleText} title={title} author={author}
      />
    )
  }

  keyExtractor = (item, index) => index

  render() {
    console.log(this.props.navigation.state.params)
    const songs = this.props.navigation.state.params.playlist.songs
    const firstSong = songs[0]
    const titleAuthor = firstSong.snippet.title.split(' - ')
    const title = titleAuthor[0]
    const author = titleAuthor[1]
    return (
      <View style={styles.container}>
        <View style={{margin: 16}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                height: 120,
                width: 120,
                marginHorizontal: 8
              }}
            >
              <Image
                style={{
                  height: 170,
                  width: 170,
                  marginHorizontal: 8
                }}
                resizeMode='cover'
                source={{uri: firstSong.snippet.thumbnails.medium.url}}
              />
            </View>
            <View>
              <Text numberOfLines={1} style={[this.props.titleText, {fontSize: 19, fontWeight: "bold"}]}>
                {title}
              </Text>
              <Text numberOfLines={2} style={[Fonts.style.normal, {fontSize: 16}]}>
                {author}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'space-between', marginTop: 10}}>
                <View style={{flexDirection: 'row', marginRight: 15}}>
                  <IconButton
                    icon="shuffle"
                    color={Colors.grey500}
                    size={20}
                    onPress={() => console.log('Pressed')}
                  />
                  <IconButton
                    icon="repeat"
                    color={Colors.grey500}
                    size={20}
                    onPress={() => console.log('Pressed')}
                  />
                  <IconButton
                    icon="favorite"
                    color={Colors.red500}
                    size={20}
                    onPress={() => console.log('Pressed')}
                  />
                </View>
                <View style={{flexDirection: 'row', marginLeft: 15}}>
                  <FAB
                    small
                    icon="play-arrow"
                    onPress={() => console.log('Pressed')}
                    style={{height: 41}}
                  />

                  <IconButton
                    icon="skip-next"
                    color={Colors.grey500}
                    size={20}
                    onPress={() => console.log('Pressed')}
                  />
                </View>


              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: 8, marginVertical: 16 }}>
            <Text>3:15</Text>
            <Slider style={{ width: '87%', elevation: 4 }}  />
            <Text>5:12</Text>
          </View>

        </View>
        {songs ?
          <FlatList
            style={{marginHorizontal: 15}}
            data={songs}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderSongItem}
          />
          :
          <View/>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen)
