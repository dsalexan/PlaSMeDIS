import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, Image,
  TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';

const styles = StyleSheet.create({

  box:{
    position: 'absolute',
    width: 414,
    height: 169,
    left: 0,
    top: 17,

    backgroundColor: '#FFFFFF',
    elevation: 1
  },
  box2:{
    position: 'absolute',
    width: 340,
    height: 96,
    left: 10,
    top: 200,

    backgroundColor: '#EFF0F8',
    elevation:2,
    borderRadius: 10
  },
  texto:{
    position: 'absolute',
    width: 80,
    height: 90,
    left: 57,
    top: 10,
    
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    letterSpacing: -0.333333,
    
    color: '#179AAB',
  },
  foto:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:50,
    marginTop: 10,
    marginLeft: 10,

  },
  tempo:{
    position: 'absolute',
    width: 67,
    height: 13,
    left: 44,
    top: 30,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: -0.333333,

    color: '#179AAB',

  },
  titulo:{
    position: 'absolute',
    width: 300,
    height: 29,
    left: 12,
    top: 20,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: 28,
    /* identical to box height */

    textAlign: 'center',
    letterSpacing: -0.333333,

    color: '#09576E',

  },
  iconComment:{
    top:80,
    left:300
  },
  message:{
    left:30,
    bottom: 25,
    fontSize: 18,
    color: "#31788A",
  }

});

export default class Home extends Component {
    static navigationOptions = {
        title: 'Início',
    }
    render() {
      return (
        <View> 
          <View style={styles.box}>
            <View
              style={styles.foto}>
            </View>
              <Text  style={styles.texto}>Fulano Silva</Text>
              <Text  style={styles.tempo}>30 min.</Text>
            <View>
              <Text style={styles.titulo}>Lorem ipsum dolor sit amet?</Text>
            </View>
              <TouchableOpacity style={styles.iconComment}>
                <Icon name="message-circle" size={25} color="#31788A" />
                <Text style={styles.message}>0</Text>
              </TouchableOpacity>
          </View>
          <Image  
                  source={{
                    uri: '../img/download.jpg',
                  }}/>
        </View> 
      );
    }
  }
  