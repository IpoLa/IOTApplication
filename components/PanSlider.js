import React, { Component, useState, useEffect } from 'react'
import { StyleSheet, PanResponder, Dimensions } from 'react-native'

import * as theme from '../theme';
import Block from './Block';
import Text from './Text';
// import { Block, Text, PanSlider } from '../components';
import mocks from '../settings';
import { getBottle } from '../config/actions';
import store from '../store'

const { height } = Dimensions.get('window');
const CONTROLLER_HEIGHT = height * 0.25;

function PanSlider(mocks) {
  state = { 
  //   panValue: 0,
  //   rangeValue: 0,
    // percentage: 0,
  }


    useEffect(() => {
      store.dispatch(getBottle());
      {store.getState().bottleSensor.data ? setMinValue(store.getState().bottleSensor.data) : setMinValue(5)}
    }, []);
  const { navigation, settings } = mocks;
  const [panValue, setPanValue] = useState(0);
  const [rangeValue, setRangeValue] = useState(100);
  const [percentage, setPercentage] = useState(0);
  const [minValue, setMinValue] = useState(5);
  const [maxValue, setMaxValue] = useState(0);

console.log("na : ", minValue * 12);
    return (
      <Block right style={styles.controller}>
        <Block center style={styles.controllerValue}>
          <Text weight="600" color="black">
          </Text>
        </Block>
        <Block style={[styles.controllerOverlay, { height: (minValue * 27)}]} />
      </Block>
    )
  }
// }

PanSlider.defaultProps = {
  // minValue: 1,
  // maxValue: 100,
  settings: mocks,
}

export default PanSlider;

const styles = StyleSheet.create({
  controller: {
    width: 85,
    height: 200,
    borderRadius: 10,
    backgroundColor: theme.colors.accent,
    alignContent: 'center',
    overflow: 'hidden',
    transform: [{rotate: "180deg"}]
  },
  controllerValue: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  controllerOverlay: {
    width: 85,
    backgroundColor: theme.colors.gray2,
  }
})