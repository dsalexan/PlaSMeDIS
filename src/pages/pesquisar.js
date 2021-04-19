import React, {Component, useState, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import {
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';

// import Icon from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';
import api from '../services/api';

import PostFull from './postFull';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import {get} from 'lodash';
import qs from 'query-string';
import {randomRGBA} from '../lib/css';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  content: {
    // marginTop: 85,
    //marginBottom: 10
  },
  box: {
    width: width,
    height: 180,
    left: 0,
    marginTop: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },

  boxNomeCateg: {
    width: width,
    height: 35,
    backgroundColor: '#fafafa',
    elevation: 1,
  },

  nomeCateg: {
    color: '#31788A',
    textAlign: 'center',
    fontSize: 18,
  },
  iconComment: {
    top: 40,
    left: 300,
  },
  titulo: {
    //width: 300,
    //height: 29,
    left: 12,
    marginRight: 10,
    top: 20,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    //lineHeight: 28,
    /* identical to box height */
    letterSpacing: -0.333333,

    color: '#09576E',
  },
  tempo: {
    position: 'absolute',
    width: 67,
    height: 13,
    left: 58,
    top: 30,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: -0.333333,

    color: '#179AAB',
  },
  foto: {
    elevation: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10,
  },
  identificador: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  message: {
    left: 30,
    bottom: 25,
    fontSize: 18,
    color: '#31788A',
  },
  texto: {
    position: 'absolute',
    width: 80,
    height: 90,
    left: 57,
    //top: 10,
    top: 20,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: -0.333333,

    color: '#179AAB',
  },
});

