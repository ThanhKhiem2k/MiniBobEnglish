import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NDTuVung, TestTV} from '../../model/dbModel';
import {addBookmark, getTopicsND} from '../../www/connectDB';
import StudyItem from './component/studyItem';
import {Colors, Images} from '../../conf';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {ActivityIndicator} from 'react-native-paper';
import {handleSoundClick} from '../../Utils/Sound';
import {SafeAreaView} from 'react-native-safe-area-context';
import Tts from 'react-native-tts';

interface Props {}
const getSize = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};

const StudyLayout: FC<Props> = ({}) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {itemCT} = route.params;
  const [DataTopics, setDataTopics] = useState<NDTuVung[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [dataTest, setDataTest] = useState<TestTV[]>([]);
  const [first, setFirst] = useState(true);

  const [defaultLanguage, setDefaultLanguage] = useState<any>();

  const initTts = async () => {
    const voices = await Tts.voices();
    if (voices && voices.length > 0) {
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

  const getDataTopicsND = async () => {
    await getTopicsND((result: NDTuVung[]) => {
      setDataTopics(result);
    }, itemCT.id);
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
    if (DataTopics.length > 20) {
      x.push(RandomArr(0, DataTopics.length - 1, 20));
      x.push(RandomArr(0, DataTopics.length - 1, 20));
      x.push(RandomArr(0, DataTopics.length - 1, 20));
    } else {
      x.push(RandomArr(0, DataTopics.length - 1, DataTopics.length));
      x.push(RandomArr(0, DataTopics.length - 1, DataTopics.length));
      x.push(RandomArr(0, DataTopics.length - 1, DataTopics.length));
    }
    return x;
  };
  const getDataTestScreen = () => {
    const result: TestTV[] = [];
    const x: number[][] = getDataTest();
    x[0].forEach((element, index) => {
      const itemTest: TestTV = {
        question: DataTopics[element].Nghia,
        correctAnswer: DataTopics[element].TuVung,
        arrAnswer:
          element == x[1][index] || x[1][index] == x[2][index]
            ? getShuffledArr([
                {label: DataTopics[element].TuVung},
                {
                  label:
                    DataTopics[
                      RandomNumber(0, DataTopics.length, [element, x[2][index]])
                    ].TuVung,
                },
                {label: DataTopics[x[2][index]].TuVung},
              ])
            : element == x[2][index]
            ? getShuffledArr([
                {label: DataTopics[element].TuVung},
                {
                  label: DataTopics[x[1][index]].TuVung,
                },
                {
                  label:
                    DataTopics[
                      RandomNumber(0, DataTopics.length, [
                        x[1][index],
                        x[2][index],
                      ])
                    ].TuVung,
                },
              ])
            : getShuffledArr([
                {label: DataTopics[element].TuVung},
                {label: DataTopics[x[1][index]].TuVung},
                {label: DataTopics[x[2][index]].TuVung},
              ]),
      };
      result.push(itemTest);
    });
    return result;
  };
  useEffect(() => {
    setFirst(false);
  }, [dataTest]);
  useEffect(() => {
    if (DataTopics.length !== 0) {
      setDataTest(getDataTestScreen());
    }
  }, [first, DataTopics]);

  useEffect(() => {
    getDataTopicsND();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
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
              navigation.navigate('BookMark');
              handleSoundClick();
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
              handleSoundClick();
              setFirst(!first);
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
            data={DataTopics}
            renderItem={({item, index}) => (
              <View
                key={index}
                style={{
                  height: getSize().height * 0.65,
                  width: getSize().width,
                  justifyContent: 'center',
                  ...styles.shadow,
                }}>
                <StudyItem
                  chuDeCT={'Chủ đề: ' + itemCT.Name}
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
              addBookmark(DataTopics[pageNumber]);
              handleSoundClick();
            }}
            style={{width: 90}}>
            <Image
              source={Images.icon_add}
              style={{height: 50, width: 50, margin: 20, marginBottom: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {renderPagination(pageNumber, DataTopics.length)}
        </View>
      </View>

      <SafeAreaView edges={['bottom']} style={{flex: 0}} />
    </View>
  );
};

export default StudyLayout;

const styles = StyleSheet.create({
  headerRight: {
    margin: 10,
    height: getSize().height * 0.1,
    // backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#ffffff',
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
});
