import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import * as theme from '../theme';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import * as Animatable from 'react-native-animatable';
import { getLamp, updateLamp } from '../config/actions';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store'


const VoiceInput = () => {

 
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [isRecording, setIsRecording] = useState(false);

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

    const speak = () => {
        const thingToSay = result;
        Speech.speak(thingToSay);
      };

    const lamp = () => {
        switch(result) {
            case "turn on lamp one":
                lampAction(
                    id=1, 
                    action=true
                );
            return "turn on lamp one";
            case "turn on lamp two":
                lampAction(
                    id=2, 
                    action=true
                );
            return "turn on lamp two";
            case "turn on lamp three":
                lampAction(
                    id=3, 
                    action=true
                );
            return "turn on lamp three";
            case "turn on lamp four":
                lampAction(
                    id=4, 
                    action=true
                );
            return "turn on lamp four";


            case "turn off lamp one":
                lampAction(
                    id=1, 
                    action=false
                );
            return "turn off lamp one";
            case "turn off lamp two":
                lampAction(
                    id=2, 
                    action=false
                );
            return "turn off lamp two";
            case "turn off lamp three":
                lampAction(
                    id=3, 
                    action=false
                );
            return "turn off lamp three";
            case "turn off lamp four":
                lampAction(
                    id=4, 
                    action=false
                );
            return "turn off lamp four";
        }
        return "done";
    }

    const updateResult = (results) => {
        setResult(results.value[0]);
        lamp();
        speak();
    }

    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechError = err => setError(err.error);
    Voice.onSpeechResults = result => updateResult(results=result);

    
    const startRecording = async () => {
        try {
            await Voice.start('en-US');
            // setIsRecording(true);
            // onSpeechStartHandler();
        } catch (err) {
            setError(err[0]);
            console.log(err);
        }
    };

    const stopRecording = async () => {
        try {
            // setIsRecording(false);
            await Voice.stop();
            // onSpeechEndHandler();
        } catch (err) {
            setError(err.error);
        }
    }

    return (
        <View style={{ alignItems:'center', margin: 20 }}>
            <Text style={{ fontSize: 20, color: theme.colors.accent, fontWeight: '500' }}>
                Voice Command
            </Text>

            <Text>{result}</Text>
            {/* <Text>{error}</Text> */}

            <Animatable.Text 
                style={{fontSize: 300, color: 'red'}}
                animation={ isRecording ? 'pulse' : '' }
                useNativeDriver
                iterationCount='infinite'
                >
                〇
            </Animatable.Text>
            <TouchableOpacity 
                onPress={isRecording ? stopRecording : startRecording}
            >
                <Text style={{ color: 'red', fontSize: 20 }}>
                    { isRecording ? 'Stop Recording' : 'Start Recording' }
                </Text>
                    
            </TouchableOpacity>
        </View>
    )
}

export default VoiceInput;