class Postagem extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      isVisible: false,
      refreshing: false, // user list loading
      isRefreshing: false, //for pull to refresh
      posts: [], //user list
      error: '',
      count: '',
      id: '',
    };
  }

  componentDidMount = () => {
    this.getPostagem();
  };

  getColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255,
    )},${Math.floor(Math.random() * 255)},0.5)`;
  };

  getPostagem = async () => {
    await api.get('postagens').then((res) => {
      res.data.post.forEach((info, index) => {
        const nome = info.criador.split(' ');
        res.data.post[index].criador =
          `${nome[0]} ` + `${nome[1] ? nome[1].charAt(0) : ''}`;
      });

      const posts = res.data.post.reverse();
      this.setState({posts: posts, cont: res.data.count, id: res.data.id});
    });
  };
  onRefresh = async () => {
    this.setState({
      isRefreshing: true,
      refreshing: true,
    });
    await api.get('postagens').then((res) => {
      res.data.post.forEach((info, index) => {
        const nome = info.criador.split(' ');
        res.data.post[index].criador =
          `${nome[0]} ` + `${nome[1] ? nome[1].charAt(0) : ''}`;
      });

      const posts = res.data.post.reverse();
      this.setState({posts: posts, cont: res.data.count, id: res.data.id});
    });

    this.setState({
      isRefreshing: false,
      refreshing: false,
    });
  };
  render() {
    return (
      <View style={styles.content}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState({isVisible: false});
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
            }}>
            <Icon
              name="x"
              size={45}
              color="#31788A"
              style={styles.icon}
              light
            />
          </TouchableOpacity>
          <PostFull />
        </Modal>
        <FlatList
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          extraData={this.extraData}
          data={this.state.posts}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PostFull', {
                  titulo: item.titulo,
                  texto: item.texto,
                  selo: item.selo,
                  idPostagem: item.id,
                })
              }>
              <View style={styles.box}>
                <View
                  style={{
                    ...styles.foto,
                    ...{backgroundColor: this.getColor()},
                  }}>
                  <Text style={styles.identificador}>
                    {item.criador[0].toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.texto}>{item.criador}</Text>
                {/*<Text  style={styles.tempo}>30 min.</Text>*/}
                <View>
                  <Text style={styles.titulo}>{item.titulo}</Text>
                </View>
                {/*<TouchableOpacity style={styles.iconComment}>
                  <Icon name="message-circle" size={25} color="#31788A" />
                  <Text style={styles.message}>0</Text>
                </TouchableOpacity>*/}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const Pesquisar = ({...props} = {}) => {
  const [allCategorias, setAllCategorias] = useState([]);
  const [allBairros, setAllBairros] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [bairros, setBairros] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [refreshFlag, refresh] = useReducer((state) => state++, 0);
  const [postagens, setPostagens] = useState([]);

  // carregar a lista de bairros da api
  useEffect(() => {
    let isSubscribed = true;
    const source = axios.CancelToken.source();

    api
      .get('/bairros', {cancelToken: source.token})
      .then(({data}) => {
        if (!isSubscribed) {
          return;
        }

        console.log('Fetch bairros', data);
        setAllBairros(get(data, 'Bairros', []));
      })
      .catch((error) => {
        if (!isSubscribed) {
          return;
        }

        if (!api.isCancel(error)) {
          console.error(
            'Não foi possível recuperar a lista de bairros.',
            error,
          );
        }
      });

    return () => {
      isSubscribed = false;
      source.cancel();
    };
  }, []);

  // carregar a lista de categorias da api
  useEffect(() => {
    let isSubscribed = true;
    const source = axios.CancelToken.source();

    api
      .get('/categorias', {cancelToken: source.token})
      .then(({data}) => {
        if (!isSubscribed) {
          return;
        }

        console.log('Fetch categorias', data);
        setAllCategorias(get(data, 'Categorias', []));
      })
      .catch((error) => {
        if (!isSubscribed) {
          return;
        }

        if (!api.isCancel(error)) {
          console.error(
            'Não foi possível recuperar a lista de categorias.',
            error,
          );
        }
      });

    return () => {
      isSubscribed = false;
      source.cancel();
    };
  }, []);

  // retornar postagens com base nos critérios de pesquisa
  useEffect(() => {
    let isSubscribed = true;
    const source = axios.CancelToken.source();
    setRefreshing(true);

    const query = {};
    if (bairros.length) {
      query.bairro = bairros.join(',');
    }
    if (categorias.length) {
      query.categoria = categorias.join(',');
    }

    api
      .get('/postagens?' + qs.stringify(query), {cancelToken: source.token})
      .then(({data}) => {
        if (!isSubscribed) {
          return;
        }

        const postagens = get(data, 'post', []);
        setPostagens(postagens.reverse());
        setRefreshing(false);
      })
      .catch((error) => {
        if (!isSubscribed) {
          return;
        }

        if (!api.isCancel(error)) {
          console.error('Não foi possível completar a pesquisa.', error);
        }
      });

    return () => {
      isSubscribed = false;
      source.cancel();
      setRefreshing(false);
    };
  }, [bairros, categorias, refreshFlag]);

  console.log('POSTAGENS', postagens);
  return (
    <View style={styles.content}>
      <View style={styles.boxNomeCateg}>
        <Text style={styles.nomeCateg}>Pesquisar</Text>
      </View>
      <SectionedMultiSelect
        IconRenderer={Icon}
        uniqueKey="id"
        displayKey="nome"
        selectText="Categorias"
        searchPlaceholderText="Pesquisar..."
        selectedText="selecionadas"
        confirmText="Confirmar"
        items={allCategorias}
        selectedItems={categorias}
        onSelectedItemsChange={(value) => setCategorias(value)}
      />
      <SectionedMultiSelect
        IconRenderer={Icon}
        uniqueKey="id"
        displayKey="nome"
        selectText="Bairros"
        searchPlaceholderText="Pesquisar..."
        selectedText="selecionados"
        confirmText="Confirmar"
        items={allBairros}
        selectedItems={bairros}
        onSelectedItemsChange={(value) => setBairros(value)}
      />
      <FlatList
        onRefresh={() => refresh()}
        refreshing={refreshing}
        // extraData={this.extraData}
        data={postagens}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PostFull', {
                titulo: item.titulo,
                texto: item.texto,
                selo: item.selo,
                idPostagem: item.id,
              })
            }>
            <View style={styles.box}>
              <View
                style={{
                  ...styles.foto,
                  backgroundColor: randomRGBA(),
                }}>
                <Text style={styles.identificador}>
                  {item.criador[0].toUpperCase()}
                </Text>
              </View>
              <Text style={styles.texto}>{item.criador}</Text>
              <View>
                <Text style={styles.titulo}>{item.titulo}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

Pesquisar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

export default withNavigation(Pesquisar);
