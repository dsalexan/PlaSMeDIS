import React, { Component } from "react";

import {Text, View, StatusBar, StyleSheet, TouchableOpacity, AsyncStorage, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/Feather';
import api from '../services/api';

const styles = StyleSheet.create({
    content:{
       marginTop: 85,
       //marginBottom: 10
      }, 
  box:{
    width: 414,
    height: 169,
    left: 0,
    marginTop: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  iconComment:{
    top:80,
    left:300
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
    letterSpacing: -0.333333,

    color: '#09576E',

  },
  tempo:{
    position: 'absolute',
    width: 67,
    height: 13,
    left: 55,
    top: 30,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
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
  message:{
    left:30,
    bottom: 25,
    fontSize: 18,
    color: "#31788A",
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
    letterSpacing: -0.333333,
    
    color: '#179AAB',
  },
});

export default class Postagem extends Component {

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
          refreshing: false, // user list loading
          isRefreshing: false, //for pull to refresh
          posts: [], //user list
          error: '',
          count:'',
        }
      }
    
    componentDidMount =()=>{
        this.getPostagem();
    };
    getPostagem = async()=>{
        await api.get("postagens").then( res => {
          this.setState({  posts: res.data.post, cont: res.data.count});
          const posts = this.state.posts.reverse();
            this.setState({  posts: posts});
        });
        console.log(this.state.posts);
    };
    onRefresh = async () => {
        this.setState({
          isRefreshing: true,
          refreshing: true
        });
        await api.get("postagens").then( res => {
            this.setState({  posts: res.data.post, cont: res.data.count});
            const posts = this.state.posts.reverse();
            this.setState({  posts: posts});
          });
        this.setState({
          isRefreshing: false,
          refreshing: false
        });
       
      };
    render() {
      return (
      <View style={styles.content}>
        <FlatList
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
              extraData={this.extraData}
              data={this.state.posts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.box}>
                  <View
                    style={styles.foto}>
                  </View>
                  <Text  style={styles.texto}>{item.criador}</Text>
                  <Text  style={styles.tempo}>30 min.</Text>
                <View>
                <Text style={styles.titulo}>{item.titulo}</Text>
              </View>
              <TouchableOpacity style={styles.iconComment}>
                <Icon name="message-circle" size={25} color="#31788A" />
                <Text style={styles.message}>0</Text>
              </TouchableOpacity>
              </View>
            )}
          />
      </View>
      );
    }
  }
  