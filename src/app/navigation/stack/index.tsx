import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SemesterScreen,
  DetailSemesterScreen,
  Guide_1,
  Guide_2,
  ResultScreen,
  HomeScreenApp,
  VocabularyTopics,
  StudyLayout,
  TopicCT,
  CommonVocabulary,
  CommonVocabularyGroup,
  BilingualNewspaper,
  EnglishSentences,
  EnglishSentencesGroup,
  TestScreen,
  BilingualGrammar,
  BilingualBook,
  WebGame,
  UserOption,
  BookMark,
} from '../../../features';
import {Colors, Images} from '../../../conf';
import {handleSoundClick} from '../../../Utils/Sound';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ScoreRank} from '../../../model/dbModel';
import {
  getScoreRank,
  updateScoreRankPerseverance,
  updateScoreRankRating,
} from '../../../www/connectDB';
import {ActivityIndicator} from 'react-native-paper';

export type IndexProps = {};
const Stack = createNativeStackNavigator();
// const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';

const MainStack: React.FC<IndexProps> = ({}) => {
  const navigation = useNavigation<any>();
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
    if (Score.perseverancePoint !== '') {
      updateScoreRankPerseverance(parseInt(Score.perseverancePoint!) + 1 + '');
      updateScoreRankRating(parseInt(Score.ratingPoints!) + 30 + '');
    }
  }, [Score]);
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar barStyle="dark-content" backgroundColor={Colors.secondary} /> */}
      {Score.perseverancePoint === '' ? (
        <ImageBackground
          source={Images.bg_app}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#dddddd',
          }}>
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={'#00e3feff'}
          />
        </ImageBackground>
      ) : (
        <Stack.Navigator
          initialRouteName={
            Score.perseverancePoint === '0' ? 'Guide_1' : 'HomeApp'
          }
          screenOptions={{
            headerShown: true,
            // animation: 'none',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
          }}>
          <Stack.Screen
            name="Guide_1"
            component={Guide_1}
            options={{
              headerShown: false,
              headerStyle: {
                // backgroundColor: Colors.primary,
              },
            }}
          />
          <Stack.Screen
            name="Guide_2"
            component={Guide_2}
            options={{
              headerShown: false,
              headerStyle: {
                // backgroundColor: Colors.primary,
              },
            }}
          />
          <Stack.Screen
            name="HomeApp"
            component={HomeScreenApp}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: Colors.primary,
              },
            }}
          />
          <Stack.Screen
            name="StudyLayout"
            component={StudyLayout}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Nội dung',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="BookMark"
            component={BookMark}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Ghi nhớ',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="TopicCT"
            component={TopicCT}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Chủ đề chi tiết',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="CommonVocabulary"
            component={CommonVocabulary}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Nội dung',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="CommonVocabularyGroup"
            component={CommonVocabularyGroup}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Tổng quát',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="UserOption"
            component={UserOption}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Hồ sơ',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="WebGame"
            component={WebGame}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Web Game',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="BilingualBook"
            component={BilingualBook}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Sách song ngữ',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="BilingualGrammar"
            component={BilingualGrammar}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Ngữ pháp tiếng Anh',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="BilingualNewspaper"
            component={BilingualNewspaper}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Báo song ngữ',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="EnglishSentences"
            component={EnglishSentences}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Nội dung',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="EnglishSentencesGroup"
            component={EnglishSentencesGroup}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Cấp độ',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="VocabularyTopics"
            component={VocabularyTopics}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Chủ đề tổng quát',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="Semester" component={SemesterScreen} />
          <Stack.Screen
            name="DetailSemester"
            component={DetailSemesterScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="Result Screen"
            component={ResultScreen}
            options={({route, navigation}) => ({
              headerShown: true,
              gestureEnabled: false,
              title: 'KẾT QUẢ',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              headerTitleStyle: {
                fontSize: 23,
                color: Colors.secondary,
              },
              headerLeft: () => <Text>{null}</Text>,
            })}
          />

          <Stack.Screen
            name="TestScreen"
            component={TestScreen}
            options={{
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.card,
              title: 'Kiểm tra',
              headerTitleStyle: {
                fontSize: 22,
                color: Colors.secondary,
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    handleSoundClick();
                    navigation.goBack();
                  }}>
                  <Image
                    source={Images.btn_back}
                    style={{
                      tintColor: Colors.secondary,
                      height: 25,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator>
      )}
      {/* </SafeAreaView> */}
      {/* <SafeAreaView
        edges={['bottom']}
        style={{flex: 0, backgroundColor: Colors.secondary}}
      /> */}
    </View>
  );
};

export default MainStack;
