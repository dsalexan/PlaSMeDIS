import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Tab from './tabTop';
import Update from '../pages/update';

const DrawerUsuario = createDrawerNavigator({
  Home: Tab,
  Atualizar: Update
});

export default DrawerUsuario;