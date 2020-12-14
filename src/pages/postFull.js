import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation}  from 'react-navigation';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    content1:{
      marginTop: 15,
      marginLeft: 5,
      textAlign: 'left' ,
      fontFamily: 'Roboto',
      fontSize: 27,
      color: '#09576E'

    },
    content:{
        marginLeft: 15,
        marginTop: 14,
      
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        textAlign: 'left',
        fontWeight: 'normal',
        fontSize: 20,
        letterSpacing: -0.333333,

        color: '#0A0A0A',
    },
    verificado:{
        //marginTop: 20,
    }
});

 class PostFull extends Component {
    
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = {
    title: 'Pergunta',
    }
    constructor(props){
        super(props);
        this.state = {verificado: false};
        this.verificando = this.verificando.bind(this)
      }
      state = {privilegio:'', users:[], selo: '', idPostagem: ''}

      componentDidMount =()=>{
        this.getPrev();
    };
      getPrev = async()=>{
        try{
          const id = await AsyncStorage.getItem('id');
          
          await api.get("users/"+id).then( res => {
            this.setState({  users: res.data.user});
          });

          this.setState({privilegio : this.state.users.privilegio});
          console.log(this.state.privilegio);

          this.setState({selo:  this.props.navigation.getParam('selo')})

          console.log(this.state.selo)
        
        } catch(error) {
          console.log('error')
       }
      };

      alerta= async()=>{
        Alert.alert('Atenção', 'Tornar a pergunta verificada?', [
            { text: "Não", onPress: () => this.verificando() },
            { text: "Sim", onPress: () => this.verificandoSim() }
            ],
            { cancelable: true });
      }
      verificandoSim = async()=>{

        this.setState({idPostagem:  this.props.navigation.getParam('idPostagem')});

        await api.put("selo/"+this.state.idPostagem, {
          selo: true
        })
      }
      verificando = async()=>{
        await api.put("selo/"+this.state.idPostagem, {
          selo: false
        })
      }
    render () {
      var titulo;
      if(this.state.privilegio == 3 ){
        titulo = <Text style={styles.content1}> { this.props.navigation.getParam('titulo')} {this.state.selo
          ? <Icon style={styles.verificado} name="verified" size={25} color="#31788A" />
          : <Icon style={styles.verificado} name="verified" size={25} color="rgba(52, 52, 52, 0)" />
      }
      </Text>
      }
      else{
        titulo = <TouchableOpacity onPress={() => this.alerta()}><Text style={styles.content1}> { this.props.navigation.getParam('titulo')} {this.state.selo
          ? <Icon style={styles.verificado} name="verified" size={25} color="#31788A" />
          : <Icon style={styles.verificado} name="verified" size={25} color="#31788A65" />
      }
      </Text></TouchableOpacity>
      }
      return (
      <View>
          <View style={styles.content1}>
            {titulo}
          </View>
          <Text style={styles.content}>
            {(this.props.navigation.getParam('texto'))}
          </Text>
      </View>
      );
    }
  }
  export default withNavigation(PostFull);