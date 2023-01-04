import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../conf';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {getBookmark} from '../../www/connectDB';
import {NDTuVung} from '../../model/dbModel';
import Share from 'react-native-share';
import {handleSoundClick} from '../../Utils/Sound';

const getSize = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};

interface Guide_2_Props {}

const HomeScreenApp: React.FC<Guide_2_Props> = ({}) => {
  const navigation = useNavigation<any>();
  const [ScoreFb, setScoreFb] = useState<NDTuVung[]>([]);
  const isFocused = useIsFocused();

  const getBookmarkList = () => {
    getBookmark((data: NDTuVung[]) => {
      setScoreFb(data);
    });
  };

  useEffect(() => {
    // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
    getBookmarkList();
  }, [isFocused]);
  useEffect(() => {
    getBookmarkList();
  }, []);
  const ItemListHome = (
    func: Function,
    Title: String,
    Description: String,
    ImageMain: any,
  ) => {
    return (
      <View
        style={{
          height: getSize().height * 0.18,
          margin: 10,
          marginBottom: 0,
          borderRadius: 15,
          borderWidth: 5,
          borderColor: '#ffffff',
        }}>
        <TouchableOpacity
          onPress={() => {
            func();
            handleSoundClick();
          }}
          style={{
            borderRadius: 25,
            backgroundColor: '#ffffff',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: getSize().height * 0.12,
              width: getSize().height * 0.13,
              marginHorizontal: 10,
            }}>
            <Image
              source={ImageMain}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 1, marginEnd: 10}}>
            <Text
              style={{
                marginEnd: 10,
                marginTop: 5,
                fontWeight: 'bold',
                color: '#215',
              }}>
              {Title}
            </Text>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  marginEnd: 5,
                  color: '#444',
                  fontSize: 13,
                  textAlign: 'justify',
                }}>
                {Description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ImageBackground source={Images.bg_app} style={styles.container}>
      <SafeAreaView edges={['top']} style={{flex: 0}} />
      <View
        style={{
          height: getSize().height * 0.07,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserOption');
            handleSoundClick();
          }}
          style={{height: '100%', width: '20%', margin: 10}}>
          <Image
            source={Images.icon_option}
            style={{height: '100%', width: '100%', marginTop: 5}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
          }}>
          <Text style={{fontSize: 23, fontWeight: 'bold', color: '#215'}}>
            MiniBob English
          </Text>
        </View>
      </View>
      {ScoreFb?.length > 0 ? (
        <View
          style={{
            height: getSize().height * 0.1,
            marginTop: 15,
            width: '100%',
            justifyContent: 'center',
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              height: getSize().height * 0.1,
              borderTopRightRadius: 20,
            }}>
            <SwiperFlatList
              autoplay={true}
              autoplayLoop
              data={ScoreFb}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('BookMark');
                    handleSoundClick();
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: getSize().width * 0.5 - 20,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: '#7686',
                    marginHorizontal: 10,
                    borderRadius: 10,
                    borderWidth: 3,
                    borderColor: '#ffffff',
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#234',
                        fontWeight: '500',
                      }}>
                      {item.TuVung}
                    </Text>
                  </View>
                  <View style={{flex: 1.5, justifyContent: 'center'}}>
                    <Text style={{fontSize: 15, color: '#000000'}}>
                      ➭ {item.Nghia}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      ) : null}
      <ScrollView style={{marginVertical: 10}}>
        <View style={{height: 10, width: '100%'}} />
        <View style={{height: getSize().height * 0.2}}>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{borderRadius: 15, borderWidth: 5, borderColor: '#ffffff'}}
              onPress={() => {
                navigation.navigate('VocabularyTopics');
                handleSoundClick();
              }}>
              <View
                style={{
                  height: getSize().width * 0.4,
                  width: getSize().width * 0.4,
                  borderRadius: 25,
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.icon_gamew}
                  style={{
                    width: '40%',
                    height: '40%',
                    margin: 10,
                    overflow: 'hidden',
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 16,
                    margin: 5,
                    textAlign: 'center',
                    color: '#215',
                  }}>
                  60 Bộ từ vựng tiếng Anh theo chủ đề
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderRadius: 15, borderWidth: 5, borderColor: '#ffffff'}}
              onPress={() => {
                navigation.navigate('CommonVocabularyGroup');
                handleSoundClick();
              }}>
              <View
                style={{
                  height: getSize().width * 0.4,
                  width: getSize().width * 0.4,
                  borderRadius: 25,
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.icon_book}
                  style={{
                    width: '40%',
                    height: '40%',
                    margin: 10,
                    overflow: 'hidden',
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 16,
                    margin: 5,
                    textAlign: 'center',
                    color: '#215',
                  }}>
                  1000 Từ vựng tiếng anh thông dụng
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{}}>
          {/* <FlatList data={listItem} renderItem={ItemListHome}/> */}
          {ItemListHome(
            () => {
              navigation.navigate('EnglishSentencesGroup');
            },
            'Câu tiếng Anh giao tiếp',
            'Tập hợp 6000 câu giao tiếp được sử dụng nhiều nhất trong cuộc sống đời thường của người bản xứ.',
            Images.icon_text,
          )}
          {ItemListHome(
            () => {
              navigation.navigate('Semester', {
                idSemester: 1,
                nameSemester: 'Bài tập tổng hợp 1',
              });
            },
            'Bài tập tổng hợp 1',
            'Tham gia làm bài tập hỗn hợp, làm quen với tiếng Anh.',
            Images.icon_testtime,
          )}
          {ItemListHome(
            () => {
              navigation.navigate('Semester', {
                idSemester: 2,
                nameSemester: 'Bài tập tổng hợp 2',
              });
            },
            'Bài tập tổng hợp 2',
            'Tham gia làm bài tập hỗn hợp, làm quen với tiếng Anh.',
            Images.icon_testtime,
          )}

          <View
            style={{
              ...styles.shadow,
              height: 50,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderWidth: 3,
              borderColor: '#73ceffff',
              marginTop: 10,
              backgroundColor: '#245df3',
            }}>
            <Text
              style={{
                fontSize: 20,
                marginEnd: 20,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Web Link
            </Text>
          </View>
          {/* bilingualBook */}
          {ItemListHome(
            () => {
              navigation.navigate('BilingualNewspaper');
            },
            'Báo song ngữ',
            'Học tiếng anh qua việc đọc báo song ngữ giúp bạn biết cách sử dụng các cấu trúc, ngữ pháp hay từ vựng linh hoạt hơn.',
            Images.icon_news,
          )}
          {ItemListHome(
            () => {
              navigation.navigate('BilingualGrammar');
            },
            'Ngữ pháp tiếng Anh',
            'Ngữ pháp cơ bản của tiếng Anh, hỗ trợ tiếp cận dễ dàng với tiếng Anh hơn.',
            Images.icon_w,
          )}
          {ItemListHome(
            () => {
              navigation.navigate('BilingualBook');
            },
            'Sách song ngữ Anh - Việt',
            'Đọc sách song ngữ giúp tăng được vốn từ vựng, khả năng đọc hiểu mà còn có cách hành văn sắc sảo, tự nhiên như người bản xứ.',
            Images.icon_bookaa,
          )}
          {/* {ItemListHome(
            () => {
              navigation.navigate('WebGame');
            },
            'Game học Tiếng Anh',
            'Giải trí với game học tiếng Anh.',
            Images.icon_game,
          )} */}
          <TouchableOpacity
            onPress={() => {
              handleSoundClick();
              const url =
                'https://drive.google.com/drive/folders/1oBAB6O3tPMN0qbudJlImDmmE6nDYkJGj?usp=share_link';
              const title = 'MiniBob English';
              const message = 'Tham gia học cùng tôi nhé.';
              const options = {
                title,
                url,
                message,
              };
              //react-native-share
              Share.open(options)
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  err && console.log(err);
                });
            }}
            style={{
              height: 70,
              width: '100%',
              backgroundColor: '#ffffff',
              marginVertical: 20,
              borderWidth: 2,
              borderColor: '#676',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Images.btn_share}
              style={{height: 60, width: 60}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreenApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f9f9f9',
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
