import React, {Component} from "react";
import {Image, Text, View} from "react-native";
import Fonts from "../Themes/Fonts";
import {TouchableRipple} from "react-native-paper";

export default class Card extends Component {
  render() {
    return(
      <TouchableRipple onPress={this.props.onPress}>
        <View
          style={{width: 120, marginHorizontal: 4}}>
          <View
            style={{
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              height: 120,
              width: 120,
            }}
          >
            <Image
              style={{
                height: 170,
                width: 170,
              }}
              resizeMode='cover'
              source={{uri: this.props.uri}}
            />

          </View>
          <Text numberOfLines={1} style={[this.props.titleText, {fontSize: 19, fontWeight: "bold"}]}>
            {this.props.title}
          </Text>
          <Text numberOfLines={2} style={[Fonts.style.normal, {fontSize: 16}]}>
            {this.props.author}
          </Text>
        </View>
      </TouchableRipple>
    )
  }
}
