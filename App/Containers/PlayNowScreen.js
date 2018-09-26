import React, {Component} from 'react'
import {ScrollView, Text, Dimensions, Platform, View, Image, Slider} from 'react-native'
import {connect} from 'react-redux'
import Carousel from 'react-native-snap-carousel';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PlayNowScreenStyle'
import {Item, MaterialHeaderButtons} from "../Components/MyHeaderButtons";
import {animatedStyles, scrollInterpolators} from "../utils/animations";
import {Card, Colors, FAB, IconButton, Paragraph, Title} from "react-native-paper";
import ImageContainer from "../Components/ImageContainer";
import Fonts from "../Themes/Fonts";
import WaveView from "../Components/WaveView";

const {width, height} = Dimensions.get('window');
const SLIDER_1_FIRST_ITEM = 1;
import showPopupMenu from 'react-native-popup-menu-android'
import YoutubeActions from "../Redux/YoutubeRedux";


class PlayNowScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    }
  }

  componentDidMount() {
    const {navigation, getInfoPlayNow} = this.props
    const { videoId } = navigation.state.params
    getInfoPlayNow(videoId)
  }

  static navigationOptions = ({navigation}) => {
    let moreButton = null



    return {
      headerLeft: (
        <MaterialHeaderButtons>
          <Item title="add" iconName="chevron-left" onPress={() => navigation.goBack()}/>
        </MaterialHeaderButtons>
      ),
      title: 'Now Playing',
      // use MaterialHeaderButtons with consistent styling across your app
      headerRight: (
        <MaterialHeaderButtons>
          <Item ref={el => moreButton = el} title="add" iconName="more-horiz" onPress={() => {
            showPopupMenu(
              [
                { id:'edit', label:'Quick Edit' },
                { id:'delete', label:'Trash' },
              ],
              () => {},
              moreButton,
            );
          }}/>
        </MaterialHeaderButtons>
      ),
    }
  }

  wp = (percentage) => {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }


  _renderItem = ({item, index}) => {
    console.log("curent index", item)

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ImageContainer
          size={width*0.6}
          url={item.thumbnail}
        />
        <FAB
          style={{position: 'absolute', bottom: 16, right: 40, backgroundColor: Colors.red500}}
          small={true}
          icon="favorite-border"
          color="white"
          onPress={() => {
          }}
        />
      </View>
    );
  }

  fancyTimeFormat = (time) =>  {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  render() {

    const { trackInfoPlayNowPayload } = this.props
    const { slider1ActiveSlide } = this.state
    return (
      <View style={styles.container}>
        {trackInfoPlayNowPayload ?
          <View style={{ flex: 1 }}>
            <View style={{height: height * 0.3, backgroundColor: '#65cae2'}}/>
            <View style={{height: width * 0.75, marginTop: -width * 0.4}}>
              <Carousel
                ref={c => this._slider1Ref = c}
                firstItem={SLIDER_1_FIRST_ITEM}
                data={trackInfoPlayNowPayload}
                renderItem={this._renderItem}
                sliderWidth={width}
                sliderHeight={width * 0.7}
                itemWidth={width * 0.7}
                containerCustomStyle={{
                  marginTop: 10,
                  overflow: 'visible' // for custom animations
                }}
                contentContainerCustomStyle={{
                  paddingVertical: 10 // for custom animation
                }}
                layout={'tinder'}
                loop={true}
                onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
              />
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={{textAlign: 'center', width: width, fontSize: 20, fontWeight: "bold"}}>
                {trackInfoPlayNowPayload[slider1ActiveSlide].title}
              </Text>
              <Text style={[Fonts.style.normal, {fontSize: 18, textAlign: 'center', width: width}]}>
                {trackInfoPlayNowPayload[slider1ActiveSlide].author}
              </Text>
            </View>


            <View style={{height: height*0.2,justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginHorizontal: 16, marginVertical: 16 }}>
              <Text>0</Text>
              <Slider style={{ width: '80%', elevation: 4 }}  />
              <Text>{this.fancyTimeFormat(trackInfoPlayNowPayload[slider1ActiveSlide].length)}</Text>
            </View>


            <View style={{ justifyContent:'space-between', alignItems: 'center', width: width ,height: 120, flexDirection: 'row', position: 'absolute', bottom: 20, left: 0, paddingHorizontal: 30 }}>
              <IconButton
                icon="skip-previous"
                color={Colors.grey500}
                size={20}
                onPress={() => console.log('Pressed')}
              />

              <IconButton
                icon="shuffle"
                color={Colors.grey500}
                size={20}
                onPress={() => console.log('Pressed')}
              />

              <FAB
                small={false}
                icon="play-arrow"
                onPress={() => console.log('Pressed')}
              />

              <IconButton
                icon="skip-next"
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
            </View>
          </View>:
          <View/>
        }


      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    trackInfoPlayNowFetching: state.youtube.trackInfoPlayNowFetching,
    trackInfoPlayNowPayload: state.youtube.trackInfoPlayNowPayload,
    trackInfoPlayNowError: state.youtube.trackInfoPlayNowError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoPlayNow: (videoId) => dispatch(YoutubeActions.getInfoPlayNowRequest(videoId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayNowScreen)
