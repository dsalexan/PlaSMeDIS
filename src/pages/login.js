import React, { Component } from "react";

import {Keyboard, Text, View, TextInput, StyleSheet, Alert, StatusBar, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../services/api';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: -30
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontFamily: 'Roboto',
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
    color: '#31788A'
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  
  },
  loginButton: {
    backgroundColor: '#31788A',
    borderRadius: 5,
    width: 330,
    marginTop: 10,
    marginLeft:15,
    padding: 10
  },
  loginforget: {
    marginLeft:190,
    marginTop: 10,
    width:170,
    backgroundColor: 'transparent',
  },
  titleLoginForget:{
    color: '#31788A'
  }
})

export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
    };

  static propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

 state = { username: '', password: '', error: '' };

 handleusernameChange = (username) => {
  this.setState({ username });
};

handlePasswordChange = (password) => {
 this.setState({ password });
};

 handleSignInPress = async () => {
  if (this.state.username.length === 0 || this.state.password.length === 0) {
    this.setState({ error: Alert.alert('Atenção','Preencha usuário e senha para continuar.') }, () => false);
  } else {
    try {
      const response = await api.post('login', {
        status: 10,
        payload:[{
          username: this.state.username
        },
        {
          password: this.state.password
        }]
      });
        
      //await AsyncStorage.setItem(' ', response.data.token);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'PlaSMeDIS' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (_err) {
      this.setState({ error: Alert.alert('Atenção','Houve um problema com o login, verifique suas credenciais!') });
    }
  }
};
  render() {
    return (
      <View style={styles.containerView}>
        <View style={styles.loginScreenContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#fafafa"/>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>PlaSMeDIS</Text>
            <TextInput placeholder="Username" 
            placeholderColor="#c4c3cb" 
            style={styles.loginFormTextInput}
            value={this.state.username}
            onChangeText={this.handleusernameChange}
            autoCapitalize="none"
            autoCorrect={false} 
            />
            <TextInput placeholder="Senha" 
            placeholderColor="#c4c3cb" 
            style={styles.loginFormTextInput} 
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry

            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={this.handleSignInPress}
              title="Entrar"
            />
            <Button
              buttonStyle={styles.loginforget}
              type="clear" title="Esqueceu a Senha?"
              titleStyle={styles.titleLoginForget}
              size={5}
            />
          </View>
        </View>
      </View>
    );
  }
}
