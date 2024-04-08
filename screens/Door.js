import React, { Component, useState, useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import * as theme from '../theme';
import { Block, Text } from '../components';
import mocks from '../settings';
import { getDoor, updateDoor } from '../config/actions';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import SwitchSelector from "react-native-switch-selector";

import store from '../store'


function Door(mocks) {
    const { navigation, settings } = mocks;

    // const [data, setData] = useState(0);
    const [door, setDoor] = useState(0);
    const isFirstRender = useRef(true);
    useEffect(() => {
      store.dispatch(getDoor());
      setDoor(store.getState().door.is_on);
      store.dispatch(getDoor());
    }, []);
    
    const doorAction = (action) => {
      store.dispatch(updateDoor({
        is_on: action,
      }))
    }
    const URL = 'http://192.168.8.105:8000'
    const doorTry = async (val) => {
      var request = new FormData()
        request.append('is_on', val)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: request
        };
        try {
            await fetch(
                URL + "/update/motor/1/", requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                          store.dispatch(updateDoor({
                            is_on: door,
                          }))
                          console.log("action try: ", data);
                          console.log("action try s : ", door);
                          console.log("action try : ", door);
                        });
                })
        }
        catch (error) {
            console.error(error);
        };
    }

    console.log("door : ", door);
    
    return (
      <Block center middle style={styles.dashboard}>
          <Block center space="between">
            <Block space="around" style={{ marginVertical: theme.sizes.base, transform: [{rotate: '90deg'}] }}>
                <Block center middle  style={styles.button}>
                  <SwitchSelector
                    initial={door ? 1 : 0}
                    onPress={value => [setDoor(value), doorTry(val=value)]}
                    
                    textColor={theme.colors.accent} //'#7a44cf'
                    fontSize={17}
                    selectedColor={door==1 ? theme.colors.white : theme.colors.accent}
                    buttonColor={theme.colors.accent}
                    borderColor={theme.colors.accent}
                    hasPadding
                    options={[
                      { 
                        label: "ON", 
                        value: 1, 
                        disabled: door ? true : false,
                        // icons: require('../assets/splash.png')
                      }, //images.feminino = require('./path_to/assets/img/feminino.png')
                      { 
                        label: "OFF", 
                        value: 0, 
                        // disabled: door ? false : true
                      } //images.masculino = require('./path_to/assets/img/masculino.png')
                    ]}
                    height={200}
                    width={600}
                    borderRadius={35}
                  />
                </Block>
            </Block>
          </Block>
        {/* </ScrollView> */}
      </Block>
    )
}



Door.defaultProps = {
  settings: mocks,
}

export default Door;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base,
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    // backgroundColor: theme.colors.button,
    width: 600,
    // height: 151,
    // borderRadius: 155 / 2,
  }
})