import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {View, Text, Image,Alert} from 'react-native'
import styles from './Styles/SongRowStyle'
import Fonts from "../Themes/Fonts";
import {Button, TouchableRipple} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons'
import More from "./More";

export default class SongRow extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  //

  render () {
    return (
      <TouchableRipple onPress={this.props.onPress}>
        <View style={styles.container}>
          <View
            style={{
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              height: 46,
              width: 46,
              marginHorizontal: 8
            }}
          >
            <Image
              style={{
                height: 65,
                width: 65,
                marginHorizontal: 8
              }}
              resizeMode='cover'
              source={{uri: this.props.uri}}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={[this.props.titleText, {fontSize: 14, fontWeight: "bold"}]}>
              {this.props.author}
            </Text>
            <Text numberOfLines={1} style={[Fonts.style.normal, {fontSize: 12}]}>
              {this.props.title}
            </Text>
          </View>
          <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{marginHorizontal: 8}}>
              5:30
            </Text>
            {/*
          <Icon.Button name="more-horiz" iconStyle={{marginRight: 0}} onPress={() => Alert.alert("qsdfmlqjfd")} color={'black'} backgroundColor="transparent" />
*/}

            <More song={this.props.song} />

          </View>
        </View>
      </TouchableRipple>

    )
  }
}
