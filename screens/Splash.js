import React, {useRef, useEffect, useState} from 'react'
import { SafeAreaView, RefreshControl, View, Text, TouchableOpacity, Image, StyleSheet, Animated, Easing, TouchableHighlight, } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import UnivLogo from '../assets/Logo-ufas1.png';
import * as theme from '../theme';
import {Dimensions} from 'react-native';
import { getTemperature, getLamp, getDoor } from '../config/actions';
import store from '../store'
import { FlatList } from 'react-native-gesture-handler';

const SplashScreen = ({navigation}) => {
    
    const [temperature, setTemperature] = useState(0);
    const isFirstRender = useRef(true);
    const [chart, setChart] = useState([]);
    useEffect(() => { 
        // if (isFirstRender.current) {
        store.dispatch(getLamp());
        // const interval = setInterval(() => {
          console.log('This will run every second!');
          store.dispatch(getTemperature());
          setTemperature(store.getState().tempSensor.data);
          console.log("temperature = ", temperature);
          console.log("temp : ", temperature);
          setChart([...chart, temperature]);
          store.dispatch(getDoor());
        // }, 10000);
        
        console.log("char : ", chart);
        }, []);
    spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.timing(
        this.spinValue,
    {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true  // To make use of native driver for performance
    }
    ).start()

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
    })
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }).start();
      };

    fadeIn()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{flex: 1, }} >
            <Animated.Image
                style={
                    [{
                        transform: [{rotate: spin}, {rotateX: spin}], 
                        height: Dimensions.get('window').height / 3,
                        width: Dimensions.get('window').width - 30,
                        resizeMode: 'contain',
                    }]
                }
                source={require('../assets/Logo-ufas1.png')} 
            />
            <Text style={styles.text}>
                Smart home project {"\n"}
                Automatics Engineering Students {"\n"}
                Licence 3 {"\n"}
                By : 
            </Text>
        <Animated.View style={{
            transform: [{rotateY: spin}, {rotateX: spin}, {rotateZ: spin}],
            opacity: fadeAnim
        }}>
            
            <Text style={[styles.text, {fontSize: 25, color: '#AD40AF', textAlign: 'center',}]}>
                MEZAACHE Akram {"\n"}
                KECHAT Abdelhadi {"\n"}
                BONABE Amine
            </Text>
        </Animated.View>
      </View>

      <Animated.View style={{
            transform: [{rotateY: spin}],
            opacity: fadeAnim,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'center',
        }}>
            <TouchableOpacity
                style={{
                backgroundColor: '#AD40AF',
                padding: 20,
                width: '90%',
                borderRadius: 10,
                marginBottom: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                }}
                onPress={() => navigation.navigate('Dashboard', {temperature: temperature, chart: chart})}>
                    
                <Text
                    style={{
                        color: 'white',
                        fontSize: 18,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                    Let's Begin
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    </SafeAreaView>
  );
};

styles = StyleSheet.create ({
    text: {
        // height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width - 30,
        // marginLeft: 50,
        // marginRight: 50,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#20315f',
    },
})

export default SplashScreen;