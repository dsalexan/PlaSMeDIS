import React, { Component } from "react";

import {Text, View, StatusBar} from 'react-native';

export default class Recomendado extends Component {
    static navigationOptions = {
        title: 'Recomendados',
    }
    render() {
      return (
         <View> 
            <Text>Teste Recomendados</Text>
        </View> 
      );
    }
  }
  