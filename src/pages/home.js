import React, { Component } from "react";

import {Text, View, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Feather';
import api from '../services/api';
import Postagem from '../pages/postagem';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  foto_post:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#fff',
    borderRadius:50,
    marginTop: 13,
    marginLeft: 10,

  },
  post:{
    position: 'absolute',
    width: 414,
    height: 75,
    left: 0,
    marginTop: 10,

    backgroundColor: '#ffffff',
    elevation:1,
  },
  ask:{
    borderWidth:1,
    borderColor:'#F5F5F5',
    alignItems:'center',
    justifyContent:'center',
    width:280,
    height:40,
    backgroundColor:'#F5F5F5',
    borderRadius:50,
    marginTop: -45,
    marginLeft: 70,
  },
  duvida:{
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    left: -45,
    fontSize: 17,
    color: '#7A7A7A'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 100,
    top: 20
  },
  text_titulo: {
    position: 'absolute',
    width: 200,
    height: 49,
    left: 12,
    top: 20,

    fontFamily: 'Roboto',
    fontSize: 24,

    letterSpacing: -0.333333,

    color: '#09576E',
    
  },
  text_desc: {
    position: 'absolute',
    width: 300,
    height: 49,
    left: 12,
    top: 130,

    fontFamily: 'Roboto',
    fontSize: 24,

    letterSpacing: -0.333333,

    color: '#09576E',
    
  },
  loginButton: {
    backgroundColor: '#31788A',
    borderRadius: 5,
    width: 335,
    marginTop: 30,
    marginLeft:15,
    padding: 10,
    left: -10
  },
  icon: {
    marginLeft: 330,
    top: 10
  }
});

export default class Home extends Component {
    static navigationOptions = {
        title: 'Início',
    }
    constructor(props){
      super(props);
      this.state = {isVisible: false};
    }
    state = {titulo: '', content: '', email:'', message: '', error: ''};

    handleTituloChange = (titulo) => {
      this.setState({ titulo });
    };
    
    handleContentChange = (content) => {
     this.setState({ content });
    };
    handleEnviarPress  = async () => {
      const id = await AsyncStorage.getItem('id');
      if (this.state.titulo.length === 0 || this.state.content.length === 0) {
         Alert.alert('Atenção','Preencha usuário e senha para continuar.');
      } else {
        try {

            const response = await api.get('users/'+id);

            await api.post('postagens', {
              texto: this.state.content,
              criador: id,
              titulo: this.state.titulo
            }).then(res=>{
              this.setState({ message: res.data.message});
              this.setState({ error: res.data.error});
            });

            Alert.alert('Sucesso!', this.state.message );
            this.setState({content: '', titulo: '', message: '', error: ''});
            this.setState({ isVisible: false });
                  
        } catch (_err) {
          Alert.alert('Atenção!', this.state.error);
        }
      }
    };
    render() {
      return (
        <View>
          <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState({ isVisible: false });
          }}
        >
          <TouchableOpacity onPress={() => {this.setState({ isVisible: false });}}>
            <Icon name="x" size={25} color="#31788A" style={styles.icon} light />
          </TouchableOpacity>
          <View style={styles.modal}>
            <Text style={styles.text_titulo}>Título da Pergunta</Text>
            <TextInput
              onChangeText={this.handleTituloChange}
              value={this.state.titulo}
              style={{ height: 50, width:335, borderColor: 'gray', borderWidth: 1, borderRadius:5, top: -40, left: -3 }}
              editable
              maxLength={40}
            />
            <Text style={styles.text_desc}>Descrição da Pergunta</Text>
            <TextInput
              multiline
              numberOfLines={4}
              onChangeText={this.handleContentChange}
              value={this.state.content}
              style={{ height: 100, width:300, borderColor: 'gray', borderWidth: 1, borderRadius:5, left: -3,  width:335, top: 20 }}
            
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={this.handleEnviarPress}
              title="Enviar"
            />
          </View>
        </Modal>
            <View style={styles.post}>
              <View
                style={styles.foto_post}>
              </View>
              <TouchableOpacity style={styles.ask} onPress={() => {
                this.setState({ isVisible: true });
              }}>
                <View>
                  <Text style={styles.duvida}>Qual é a sua dúvida?</Text>
                </View>
              </TouchableOpacity>
            </View>    
            <Postagem />
        </View> 
      );
    }
  }
  