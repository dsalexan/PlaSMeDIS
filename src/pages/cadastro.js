import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

const styles = StyleSheet.create({
    Container:{
        flex: 1
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
    NameTextInput:{
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
        top: 60
    },
    CadButton: {
        backgroundColor: '#31788A',
        borderRadius: 5,
        width: 330,
        marginTop: 200,
        marginLeft:15,
        padding: 10,
      },
    Piker: {
        top: -180,
        left: 10
    }
});

export default class Cadastro extends Component {
    static navigationOptions = {
        title: 'Cadastro de Novos Usuários',
    }
    state = {
        language: 'Java',
      };
    render() {
      return (
         <View style={styles.Container}> 
            <StatusBar barStyle="light-content" backgroundColor="#0A566D"/>
            <Text style={styles.titulo}>Cadastro de Novos Usuários</Text>
            <View style={styles.loginFormView}>

            <TextInput placeholder="Nome Completo" 
            placeholderColor="#c4c3cb" 
            style={styles.NameTextInput}
            //value={this.state.username}
            //onChangeText={this.handleusernameChange}
            autoCapitalize="none"
            autoCorrect={false} 
            />
            <Button
              buttonStyle={styles.CadButton}
              //onPress={this.handleSignInPress}
              title="Cadastrar"
            />
          </View>
          <View style={styles.Piker}>
              <Text>Privilégio</Text>
                <Picker
                    selectedValue={this.state.language}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        </View> 
      );
    }
  }
  