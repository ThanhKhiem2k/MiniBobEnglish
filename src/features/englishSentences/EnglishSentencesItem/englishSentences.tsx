import {
  FlatList,
  Image,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {NDCauTAGT} from '../../../model/dbModel';
import {getEnglishSentences} from '../../../www/connectDB';
import {useRoute} from '@react-navigation/native';
import Tts from 'react-native-tts';
import {Colors, Images} from '../../../conf';
import {ActivityIndicator} from 'react-native-paper';

const EnglishSentences = () => {
  // const [StatusSpeech, setStatusSpeech] = useState<Boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(true);

  const route = useRoute<any>();
  const {item, indexNew} = route.params;
  const [DataVocabulary, setDataVocabulary] = useState<NDCauTAGT[]>([]);

  const [defaultLanguage, setDefaultLanguage] = useState<any>();

  const initTts = async () => {
    const voices = await Tts.voices();
    if (voices && voices.length > 0) {
      Tts.setDefaultLanguage('en-IE');
      const myInfo = voices.findIndex(voice => {
        return (
          voice.name === 'Samantha' ||
          voice.name === 'Moira' ||
          voice.name === 'Yuna' ||
          voice.name === 'en-us-x-iob-local' ||
          voice.name === 'es-us-x-esc-local' ||
          voice.name === 'en-us-x-iob-network'
        );
      });
      setDefaultLanguage(voices[myInfo]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    Tts.getInitStatus().then(
      () => {
        initTts();
      },
      err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
          Tts.requestInstallData();
        }
      },
    );
  }, []);

  useEffect(() => {
    const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
    if (defaultLanguage) {
      Tts.setDefaultLanguage(defaultLanguage.language);
      Tts.setDefaultVoice(defaultLanguage.id);
      setLoading(false);
    }
    ee.addListener('tts-start', () => {});
    ee.addListener('tts-finish', () => {});
    ee.addListener('tts-cancel', () => {});
  }, [defaultLanguage]);

  const getESentences = async () => {
    await getEnglishSentences(
      (result: NDCauTAGT[]) => {
        setDataVocabulary(result);
      },
      item,
      indexNew,
    );
  };
  const ComponentItemFlatList = ({
    item,
    index,
  }: {
    item: NDCauTAGT;
    index: number;
  }) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: '#eef3fc',
            margin: 10,
            borderRadius: 10,
            ...styles.shadow,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginEnd: 20}}
            onPress={() => {
              Tts.stop();
              Tts.speak(item.TuVung!, {
                iosVoiceId: defaultLanguage?.id,
                androidParams: {
                  KEY_PARAM_PAN: -1,
                  KEY_PARAM_VOLUME: 0.8,
                  KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
                rate: 0.5,
              });
            }}>
            <Text style={{fontSize: 20, margin: 10, color: '#215'}}>
              {item.TuVung}
            </Text>
            <Image
              source={Images.icon_sound}
              resizeMode="contain"
              style={{height: 20, width: 20, tintColor: '#2ba4e2'}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, margin: 10, color: '#215'}}>
            {item.Nghia}
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    getESentences();
    return () => setDataVocabulary([]);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator
            animating={isLoading}
            size={'large'}
            color={'#00e3feff'}
          />
        </View>
      ) : (
        <FlatList data={DataVocabulary} renderItem={ComponentItemFlatList} />
      )}
    </View>
  );
};

export default EnglishSentences;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 8,
  },
});
