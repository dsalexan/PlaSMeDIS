import React, { Component } from "react";

import {Text, View, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Feather';
import api from '../services/api';
import Postagem from '../pages/postagem';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';

export default class Seletor extends Component {
    state = {categorias: [], categoria_valor: ''};
    componentDidMount =()=>{
        this.getCategoria();
    };
      getCategoria =()=>{
           api.get("categorias").then( res => {
            console.log(res.data.Categorias);
            this.setState({  categorias: res.data.Categorias});
          });
      };
      render(){
        return(
            <Picker
              selectedValue={this.state.categoria_valor}
              style={{height: 50, width: 325, marginLeft:10}}
              onValueChange={(ItemValue, ItemIndex) =>
              this.setState({categoria_valor: ItemValue})
              }>
              { this.state.categorias.map((v, key)=>(
              <Picker.Item label={v.nome} value={v.id} key={key} />
              ))}
            </Picker>
        );
    
    }
}