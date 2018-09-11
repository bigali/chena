import React from 'react'
import {View, Text, FlatList, TextInput} from 'react-native'
import {connect} from 'react-redux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html
import HeaderButtons, {HeaderButton, Item} from 'react-navigation-header-buttons';
import Images from "../Themes/Images";
import SearchComponent from "../Components/SearchComponent";

// Styles
import styles from './Styles/SearchScreenStyle'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from "./Card";
import SongRow from "../Components/SongRow";

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={23} color="white"/>
);

class SearchScreen extends React.PureComponent {


  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <SearchComponent/>,
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title="search" iconName="ios-arrow-back" onPress={() => navigation.goBack()}/>
        </HeaderButtons>
      ),
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

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

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
