import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.headerColor,
    elevation: 0
  },
  title: {
    fontFamily: 'ProximaNova',
    fontWeight: '400',
    flex: 1,
    textAlign: 'center'
  }
})
