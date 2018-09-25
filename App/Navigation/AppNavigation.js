import {DrawerNavigator, StackNavigator} from 'react-navigation'
import PlayNowScreen from '../Containers/PlayNowScreen'
import PlaylistScreen from '../Containers/PlaylistScreen'
import SearchScreen from '../Containers/SearchScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import Colors from "../Themes/Colors";

// Manifest of possible screens

const Library = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SearchScreen: { screen: SearchScreen },
  PlaylistScreen: { screen: PlaylistScreen },
  PlayNowScreen: { screen: PlayNowScreen },
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTintColor: Colors.silver,
    headerTitleStyle: styles.title,
  }
})
const PrimaryNav = DrawerNavigator({
  Library: {
    screen: Library,
  },
});

export default PrimaryNav
