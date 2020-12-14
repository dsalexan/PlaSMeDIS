import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Cadastro from '../pages/cadastro';
import Tab from './tabTop';
import ConfigAdmin from '../pages/configAdmin';
import Categoria from  '../pages/filtro';
import api from '../services/api';
//import postFull from  '../pages/postFull'

const DrawerAdm = createDrawerNavigator({
   Inicio: {
      screen: Tab,
   },
   Cadastro,
   ConfigAdmin,

});

export default DrawerAdm;