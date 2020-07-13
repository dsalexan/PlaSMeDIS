import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, Alert, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import api from '../services/api';

const styles = StyleSheet.create({
    Container:{
        flex: 1,
    },
    titulo:{
        position: 'absolute',
        left: 25,
        top: 15,

        fontFamily: 'Roboto',
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

export default class Update extends Component {
    static navigationOptions = {
        title: 'Atualização de Dados',
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
            status: 140,
            payload:[{
              senhaNova: this.state.senhaNova
            }]
          });
            
          //await AsyncStorage.setItem(' ', response.data.token);
          Alert.alert('Atualizado com sucesso')

          this.setState({   
           senhaNova:'', senhaTempNova:'', error:''
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
            <Text style={styles.titulo}>Atualização de Dados</Text>
            <View style={styles.Form}>

              <Input placeholder="Nova Senha" 
              placeholderColor="#c4c3cb" 
              style={styles.NameInput}
              value={this.state.senhaNova}
              onChangeText={this.handlesenhaChange}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true} 
              />
              <Input placeholder="Confirmação de Senha" 
              placeholderColor="#c4c3cb" 
              style={styles.NameInput}
              value={this.state.senhaTempNova}
              onChangeText={this.handlesenhaTempChange}
              autoCapitalize="none"
              autoCorrect={false} 
              secureTextEntry={true}
              />
              <Button
                buttonStyle={styles.CadButton}
                containerStyle={styles.containerButton}
                onPress={this.handleCadastrarPress}
                title="Atualizar"
              />
          </View>
        </SafeAreaView> 
      );
    }
  }
  