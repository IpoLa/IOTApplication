import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
import Light from "../screens/Lights";
import SplashScreen from "../screens/Splash";
import Door from "../screens/Door";
import Ac from "../screens/Ac";
import Voice from "../screens/Voice";

export default createStackNavigator(
  {
    SplashScreen : {
      screen : SplashScreen, 
      navigationOptions: { 
        headerShown: true,
        title: 'Welcome',
        headerTitleStyle: {fontWeight: 'bold', fontSize: 25, color: '#20315f'}
      }
    },
    Dashboard,
    Settings,
    Light,
    Door,
    Voice,
    Ac,
  },
  {
    initialRouteName: "SplashScreen",
    // initialRouteName: "Voice",
  },
  {
    header: null
   }
);