import {useNavigation, useRoute} from '@react-navigation/native';
import {handleSoundClick} from '../../Utils/Sound';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Images} from '../../conf';
import {
  getScoreRank,
  updateScoreRankRating,
  updateSelectedAnswer,
} from '../../www/connectDB';
import {styles} from './styles/ResultScreenStyles';
import {ScoreRank} from '../../model/dbModel';
interface ResultScreenProps {}
const ResultScreen: FC<ResultScreenProps> = ({}) => {
  const viewShotRef = useRef(null);
  const Review = true;
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {topicName, secondLeft, idTopic, scoreTrue, question} = route.params;
  const [Score, setScore] = useState<ScoreRank>({
    id: '',
    ratingPoints: '',
    perseverancePoint: '',
    idFirebaseUser: '',
  });
  const getScoreRankUser = () => {
    getScoreRank((data: ScoreRank) => {
      setScore(data);
    }, '0');
  };
  useEffect(() => {
    getScoreRankUser();
  }, []);
  useEffect(() => {
    if (Score.perseverancePoint != '') {
      updateScoreRankRating(
        parseInt(Score.perseverancePoint!) + scoreTrue * 30 + '',
      );
    }
  }, [Score]);
  const clockify = () => {
    let mins = Math.round(((2400 - secondLeft) / 60) % 60);
    let displayMinutes: number | string = 0;
    if (secondLeft > 60) {
      displayMinutes = mins < 10 ? `0${mins + 1}` : mins;
    }
    return {
      displayMinutes,
    };
  };

  const handleGoBack = () => {
    handleSoundClick();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'HomeApp',
        },
      ],
    });
  };

  const handleReset = () => {
    handleSoundClick();
    updateSelectedAnswer(idTopic || 0);
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'Result Screen',
          params: {topicName, idTopic, secondLeft, scoreTrue, question},
        },
        {
          name: 'DetailSemester',
          params: {topicName, idTopic, Review: false},
        },
      ],
    });
  };

  const handleReviewScreen = () => {
    handleSoundClick();
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'Result Screen',
          params: {topicName, idTopic, secondLeft, scoreTrue, question},
        },
        {
          name: 'DetailSemester',
          params: {topicName, idTopic, Review},
        },
      ],
    });
  };
  useEffect(() => {
    const backAction = () => {
      navigation.isFocused() ? handleGoBack() : navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    // <SafeAreaView ref={viewShotRef} style={{flex: 1, backgroundColor: Colors.card}}>
    <View ref={viewShotRef} style={styles.container}>
      {/* <StatusBar backgroundColor={Colors.primary} /> */}
      <View style={styles.cardWrapper}>
        <View style={styles.topicWrapper}>
          <Text style={styles.textTopic}>{topicName}</Text>
        </View>
        <View style={styles.bodyWrapper}>
          <View style={styles.sentenceWrapper}>
            <Text style={styles.textSentence}>{'20'}</Text>
            <Text style={styles.textSentence}>{'câu'}</Text>
          </View>
          <View style={styles.sentenceWrapper}>
            <Text style={styles.textSentence}>{'40'}</Text>
            <Text style={styles.textSentence}>{'phút'}</Text>
          </View>
          <View style={styles.sentenceWrapper}>
            <Text style={styles.textSentence}>{'10'}</Text>
            <Text style={styles.textSentence}>{'điểm'}</Text>
          </View>
        </View>
        <View style={styles.resultWrapper}>
          <View style={styles.scoreWrapper}>
            <Text style={styles.textScore}>{'Số điểm đạt được'}</Text>
            <Text style={styles.textScore}>{`${scoreTrue}/10`}</Text>
          </View>
          <View
            style={{
              ...styles.scoreWrapper,
              marginTop: 0,
            }}>
            <Text style={styles.textScore}>{'Thời gian làm bài'}</Text>
            <Text style={styles.textScore}>{`${
              clockify().displayMinutes
            }/40 phút`}</Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={handleReset} style={styles.buttonTryAgain}>
            <Text style={styles.textButtonTryAgain}>{'Làm lại'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReview}
            onPress={handleReviewScreen}>
            <Text
              style={{
                ...styles.textButtonTryAgain,
                color: Colors.textQuestion2,
              }}>
              {'Xem đáp án'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoBack} style={styles.buttonReview}>
            <Text
              style={{
                ...styles.textButtonTryAgain,
                color: Colors.textQuestion2,
              }}>
              {'Đóng'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
};
export default ResultScreen;
