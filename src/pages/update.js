import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, Alert, KeyboardAvoidingView,SafeAreaView, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

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
        width: 320,
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
    state = { real_name: '', email: '', password: '', passwordTemp: '',  message: '', user_type: '1'};

    handlenameChange = (real_name) => {
      this.setState({ real_name });
    };

    handleemailChange = (email) => {
    this.setState({ email });
    };

    handlepasswordChange = (password) => {
      this.setState({ password });
    };

    handlepasswordTempChange = (passwordTemp) => {
      this.setState({ passwordTemp });
    };

    handleCadastrarPress = async () => {
      const id = await AsyncStorage.getItem('id');
      if (this.state.password.length == 0 ||  this.state.passwordTemp.length == 0 ) {
        this.setState({ error: Alert.alert('Atenção','Preencha todos os campos para continuar.') }, () => false);
      }
      if(this.state.password != this.state.passwordTemp){
        this.setState({ error: Alert.alert('Atenção','Senhas não conferem!') }, () => false);
      }
       else {
        try {
          const response = await api.put('users/'+id, {
            real_name : this.state.real_name,
            password: this.state.password,
            email: this.state.email, 
        }).then(res=>{
            this.setState({message: res.data.message});
          });
          this.setState({real_name: '', email: '', password: '', passwordTemp: '',  message: ''})
          Alert.alert('Sucesso!', this.state.message);

        } catch (_err) {
          Alert.alert('Atenção', this.state.message);
        }
      }
    };
  
    render() {
      return (
         <SafeAreaView style={styles.Container}> 
            <Text style={styles.titulo}>Atualização de Dados</Text>
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
                    <Input placeholder="Nova Senha" 
                    placeholderColor="#c4c3cb" 
                    style={styles.NameInput}
                    value={this.state.password}
                    onChangeText={this.handlepasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={"next"} 
                    onSubmitEditing={() => this.input_4.focus()}
                    ref={(input) => { this.input_3 = input; }}
                    blurOnSubmit={false} 
                    />
                    <Input placeholder="Confirmação de Nova Senha" 
                    placeholderColor="#c4c3cb" 
                    style={styles.NameInput}
                    value={this.state.passwordTemp}
                    onChangeText={this.handlepasswordTempChange}
                    autoCapitalize="none"
                    autoCorrect={false} 
                    secureTextEntry={true}
                    returnKeyType={"next"}
                    ref={(input) => { this.input_4 = input; }}
                    blurOnSubmit={false} 
                    />
                    <Button
                      buttonStyle={styles.CadButton}
                      containerStyle={styles.containerButton}
                      onPress={this.handleCadastrarPress}
                      title="Atualizar"
                    />
                  </ScrollView>
                </KeyboardAvoidingView>
          </View>
        </SafeAreaView> 
      );
    }
  }
  