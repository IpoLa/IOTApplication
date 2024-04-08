import React, { Component, useState, useEffect, useRef } from 'react'
import { ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart, Path } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import * as theme from '../theme';
import { Block, Text } from '../components';
import mocks from '../settings';
import { getTemperature, getLamp } from '../config/actions';
import store from '../store'



function Dashboard(mocks) {
    // const temperature = temperature;
    const { navigation, settings } = mocks;
    const LightIcon = settings['light'].icon;
    const ACIcon = settings['ac'].icon;
    const TempIcon = settings['temperature'].icon;
    const DoorIcon = settings['door'].icon;
    const VoiceIcon = settings['voice'].icon;
    const ProfileIcon = settings['profile'].icon;

    const [temperature, setTemperature] = useState(0);
    const isFirstRender = useRef(true);
    const [chart, setChart] = useState([]);
    useEffect(() => { 
    //   // if (isFirstRender.current) {
      // store.dispatch(getLamp());
    //   const interval = setInterval(() => {
    //     console.log('This will run every second!');
        // store.dispatch(getTemperature());
        setTemperature(store.getState().tempSensor.data);
        setChart([...chart, temperature]);
      }, []);

const [refreshing, setRefreshing] = React.useState(false);
      const onRefresh = React.useCallback(async () => { await
        setRefreshing(true);
        store.dispatch(getTemperature());
        setTemperature(store.getState().tempSensor.data);
        setChart([...chart, store.getState().tempSensor.data]);
        console.log("chart after refreshing : ", chart);
        setRefreshing(false);
      }, [refreshing]);
      console.log("chart after refreshing : ", chart);
    return (
      <Block style={styles.dashboard} >
        <Block column style={{ marginVertical: theme.sizes.base * 1, }}>
          <Text welcome>Hello</Text>
          <Text name>Mezaache Akram</Text>
        </Block>
        
        <Block row style={{ paddingVertical: 0 }}>
          <Block flex={3} row style={{ alignItems: 'flex-end', }}>
            <Text style={{fontSize:80}}>
              {temperature}
            </Text>
            <Text size={38} height={80} weight='600' spacing={0.1}>°C</Text>
          </Block>
          <Block flex={1} column>
            <Text caption>Humidity</Text>
            <LineChart
              yMax={60}
              yMin={0}
              // data={[0, 20, 25, 15, 20, 55, 60]}
              data={chart}
              style={{ flex: 0.8 }}
              curve={shape.curveNatural}
              svg={{ stroke: theme.colors.accent, strokeWidth: 3 }}
            />
          </Block>
        </Block>

        <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <Block column space="between">
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Light')}
              >
                <Block center middle style={styles.button}>
                  <LightIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['light'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Ac', { name: 'ac' })}
              >
                <Block center middle style={styles.button}>
                  <ACIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['ac'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
            
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'temperature' })}
              >
                <Block center middle style={styles.button}>
                  <TempIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['temperature'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Door', { name: 'door' })}
              >
                <Block center middle style={styles.button}>
                  <DoorIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['door'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>

            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Voice', { name: 'voice' })}
              >
                <Block center middle style={styles.button}>
                  <VoiceIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['voice'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Dashboard')}
              >
                <Block center middle style={styles.button}>
                  <ProfileIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['profile'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
  }

Dashboard.defaultProps = {
  settings: mocks,
}

export default Dashboard;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 2,
    marginBottom: -theme.sizes.base * 6,
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: 151,
    height: 151,
    borderRadius: 151 / 2,
  }
})