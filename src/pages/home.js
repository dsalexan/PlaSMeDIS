import React, { Component } from "react";

import {Text, View, StatusBar} from 'react-native';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
    }
    render() {
      return (
         <View> 
            <StatusBar barStyle="light-content" backgroundColor="#0A566D"/>
            <Text>Teste Home</Text>
        </View> 
      );
    }
  }
  