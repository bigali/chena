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

const {width, height} = Dimensions.get('window');
const SLIDER_1_FIRST_ITEM = 1;

class PlayNowScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      entries: [{
        "title": "Kalash",
        "author": "Booba feat Kaaris",
        "length": "270",
        "thumbnail": "https://i.ytimg.com/vi/oBbHo8b4FDc/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBXbXAwbO2NebxQTHNJ03lGIA-RiA",
        "url": "https://r1---sn-p5qs7n7l.googlevideo.com/videoplayback?source=youtube&dur=269.862&id=o-AHuPpcNCTldaLpNdAM37aQFTgUOqX8trW-4T-Y14eVlL&lmt=1537603841308858&itag=140&requiressl=yes&ip=54.225.58.0&keepalive=yes&clen=4286687&pl=20&mv=u&mt=1537866735&ms=au%2Conr&ei=Zv2pW5O1B4i9hgbY0qm4Ag&mn=sn-p5qs7n7l%2Csn-vgqsknes&mm=31%2C26&key=yt6&c=WEB&gir=yes&mime=audio%2Fmp4&expire=1537888710&ipbits=0&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Crequiressl%2Csource%2Cexpire&fvip=1&ratebypass=yes&signature=3EB0B04A5A071E881D752C6E5D7F3F13A8E7523C.431E15660043EF4F2D51A05639BFF0555C8F8C03"
      }, {
        "title": "Sous controle",
        "author": "Sofiane",
        "length": "207",
        "thumbnail": "https://i.ytimg.com/vi/D2GEiU56Ku8/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAEdkgr9EJUBwLdxasMf6BYGs1iVw",
        "url": "https://r4---sn-p5qs7ner.googlevideo.com/videoplayback?keepalive=yes&source=youtube&ms=au%2Conr&mv=u&mt=1537866735&mn=sn-p5qs7ner%2Csn-vgqsknee&mm=31%2C26&requiressl=yes&clen=3291726&mime=audio%2Fmp4&itag=140&ipbits=0&key=yt6&expire=1537888710&dur=207.214&pl=20&gir=yes&c=WEB&fvip=4&lmt=1516640744137257&id=o-AIdlVJXX-bxUlhj0wkIBj0kM19DRbcNyVekMZl-QITZo&ei=Zv2pW73SB42qhgaM0ovACA&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Crequiressl%2Csource%2Cexpire&ip=54.225.58.0&ratebypass=yes&signature=D46A8536666A416AEBED33BF03A24E01EB09C5.3B38B0E02DF73292D65C2E141FDA9BDA2370F134"
      }, {
        "title": "Milano prod by Slembeatz",
        "author": "Soolking",
        "length": "255",
        "thumbnail": "https://i.ytimg.com/vi/3f9-9QNdNWY/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAMlgmzFxVYXKi5L4ziArm41_twhg",
        "url": "https://r3---sn-p5qlsnsd.googlevideo.com/videoplayback?ipbits=0&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpcm2%2Cpl%2Crequiressl%2Csource%2Cexpire&id=o-AF5CTZ7EOUVLbFMgwtDZznrZrEWei-jM28sUeuWajXk7&fvip=4&source=youtube&dur=255.047&expire=1537888710&ip=54.225.58.0&key=yt6&lmt=1537073621732871&pcm2=no&requiressl=yes&ei=Zv2pW5PWB4Os8wSPoICwAQ&ms=au%2Conr&mt=1537866735&mv=u&mm=31%2C26&mn=sn-p5qlsnsd%2Csn-vgqs7nly&gir=yes&c=WEB&keepalive=yes&itag=140&pl=20&mime=audio%2Fmp4&clen=4051863&ratebypass=yes&signature=167D422B9EA8CA71C4DFA54D6367EC7F0E4260CE.176689EA7EE3FAB59C29F1AE3657E16D8D924249"
      }, {
        "title": "Tout l'monde s'en fout",
        "author": "Sofiane",
        "length": "157",
        "thumbnail": "https://i.ytimg.com/vi/qwp89PtaUBA/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAWtrL_iuJchLjuOYTQGfOUQ8vDJg",
        "url": "https://r4---sn-p5qs7nel.googlevideo.com/videoplayback?mime=audio%2Fmp4&dur=157.268&itag=140&requiressl=yes&ip=54.225.58.0&gir=yes&mm=31%2C26&source=youtube&mn=sn-p5qs7nel%2Csn-vgqsknez&ei=Zv2pW4rSB4m98wSc253wCg&id=o-AOquYaHaV_jgp77rZ5FT8p6M2AyN8GeKj8vt3i0vFvn1&ms=au%2Conr&mt=1537866735&pl=20&mv=u&fvip=4&key=yt6&ipbits=0&c=WEB&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Crequiressl%2Csource%2Cexpire&clen=2498461&expire=1537888710&lmt=1507184465612122&keepalive=yes&ratebypass=yes&signature=D640AB6DE8F110237E54A8054F45AC9ECADD661F.336B35335C24FD454B3D62183BE6E23E8D3B960B"
      }, {
        "title": "Favela",
        "author": "Naps (Ft. Soolking)",
        "length": "229",
        "thumbnail": "https://i.ytimg.com/vi/6qo8GdzxGpc/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAZTzqw4KXnarBbgmyARD3_r6zI7g",
        "url": "https://r1---sn-p5qlsnd6.googlevideo.com/videoplayback?gir=yes&c=WEB&key=yt6&mn=sn-p5qlsnd6%2Csn-vgqsrnek&mm=31%2C26&ms=au%2Conr&ei=Zv2pW9DdCMvIkAPe6LvIDA&pl=20&mv=u&fvip=1&clen=3630258&keepalive=yes&ip=54.225.58.0&requiressl=yes&mt=1537866735&lmt=1536885597474191&itag=140&id=o-AOx6Io8y2xCEvBHyq0DMUo_zdcglGgo3oJqjRzWiP2NG&dur=228.530&source=youtube&mime=audio%2Fmp4&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Crequiressl%2Csource%2Cexpire&ipbits=0&expire=1537888710&ratebypass=yes&signature=15EF1218A20559DBB6390AF8F344955BD85E7B57.7E76DC570D7CB319A0B9D08CE8B01780C2BED039"
      }]
    }
  }

  static navigationOptions = ({navigation}) => {
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
          <Item title="add" iconName="search" onPress={() => console.warn('add')}/>
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

  render() {
    const { title, author } = this.state.entries[this.state.slider1ActiveSlide]
    return (
      <View style={styles.container}>
        <View style={{height: width * 0.4, backgroundColor: '#65cae2'}}/>
        <View style={{height: width * 0.75, marginTop: -width * 0.4}}>
          <Carousel
            ref={c => this._slider1Ref = c}
            firstItem={SLIDER_1_FIRST_ITEM}
            data={this.state.entries}
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
            {title}
          </Text>
          <Text style={[Fonts.style.normal, {fontSize: 18, textAlign: 'center', width: width}]}>
            {author}
          </Text>
        </View>


        <View style={{justifyContent:'center', alignItems: 'center', flexDirection: 'row', marginHorizontal: 16, marginVertical: 16 }}>
          <Text>3:15</Text>
          <Slider style={{ width: '80%', elevation: 4 }}  />
          <Text>5:12</Text>
        </View>
        <View style={{ justifyContent:'space-between', alignItems: 'center', width: width ,height: 120, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0 }}>
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
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayNowScreen)
