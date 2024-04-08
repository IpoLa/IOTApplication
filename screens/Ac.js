import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../theme';
import { Block, Text, PanSlider } from '../components';
import mocks from '../settings';
import { getTemperature } from '../config/actions';
import store from '../store'

function Ac(mocks) {
  
    const [direction, setDirection] = useState(25);
    const { navigation, settings } = mocks;
    const name = navigation.getParam('name');
    const Icon = settings[name].icon;
    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
      setTemperature(store.getState().tempSensor.data);
      store.dispatch(getTemperature());
    }, []);
    const URL = 'http://192.168.8.105:8000';
    const updateDirection = async (val) => {
      
        var request = JSON.stringify({
          "direction": val
        });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: request
        };
        try {
            await fetch(
                URL + "/update/sensor/2/", requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                          console.log("action data: ", data);
                          setDirection(val);
                        });
                })
        }
        catch (error) {
            console.error(error);
        };
    }

    return (
      

      <Block flex={1} style={styles.settings}>
        <Block flex={0.5} row>
          <Block column>
            <Icon size={theme.sizes.font * 4} color={theme.colors.gray2} />
            <Block flex={1.2} row style={{ alignItems: 'flex-end', }}>
              <Text h1>{temperature}</Text>
              <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>°C</Text>
            </Block>
            <Text caption>Temperature</Text>
          </Block>
          {/* <Block flex={1} center>
            <PanSlider />
          </Block> */}
        </Block>
        <Block flex={1} style={{ paddingTop: theme.sizes.base * 2 }}>
          <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
            <Block row space="between">
              <Text welcome color="black">Direction</Text>
              <Text welcome color="black">{direction}</Text>
            </Block>
            <Slider
              value={25}
              mininumValue={1}
              maximumValue={100}
              thumbTintColor={theme.colors.accent}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.gray2}
              onValueChange={value => [setDirection(parseInt(value, 10)), updateDirection(val=parseInt(value, 10))]}
            />
          </Block>
        </Block>
      </Block>
    );
  }
// }

Ac.defaultProps = {
  settings: mocks,
}

export default Ac;

const styles = StyleSheet.create({
  settings: {
    padding: theme.sizes.base * 2,
  },
  slider: {

  }
})