import React from "react"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import DrawerIcon from "./pages/header";

//import Login from './pages/login';
import Drawer from './pages/drawer.js';
import Login from "./pages/login";

const Routes = createStackNavigator({
    PlaSMeDIS: {
        screen: Drawer,
        navigationOptions: {
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#31788A',
            },
            headerLeft: () => <DrawerIcon />,
            headerTintColor: '#fff',
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