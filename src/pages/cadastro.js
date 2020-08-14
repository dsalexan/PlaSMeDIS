import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, Alert, KeyboardAvoidingView, SafeAreaView, Plataform, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import { Header } from 'react-navigation-stack';
import api from '../services/api'

const styles = StyleSheet.create({
    Container:{
        flex: 1,
       
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
      user_type: '1', real_name:'', email:'', password:'', senhaTemp:'', error:'' , message:''
    };

    handlenameChange = (real_name) => {
      this.setState({ real_name });
    };

    handleemailChange = (email) => {
    this.setState({ email });
    };

    handlesenhaChange = (password) => {
      this.setState({ password });
    };

    handlesenhaTempChange = (senhaTemp) => {
      this.setState({ senhaTemp });
    };

    handleCadastrarPress = async () => {
      if (this.state.real_name.length === 0 || this.state.email.length === 0 || this.state.password.length == 0 ||  this.state.senhaTemp.length == 0 ) {
        this.setState({ error: Alert.alert('Atenção','Preencha todos os campos para continuar.') }, () => false);
      }
      if(this.state.password != this.state.senhaTemp){
        this.setState({ error: Alert.alert('Atenção','Senhas não conferem!') }, () => false);
      }
       else {
        try {
            const response = await api.post('users', {
              real_name : this.state.real_name,
              password: this.state.password,
              email: this.state.email,
              user_type: this.state.user_type
          }).then(res=>{
            this.setState({message: res.data.message});
            this.setState({error: res.data.error});
          });
            
          //await AsyncStorage.setItem(' ', response.data.token);
          Alert.alert('Sucesso!', this.state.message);

          this.setState({   
            user_type: '1', real_name:'', email:'', password:'', senhaTemp:'', error:''
          });
        } catch (_err) {
          Alert.alert('Atenção', this.state.error)
        }
      }
    };
  
    render() {
      return (
         <SafeAreaView style={styles.Container}> 
            <Text style={styles.titulo}>Cadastro de Novos Usuários</Text>   
              <View style={styles.Form}>
                <KeyboardAvoidingView behavior = "padding" >
                  <ScrollView>
                    <Input placeholder="Nome Completo" 
                    placeholderColor="#c4c3cb" 
                    style={styles.NameInput}
                    value={this.state.real_name}
                    onChangeText={this.handlenameChange}
                    autoCorrect={false}
                    returnKeyType={"next"}
                    onSubmitEditing={() => this.input_2.focus()}
                    blurOnSubmit={false} 
                    />
                    <Input placeholder="Email" 
                    placeholderColor="#c4c3cb" 
                    style={styles.NameInput}
                    value={this.state.email}
                    onChangeText={this.handleemailChange}
                    autoCapitalize="none"
                    KeyboardType='email-address'
                    returnKeyType={"next"}
                    onSubmitEditing={() => this.input_3.focus()}
                    ref={(input) => { this.input_2 = input; }}
                    blurOnSubmit={false} 
                    />
                    <Input placeholder="Senha Temporária" 
                    placeholderColor="#c4c3cb" 
                    style={styles.NameInput}
                    value={this.state.password}
                    onChangeText={this.handlesenhaChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={"next"} 
                    onSubmitEditing={() => this.input_4.focus()}
                    ref={(input) => { this.input_3 = input; }}
                    blurOnSubmit={false} 
                    />
                    <Input placeholder="Confirmação de Senha" 
                    placeholderColor="#c4c3cb" 
                    style={styles.NameInput}
                    value={this.state.senhaTemp}
                    onChangeText={this.handlesenhaTempChange}
                    autoCapitalize="none"
                    autoCorrect={false} 
                    secureTextEntry={true}
                    returnKeyType={"next"}
                    ref={(input) => { this.input_4 = input; }}
                    blurOnSubmit={false} 
                    />
                    <Picker
                      selectedValue={this.state.user_type}
                      style={{height: 50, width: 325, marginLeft:10}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({user_type: itemValue})
                      }>
                      <Picker.Item label="Usuário" value="1" />
                      <Picker.Item label="Moderador" value="2" />
                      <Picker.Item label="Administrador" value="3" />
                    </Picker>
                    <Button
                      buttonStyle={styles.CadButton}
                      containerStyle={styles.containerButton}
                      onPress={this.handleCadastrarPress}
                      title="Cadastrar"
                    />
                  </ScrollView>
                </KeyboardAvoidingView>
              </View>
        </SafeAreaView> 
      );
    }
  }
  