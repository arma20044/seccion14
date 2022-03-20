import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { Text } from 'react-native';
import { Navigator } from './src/navigator/Navigator';
//import 'react-native-gesture-handler';

const App = () => {
  return (
    <NavigationContainer>

          <Navigator/>

    </NavigationContainer>

   
  )
}
export default App;