import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
console.disableYellowBox = true;

AppRegistry.registerComponent('chena', () => App)
