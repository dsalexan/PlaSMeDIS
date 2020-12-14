import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Tab from './tabTop';
import Update from '../pages/update';
import Postagem from '../pages/homeCateg';
import Forms from '../pages/forms';
import api from '../services/api';


const DrawerUsuario = createDrawerNavigator({
  Início:{
    screen:Tab,
  },
  FormsUpdate:{
    screen: Update,
  },
  Formulario:{
    screen: Forms,
  },
  Saúde:{
    screen: Postagem,
    params:{
      idCateg:'1'
    }
  },
  Trocas:{
    screen: Postagem,
    params:{
      idCateg:'2'
    }
  },
  Cultura:{
    screen: Postagem,
    params:{
      idCateg:'3'
    },
    navigationOptions:{
      title: 'Cultura e Lazer'
    }
  }
});

export default DrawerUsuario;

