import React from 'react';
import { View, TextInput } from 'react-native'
import {Button} from "react-native-paper";
import YoutubeActions from "../Redux/YoutubeRedux";
import PlaylistActions from "../Redux/PlaylistRedux";
import connect from "react-redux/es/connect/connect";

class SearchComponent extends React.Component {
  state = {
    firstQuery: '',
  };



  render() {
    console.log("search payload", this.props.payload)
    const { firstQuery } = this.state;
    return (
     <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
       <TextInput
         underlineColorAndroid="transparent"
         placeholderTextColor="white"
         selectionColor="white"
         placeholder="search"
         autoFocus
         onChangeText={(firstQuery) => {
           this.setState({firstQuery})
           if(firstQuery.length>=3) {
             this.props.getSearch(firstQuery)
           }
         }}
         value={this.state.firstQuery}
         style={{
           color: 'white',
           height: 50,
           width: '80%',
         }} />

       {this.state.firstQuery !== '' ? <Button compact icon="close" color={'white'}
               onPress={() => { this.setState({firstQuery: ''}) }} /> : null }
     </View>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    nav: state.nav,
    payload: state.youtube.searchPayload,
    fetching: state.youtube.searchFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearch: (term) => dispatch(YoutubeActions.youtubeSearchRequest(term)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
