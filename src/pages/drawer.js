import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Cadastro from './cadastro';
import Home from './home';

const Drawer = createDrawerNavigator({
  One: Home,
  Two: Cadastro
});

export default Drawer;