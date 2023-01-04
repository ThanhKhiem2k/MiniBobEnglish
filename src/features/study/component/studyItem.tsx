import {
  Image,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NDTuVung} from '../../../model/dbModel';
import Tts from 'react-native-tts';
import {Colors, Images} from '../../../conf';

type Props = {
  item: NDTuVung;
  chuDeCT: string;
  defaultLanguageId: string;
};

const studyItem = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 20,
        borderRadius: 40,
        backgroundColor: 'white',
        overflow: 'hidden',
        ...styles.shadow,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginEnd: 0,
          ...styles.shadow,
        }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
          }}>
          {props.chuDeCT}
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 7}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            Tts.stop();
            Tts.speak(props.item.TuVung!, {
              iosVoiceId: props.defaultLanguageId,
              androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 0.8,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
              },
              rate: 0.5,
            });
          }}>
          <Text style={{fontSize: 35, margin: 20, color: '#215'}}>
            {props.item.TuVung}
          </Text>
          <Image
            source={Images.icon_sound}
            resizeMode="contain"
            style={{height: 20, width: 20, tintColor: '#2ba4e2'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            margin: 20,
            color: '#215',
          }}>
          {props.item.PAVD}
        </Text>
        <Text style={{fontSize: 25, textAlign: 'center', color: '#215'}}>
          {props.item.Nghia}
        </Text>
      </View>
    </View>
  );
};

export default studyItem;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#003d87',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 8,
  },
});
