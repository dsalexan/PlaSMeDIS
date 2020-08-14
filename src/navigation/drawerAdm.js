import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Cadastro from '../pages/cadastro';
import Tab from './tabTop';

const DrawerAdm = createDrawerNavigator({
  Home: Tab,
  One: Cadastro,

});

export default DrawerAdm;