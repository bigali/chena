import React from 'react'
import {View, Text, FlatList, TextInput} from 'react-native'
import {connect} from 'react-redux'
import SearchComponent from "../Components/SearchComponent";

// Styles
import styles from './Styles/SearchScreenStyle'

import SongRow from "../Components/SongRow";
import {Item, MaterialHeaderButtons} from "../Components/MyHeaderButtons";



class SearchScreen extends React.PureComponent {


  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <MaterialHeaderButtons>
          <Item title="add" iconName="chevron-left" onPress={() => navigation.goBack()}/>
        </MaterialHeaderButtons>
      ),
      headerTitle: <SearchComponent/>
    }
  };
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'}
    ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{item.title}</Text>
        <Text style={styles.label}>{item.description}</Text>
      </View>
    )
  }

  _renderSongItem = ({item}) => {
    console.log(item)
    const id = item.id.videoId
    const snippet = item.snippet
    const titleAuthor = snippet.title.split(' - ')
    const title = titleAuthor[1]
    const author = titleAuthor[0]
    return (
      <SongRow
        uri={snippet.thumbnails.medium.url}
        song={item}
        titleText={styles.titleText}
        title={title}
        author={author}
        onPress={() => this.props.navigation.navigate('PlayNowScreen', {videoId: id})}
      />
    )
  }


  render() {
    console.log("payload", this.props.payload)
    return (
      <View style={styles.container}>
        {this.props.payload ?
          <FlatList
            style={{marginHorizontal: 12}}
            data={this.props.payload.items}
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
    nav: state.nav,
    payload: state.youtube.searchPayload,
    fetching: state.youtube.searchFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
