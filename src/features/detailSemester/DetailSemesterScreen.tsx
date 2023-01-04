import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import Footer from '../../component/Footer/Footer';
import BackgroundTimer from 'react-native-background-timer';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Word, CauHoi} from '../../model/dbModel';

import {Colors, Images} from '../../conf';
import styles from './styles';
import {handleSoundClick} from '../../Utils/Sound';
import {getQuestions, updateQuestions, updateScore} from '../../www/connectDB';
import Page0 from '../../component/Page/Page0/Page0';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

export type IDetailSemesterScreenProps = {};

const DetailSemesterScreen: React.FC<IDetailSemesterScreenProps> = ({}) => {
  const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';
  const [reaLoadData, setReaLoadData] = useState<boolean>(false);
  const [secondLeft, setSecondLeft] = useState<number>(2400);
  const [isStart, setStart] = useState<boolean>(false);
  const [isPause, setPause] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [question, setQuestion] = useState<CauHoi[]>([]);
  // const [scoreTrue, setScoreTrue] = useState<number>(0);
  // const [dataQuestion, setDataQuestion] = useState<CauHoi[]>([]);
  // const [updateBooleanQuestions, setBooleanUpdateQuestions] =
  //   useState<number>(0);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {topicName, idTopic, Review} = route.params;
  const animation = useSharedValue<number>(1);
  const [result, setResult] = useState<string>('');
  const UpdateResults = (temp: string) => {
    setResult(temp);
  };
  // const [ReviewCurent, setReviewCurent] = useState<boolean>(false);

  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animation.value, {
        duration: 200,
      }),
    };
  });
  const ReloadData = () => {
    getQuestions((data: CauHoi[]) => {
      setQuestion(data);
    }, idTopic);
  };
  const getQuestion = () => {
    getQuestions((data: CauHoi[]) => {
      setQuestion(data);
    }, idTopic);
  };
  useEffect(() => {
    getQuestion();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      setQuestion([]);
    };
    // setSubmit(true)s;
    //
    // setSecondLeft(0);
    // };
  }, []);
  const processPage5 = (temp: string) => {
    let resultHere: string[] = temp.split(',');
    let results: string[] = [];
    resultHere.forEach(element => {
      results.push(element.slice(0, -1));
    });
    return results.join('/');
  };
  const testScoreCalculation = (dataQuestion: CauHoi[], idTopic: any) => {
    let score: number = 0;
    dataQuestion.forEach((dQ, index) => {
      if (dQ.chonDapAn == dQ.traLoi && dQ.chonDapAn != '' && dQ.type != 5) {
        score = score + 1;
      } else if (
        dQ.chonDapAn != '' &&
        dQ.type == 5 &&
        processPage5(dQ.chonDapAn || '') == dQ.traLoi
      ) {
        score = score + 1;
      }
    });
    return score;
  };
  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondLeft((preSec: number) => {
        if (preSec > 0) {
          return preSec - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  const setHeaderRight = () => {
    navigation.setOptions({
      headerRight: () =>
        Review ? null : page == 19 ? (
          <TouchableOpacity
            onPress={handelAlterResult}
            style={styles.btnFinish}>
            <Text style={styles.textFinish}>NỘP BÀI</Text>
          </TouchableOpacity>
        ) : isStart == true ? (
          <TouchableOpacity onPress={onClickPause}>
            <Image
              source={Images.btn_play}
              style={styles.imageHeaderPlayPause}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onClickPause}>
            <Image
              source={Images.btn_pause}
              style={styles.imageHeaderPlayPause}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
    });
  };

  const onClickPause = () => {
    // setHeaderRight()
    setPause(!isPause);
    handleSoundClick();
  };

  useEffect(() => {
    if (secondLeft == 0) {
      updateQuestions(page + 1 + (idTopic - 1) * 20, result);
      setLoading(true);
      setTimeout(() => {
        ReloadData();
      }, 200);
      setTimeout(() => {
        Alert.alert('Hết thời gian làm bài!');
        updateScore(idTopic, testScoreCalculation(question, idTopic) / 2 + '');
        handleChangeResults(testScoreCalculation(question, idTopic) / 2);
        setLoading(false);
      }, 500);
    }
  }, [secondLeft]);

  useEffect(() => {
    if (isPause) {
      setStart(true);
      BackgroundTimer.stopBackgroundTimer();
    } else {
      setStart(false);
      startTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [isPause]);

  useEffect(() => {
    if (isSubmit) {
      Alert.alert('Chúc mừng bạn hoàn thành sớm bài kiểm tra!');
      updateScore(idTopic, testScoreCalculation(question, idTopic) / 2 + '');
      handleChangeResults(testScoreCalculation(question, idTopic) / 2);
    }
    return () => BackgroundTimer.stopBackgroundTimer();
  }, [isSubmit]);

  const handelAlterResult = () => {
    handleSoundClick();
    if (question[page].chonDapAn != result && result != '') {
      updateQuestions(page + 1 + (idTopic - 1) * 20, result);
    }

    Alert.alert('Thông Báo', 'Bạn muốn nộp bài?', [
      {
        text: 'Trở lại',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => {
          setLoading(true);
          setTimeout(() => {
            ReloadData();
          }, 200);
          setTimeout(() => {
            setLoading(false);
            ReloadData();
            setSubmit(true);
          }, 500);
        },
      },
    ]);
  };
  const handleChangeResults = (scoreTrue: any) => {
    navigation.navigate('Result Screen', {
      topicName,
      secondLeft,
      idTopic,
      scoreTrue,
      question,
    });
    BackgroundTimer.stopBackgroundTimer();
  };
  const clockify = () => {
    let mins = Math.floor((secondLeft / 60) % 60);
    let secs = Math.floor(secondLeft % 60);
    let displayMinutes = mins < 10 ? `0${mins}` : mins;
    let displaySeconds = secs < 10 ? `0${secs}` : secs;
    return {
      displayMinutes,
      displaySeconds,
    };
  };
  const onClickNext = () => {
    setHeaderRight();
    if (reaLoadData) {
      ReloadData();
      setReaLoadData(false);
    }
    if (question[page] != undefined) {
      if (question[page].chonDapAn != result && result != '') {
        updateQuestions(page + 1 + (idTopic - 1) * 20, result);
        setReaLoadData(true);
      }
    }
    if (page == 20) {
      return;
    }
    animation.value = 0;
    setTimeout(() => {
      setPage(page + 1);
    }, 200);
    setTimeout(() => {
      animation.value = 1;
    }, 400);
    handleSoundClick();
  };
  const onCLickBack = () => {
    setHeaderRight();
    if (reaLoadData) {
      ReloadData();
      setReaLoadData(false);
    }
    if (question[page] != undefined) {
      if (question[page].chonDapAn != result && result != '') {
        updateQuestions(page + 1 + (idTopic - 1) * 20, result);
        setReaLoadData(true);
      }
    }
    if (page == 0) {
      return;
    }
    animation.value = 0;
    setTimeout(() => {
      setPage(page - 1);
    }, 200);
    setTimeout(() => {
      animation.value = 1;
    }, 400);
    handleSoundClick();
  };
  const backAction = () => {
    if (!Review) {
      Alert.alert('THÔNG BÁO', 'Nếu bạn thoát bài kiểm tra này sẽ bị huỷ bỏ?', [
        {
          text: 'Huỷ',
          style: 'cancel',
          onPress: () => {
            handleSoundClick();
          },
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            handleSoundClick();
            navigation.goBack();
          },
        },
      ]);
    } else {
      handleSoundClick();
      navigation.goBack();
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: !Review
        ? `${clockify().displayMinutes}:${clockify().displaySeconds}`
        : '',
      headerTitleAlign: 'center',
      headerShown: true,
      gestureEnabled: false,
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTitleStyle: {
        fontSize: 20,
        color: Colors.secondary,
      },
      headerLeft: () => (
        <View style={styles.viewHeader}>
          <TouchableOpacity
            onPress={() => {
              backAction();
            }}>
            <Image
              source={Images.btn_back}
              style={styles.imageHeader}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.herderTitle}>{topicName}</Text>
        </View>
      ),
      headerRight: () =>
        Review ? null : page == 19 ? (
          <TouchableOpacity
            onPress={handelAlterResult}
            style={styles.btnFinish}>
            <Text style={styles.textFinish}>NỘP BÀI</Text>
          </TouchableOpacity>
        ) : isStart == true ? (
          <TouchableOpacity onPress={onClickPause}>
            <Image
              source={Images.btn_play}
              style={styles.imageHeaderPlayPause}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onClickPause}>
            <Image
              source={Images.btn_pause}
              style={styles.imageHeaderPlayPause}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
    });
  }, [secondLeft, isStart]);
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar barStyle="dark-content" backgroundColor={Colors.secondary} /> */}
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.container}>
        {Review ? (
          <View
            style={{
              backgroundColor: Colors.card2,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Text
              style={{
                fontSize: sizeDevices == 'small' ? 15 : 25,
                color: '#1D8DF6',
                margin: 10,
                marginBottom: 0,
                marginRight: 0,
              }}>
              Đáp án:
            </Text>
            <Text
              style={{
                fontSize: sizeDevices == 'small' ? 17 : 25,
                color: '#1D8DF6',
                margin: 10,
                marginBottom: 0,
                fontWeight: 'bold',
              }}>
              {question[page] != undefined ? question[page].traLoi : ''}
            </Text>
          </View>
        ) : null}
        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size={'large'} color={'#3592e3'} />
          </View>
        ) : (
          <View
            style={{
              ...styles.container,
              backgroundColor: '#F5F5F5',
            }}>
            <View style={[{flex: 1}, animationStyle]}>
              {question[page] != undefined ? (
                <Page0
                  UpdateResultsDetail={UpdateResults}
                  Review={Review || isPause}
                  // updateBooleanQuestions={updateBooleanQuestions}
                  page={page}
                  data={question[page] || []}
                  idTopic={idTopic}
                />
              ) : null}
            </View>
            <View
              style={{
                height: 2,
                width: '100%',
                backgroundColor: Colors.thrid,
              }}
            />
            <Footer
              page={page}
              onClickBackFooter={isPause ? () => {} : onCLickBack}
              onClickNextFooter={isPause ? () => {} : onClickNext}
            />
          </View>
        )}
      </View>
      <SafeAreaView edges={['bottom']} style={{backgroundColor: '#ffffff'}} />
    </View>
  );
};

export default DetailSemesterScreen;
