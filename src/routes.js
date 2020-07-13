import React from "react"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import DrawerIcon from "./pages/header";

import Drawer from './navigation/drawer.js';
import Login from "./pages/login";

const Routes = createStackNavigator({
    PlaSMeDIS: {
        screen: Drawer,
        navigationOptions: {
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fafafa',
              elevation: 0, // remove shadow on Android
            },
            headerLeft: () => <DrawerIcon />,
            headerTintColor: '#31788A',
            headerTitleStyle: {
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 20,
              lineHeight: 21,
              letterSpacing: -0.333333    
            },
          },
      },
      Login: {
        screen:Login
    }
    },
    {
      initialRouteName: 'Login',
    }
  );

const RoutesCtn = createAppContainer(Routes);

export default RoutesCtn;