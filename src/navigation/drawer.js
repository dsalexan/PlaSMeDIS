import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Cadastro from '../pages/cadastro';
import Tab from './tabTop';
import Update from '../pages/update';

const Drawer = createDrawerNavigator({
  Home: Tab,
  One: {
    screen: Cadastro,
    navigationOptions: 
    {
        headerStyle: 
        {
          elevation: 2, // remove shadow on Android
        }
    }
  },
  Two: Update
});

export default Drawer;