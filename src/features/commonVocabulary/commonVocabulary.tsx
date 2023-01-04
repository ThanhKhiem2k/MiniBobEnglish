import {
  Dimensions,
  Image,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCommonVocabulary} from '../../www/connectDB';
import {NDTuVung, TestTV} from '../../model/dbModel';
import {useNavigation, useRoute} from '@react-navigation/native';
import StudyItem from '../study/component/studyItem';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Colors, Images} from '../../conf';
import {handleSoundClick} from '../../Utils/Sound';
import {addBookmark, getTopicsND} from '../../www/connectDB';
import {SafeAreaView} from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import {ActivityIndicator} from 'react-native-paper';

const getSize = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};
const CommonVocabulary = () => {
  const route = useRoute<any>();
  const {index} = route.params;
  const [DataVocabulary, setDataVocabulary] = useState<NDTuVung[]>([]);
  const [dataTest, setDataTest] = useState<TestTV[]>([]);
  const [first, setFirst] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const navigation = useNavigation<any>();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [defaultLanguage, setDefaultLanguage] = useState<any>();

  const initTts = async () => {
    const voices = await Tts.voices();
    if (voices && voices.length > 0) {
      console.log('voices', voices);

      Tts.setDefaultLanguage('en-IE');
      const myInfo = voices.findIndex(voice => {
        return (
          (voice.name === 'Moira' && !voice.notInstalled) ||
          (voice.name === 'Yuna' && !voice.notInstalled) ||
          (voice.name === 'Samantha' && !voice.notInstalled) ||
          (voice.name === 'en-us-x-iob-local' && !voice.notInstalled) ||
          (voice.name === 'es-us-x-esc-local' && !voice.notInstalled) ||
          (voice.name === 'en-us-x-iob-network' && !voice.notInstalled)
        );
      });
      setDefaultLanguage(voices[myInfo]);
    }
  };

  useEffect(() => {
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
    setTimeout(() => {
      setLoading(false);
    }, 5000);
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

  const getCommonVoca = async () => {
    await getCommonVocabulary((result: NDTuVung[]) => {
      setDataVocabulary(result);
    }, index + 1);
  };
  const renderPagination = (index, total) => {
    return (
      <View style={styles.paginationStyle}>
        <View>
          <Text style={{color: '#215', fontSize: 25}}>
            <Text style={styles.paginationText}>{index + 1}</Text>/{total}
          </Text>
          <View style={{height: 2, backgroundColor: 'black'}} />
        </View>
      </View>
    );
  };
  const RandomArr = (min: number, max: number, r: number) => {
    let numbersResult: number[] = [];
    let n: number = 0;
    let p: boolean = false;
    for (let i = 0; i < r; i++) {
      do {
        n = Math.floor(Math.random() * (max - min + 1)) + min;
        p = numbersResult.includes(n);
        if (!p) {
          numbersResult.push(n);
        }
      } while (p);
    }
    return numbersResult;
  };
  const RandomNumber = (min: number, max: number, except: number[]) => {
    let numberResult: number = 0;
    let n: number = 0;
    let p: boolean = false;
    do {
      n = Math.floor(Math.random() * (max - min)) + min;
      if (!p && except[0] !== n && except[1] !== n) {
        numberResult = n;
      }
    } while (p);
    return numberResult;
  };
  const getShuffledArr = arr => {
    if (arr.length === 1) {
      return arr;
    }
    const Rand = Math.floor(Math.random() * arr.length);
    return [arr[Rand], ...getShuffledArr(arr.filter((_, i) => i != Rand))];
  };

  const getDataTest = () => {
    const x: number[][] = [];
    if (DataVocabulary.length > 20) {
      x.push(RandomArr(0, DataVocabulary.length - 1, 20));
      x.push(RandomArr(0, DataVocabulary.length - 1, 20));
      x.push(RandomArr(0, DataVocabulary.length - 1, 20));
    } else {
      x.push(RandomArr(0, DataVocabulary.length - 1, DataVocabulary.length));
      x.push(RandomArr(0, DataVocabulary.length - 1, DataVocabulary.length));
      x.push(RandomArr(0, DataVocabulary.length - 1, DataVocabulary.length));
    }
    return x;
  };
  const getDataTestScreen = () => {
    const result: TestTV[] = [];
    const x: number[][] = getDataTest();
    x[0].forEach((element, index) => {
      const itemTest: TestTV = {
        question: DataVocabulary[element].Nghia,
        correctAnswer: DataVocabulary[element].TuVung,
        arrAnswer:
          element == x[1][index] || x[1][index] == x[2][index]
            ? getShuffledArr([
                {label: DataVocabulary[element].TuVung},
                {
                  label:
                    DataVocabulary[
                      RandomNumber(0, DataVocabulary.length, [
                        element,
                        x[2][index],
                      ])
                    ].TuVung,
                },
                {label: DataVocabulary[x[2][index]].TuVung},
              ])
            : element == x[2][index]
            ? getShuffledArr([
                {label: DataVocabulary[element].TuVung},
                {
                  label: DataVocabulary[x[1][index]].TuVung,
                },
                {
                  label:
                    DataVocabulary[
                      RandomNumber(0, DataVocabulary.length, [
                        x[1][index],
                        x[2][index],
                      ])
                    ].TuVung,
                },
              ])
            : getShuffledArr([
                {label: DataVocabulary[element].TuVung},
                {label: DataVocabulary[x[1][index]].TuVung},
                {label: DataVocabulary[x[2][index]].TuVung},
              ]),
      };
      result.push(itemTest);
    });
    return result;
  };

  useEffect(() => {
    if (DataVocabulary.length !== 0) {
      setDataTest(getDataTestScreen());
    }
  }, [DataVocabulary, first]);
  useEffect(() => {
    getCommonVoca();
    return () => setDataVocabulary([]);
  }, []);

  const getSize = () => {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: Colors.primary,
            ...styles.shadow,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleSoundClick();
              navigation.navigate('BookMark');
            }}
            style={styles.headerRight}>
            <Image
              source={Images.btn_bookmark}
              style={{height: 50, width: 50}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 17,
                color: '#ffffff',
                marginHorizontal: 10,
                fontWeight: 'bold',
                margin: 5,
              }}>
              Ghi nhớ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TestScreen', {dataTest});
              setFirst(!first);
              handleSoundClick();
            }}
            style={styles.headerRight}>
            <Image
              source={Images.icon_test}
              style={{height: 50, width: 50}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 17,
                color: '#ffffff',
                marginHorizontal: 10,
                fontWeight: 'bold',
                margin: 5,
              }}>
              Kiểm tra
            </Text>
          </TouchableOpacity>
        </View>
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
          <SwiperFlatList
            onChangeIndex={({index}) => {
              setPageNumber(index);
            }}
            data={DataVocabulary}
            renderItem={({item}) => (
              <View
                key={item.id}
                style={{
                  height: getSize().height * 0.65,
                  width: getSize().width,
                  justifyContent: 'center',
                  ...styles.shadow,
                }}>
                <StudyItem
                  chuDeCT={'Phần ' + (index + 1)}
                  item={item}
                  defaultLanguageId={defaultLanguage?.id}
                />
              </View>
            )}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              addBookmark(DataVocabulary[pageNumber]);
              handleSoundClick();
            }}
            style={{width: 90}}>
            <Image
              source={Images.icon_add}
              style={{height: 50, width: 50, margin: 20, marginBottom: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {renderPagination(pageNumber, DataVocabulary.length)}
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={{flex: 0}} />
    </View>
  );
};

export default CommonVocabulary;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
  },
  paginationStyle: {
    // borderTopWidth: 1,
    height: getSize().height * 0.07,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,

    // backgroundColor: Colors.primary,
  },
  paginationText: {
    color: '#215',
    fontSize: 28,
  },
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
  headerRight: {
    margin: 10,
    height: getSize().height * 0.1,
    // backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
