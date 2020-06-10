import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, Alert, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import api from '../services/api';

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: '#fafafa'
    },
    titulo:{
        position: 'absolute',
        width: 354,
        height: 21,
        left: -10,
        top: 15,

        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 25,
        textAlign: 'center',
        letterSpacing: -0.333333,
        color: '#31788A'
    },
    NameInput:{
        borderColor: '#0A566D'
    },
    Form:{
      flex: 1,
      marginBottom: 5,
      top: 60,
      marginLeft: 10,
      marginRight: 15
  },
    CadButton: {
        backgroundColor: '#31788A',
        borderRadius: 5,
        width: 325,
        padding: 10,
      },
      containerButton: {
        bottom: 20,
        marginLeft:10,
        marginTop: 60
      },
    
});

export default class Cadastro extends Component {
    static navigationOptions = {
        title: 'Cadastro de Novos Usuários',
    }
    state = {   
      previlegio: ' ', name:'', email:'', senha:'', senhaTemp:'', error:'' 
    };

    handlenameChange = (name) => {
      this.setState({ name });
    };

    handleemailChange = (email) => {
    this.setState({ email });
    };

    handlesenhaChange = (senha) => {
      this.setState({ senha });
    };

    handlesenhaTempChange = (senhaTemp) => {
      this.setState({ senhaTemp });
    };

    handleCadastrarPress = async () => {
      if (this.state.name.length === 0 || this.state.email.length === 0 || this.state.senha.length == 0 ||  this.state.senhaTemp.length == 0 ) {
        this.setState({ error: Alert.alert('Atenção','Preencha todos os campos para continuar.') }, () => false);
      }
      if(this.state.senha != this.state.senhaTemp){
        this.setState({ error: Alert.alert('Atenção','Senhas não conferem!') }, () => false);
      }
       else {
        try {
          const response = await api.post('cadastro', {
            status: 20,
            payload:[{
              nome: this.state.name
            },
            {
              senhaTemp: this.state.senha
            },
            {
              email: this.state.email
            },
            {
              previlegio: this.state.previlegio
            }]
          });
            
          //await AsyncStorage.setItem(' ', response.data.token);
          Alert.alert('Cadastrado com sucesso')

          this.setState({   
            previlegio: ' ', name:'', email:'', senha:'', senhaTemp:'', error:''
          });
         
          this.props.navigation.dispatch(resetAction);
        } catch (_err) {
          this.setState({ error: Alert.alert('Atenção','Houve um problema com o cadastro, verifique suas credenciais!') });
        }
      }
    };
  
    render() {
      return (
         <SafeAreaView style={styles.Container}> 
            <StatusBar barStyle="light-content" backgroundColor="#0A566D"/>
            <Text style={styles.titulo}>Cadastro de Novos Usuários</Text>
            <View style={styles.Form}>

              <Input placeholder="Nome Completo" 
              placeholderColor="#c4c3cb" 
              style={styles.NameInput}
              value={this.state.name}
              onChangeText={this.handlenameChange}
              autoCapitalize="none"
              autoCorrect={false} 
              />
              <Input placeholder="Email" 
              placeholderColor="#c4c3cb" 
              style={styles.NameInput}
              value={this.state.email}
              onChangeText={this.handleemailChange}
              autoCapitalize="none"
              autoCorrect={false} 
              />
              <Input placeholder="Senha Temporária" 
              placeholderColor="#c4c3cb" 
              style={styles.NameInput}
              value={this.state.senha}
              onChangeText={this.handlesenhaChange}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true} 
              />
              <Input placeholder="Confirmação de Senha" 
              placeholderColor="#c4c3cb" 
              style={styles.NameInput}
              value={this.state.senhaTemp}
              onChangeText={this.handlesenhaTempChange}
              autoCapitalize="none"
              autoCorrect={false} 
              secureTextEntry={true}
              />
              <Picker
                selectedValue={this.state.previlegio}
                style={{height: 50, width: 325, marginLeft:10}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({previlegio: itemValue})
                }>
                <Picker.Item label="Moderador" value="moderador" />
                <Picker.Item label="Usuário" value="usuario" />
                <Picker.Item label="Administrador" value="adm" />
              </Picker>
              <Button
                buttonStyle={styles.CadButton}
                containerStyle={styles.containerButton}
                onPress={this.handleCadastrarPress}
                title="Cadastrar"
              />
          </View>
        </SafeAreaView> 
      );
    }
  }
  