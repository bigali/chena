import React, { Component } from 'react'
import {Image, View} from "react-native";


const ImageContainer = props => (
  <View
    style={{
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      height: props.size,
      width: props.size,
      elevation: 2
    }}
  >
    <Image
      style={{
        height: props.size*1.1,
        width: props.size*1.1,
      }}
      resizeMode='cover'
      source={{uri: props.url}}
    />
  </View>
)

export default ImageContainer
