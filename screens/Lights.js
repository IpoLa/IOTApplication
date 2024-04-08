import React, { Component, useState, useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import * as theme from '../theme';
import { Block, Text } from '../components';
import mocks from '../settings';
import { getLamp, updateLamp } from '../config/actions';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import SwitchSelector from "react-native-switch-selector";

import store from '../store'


function Light(mocks) {
    const { navigation, settings } = mocks;

    const [data, setData] = useState([]);
    
    const isFirstRender = useRef(true);
    useEffect(() => {
      setData(store.getState().lamps);
      store.dispatch(getLamp());
    }, []);
    
    const lampAction = (id, action) => {
      store.dispatch(updateLamp({
        id:id,
        is_on:action,
      }))
    }

    console.log("odd  : ", 4%2);
    
    return (
      <Block style={styles.dashboard}>
        <Block column style={{ marginVertical: theme.sizes.base * 2, }}>
          <Text welcome>Hello</Text>
          <Text name>Mezaache Akram</Text>
        </Block>

        <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={true}>
        
          <Block row space="between">
          {data.map((lamp, index) => {
          return (
          
            <Block  key={index} space="around" style={{ marginVertical: theme.sizes.base }}>
                <Block center middle  style={styles.button}>
                  <SwitchSelector
                    initial={lamp.is_on ? 1 : 0}
                    onPress={value => {
                      lampAction(id=lamp.id, action=(value ? true : false))
                    }}
                    
                    textColor={theme.colors.accent} //'#7a44cf'
                    fontSize={17}
                    selectedColor={lamp ? theme.colors.white : theme.colors.accent}
                    buttonColor={theme.colors.accent}
                    borderColor={theme.colors.accent}
                    hasPadding
                    options={[
                      { 
                        label: "OFF", 
                        value: 0, 
                        disabled: lamp ? false : true
                      }, //images.feminino = require('./path_to/assets/img/feminino.png')
                      { 
                        label: "ON", 
                        value: 1, 
                        disabled: lamp ? true : false
                      } //images.masculino = require('./path_to/assets/img/masculino.png')
                    ]}
                    height={90}
                    width={160}
                    borderRadius={35}
                  />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {lamp.name}
                  </Text>
                </Block>
                
                
            </Block>
            )})}
          </Block>
        </ScrollView>
      </Block>
    )
}



Light.defaultProps = {
  settings: mocks,
}

export default Light;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base,
    marginBottom: -theme.sizes.base * 6,
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    // backgroundColor: theme.colors.button,
    width: 160,
    // height: 151,
    // borderRadius: 155 / 2,
  }
})