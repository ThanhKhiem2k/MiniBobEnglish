import React, {useEffect, useState} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {FlatList} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors, Images} from '../../conf';
import {handleSoundClick} from '../../Utils/Sound';
interface Props {}
const TestScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  const [score, setScore] = useState(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkResult, setCheckResult] = useState<boolean[]>(
    Array.from({length: 20}, i => (i = false)),
  );
  const [showCheck, setShowCheck] = useState(false);
  const route = useRoute<any>();
  const {dataTest} = route.params;
  useEffect(() => {
    navigation.setOptions({
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
      headerRight: () => (
        <TouchableOpacity
          style={{
            height: 40,
            width: 90,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            ...styles.shadow,
          }}
          onPress={() => {
            handleSoundClick();
            setScore(checkResult.filter(value => value === true).length);
            setModalVisible(true);
          }}>
          <Text style={{fontSize: 20, color: '#215'}}>Nộp bài</Text>
        </TouchableOpacity>
      ),
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
    });
  }, []);
  const setArrTrue = (arr, int) => {
    let result = arr;
    result[int] = true;
    return result;
  };
  const setArrFalse = (arr, int) => {
    let result = arr;
    result[int] = false;
    return result;
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  // useEffect(() => {
  //   console.log('checkResult', checkResult);
  // }, [checkResult]);

  const ItemQuestion = ({item, index}: {item: any; index: number}) => {
    return (
      <>
        {showCheck ? (
          <View
            style={{
              height: 40,
              width: 40,
              position: 'absolute',
              zIndex: 3,
              alignSelf: 'flex-end',
            }}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={checkResult[index] ? Images.icon_true : Images.icon_false}
            />
          </View>
        ) : null}
        <View
          style={{
            margin: 10,
            borderRadius: 10,
            backgroundColor: '#d9e2e6',
            zIndex: 2,
          }}
          key={index}>
          <Text style={{fontSize: 25, margin: 10, color: '#223'}}>
            {item.question}
          </Text>
          <RadioButtonRN
            boxActiveBgColor={'white'}
            circleSize={15}
            style={{margin: 20, marginTop: -10}}
            boxStyle={{height: 50}}
            textStyle={{
              fontSize: 18,
              height: 30,
              textAlign: 'center',
              marginTop: 8,
            }}
            data={item.arrAnswer}
            selectedBtn={e => {
              if (e.label === item.correctAnswer) {
                setArrTrue(checkResult, index);
              } else if (e.label !== item.correctAnswer) {
                setArrFalse(checkResult, index);
              }
            }}
            duration={0}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: showCheck ? 10 : 0,
          }}
        />
        {index === 19 ? <View style={{height: 80}} /> : null}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: isLoading ? 1 : 0,
        }}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'#3592e3'} />
        ) : null}
      </View>
      <View style={{height: 40, justifyContent: 'center', margin: 5}}>
        <Text style={{fontSize: 18, color: '#000000'}}>Chọn đáp án đúng theo nghĩa:</Text>
      </View>
      <FlatList
        data={dataTest}
        renderItem={ItemQuestion}
        // style={{marginBottom: 100}}
      />
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              height: '40%',
              backgroundColor: '#ffffff',
              width: '80%',
              borderRadius: 20,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 25, fontWeight: '500', color: '#07215e'}}>
                  Kết quả kiểm tra
                </Text>
              </View>
              <View
                style={{
                  height: '70%',
                  justifyContent: 'space-evenly',
                  // backgroundColor: 'red',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '60%',
                    alignItems: 'center',
                    margin: 10,
                  }}>
                  <Text style={{fontSize: 20}}>Số đáp án đúng:</Text>
                  <Text style={{fontSize: 25}}>{score}/20</Text>
                </View>
                <View
                  style={{
                    width: '60%',
                    alignItems: 'center',
                    margin: 10,
                  }}>
                  <Text style={{fontSize: 20}}>Số điểm đạt được</Text>
                  <Text style={{fontSize: 25}}>{score * 20}</Text>
                </View>
                <View>
                  <Text style={{margin: 10, fontSize: 15}}>
                    Chú ý: Số điểm đạt được sẽ được cộng vào điểm xếp hạng
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 45,
                  width: 110,
                  backgroundColor: '#3423',
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.setOptions({
                    headerRight: () => null,
                  });
                  setShowCheck(true);
                  handleSoundClick();
                }}>
                <Text style={{fontSize: 20}}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
});
