import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {Images} from '../../conf';
import {firebase} from '@react-native-firebase/database';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {ScoreRank, UserInfo} from '../../model/dbModel';
import {
  getScoreRank,
  updateScoreRankPerseverance,
  updateScoreRankRating,
} from '../../www/connectDB';
import {ActivityIndicator} from 'react-native-paper';
import {handleSoundClick} from '../../Utils/Sound';
import SPInputSearch from './search-input/index';

// const getSize = () => {
//   return {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   };
// };
interface Props {}

const UserOption = (props: Props) => {
  const [idListFriendTemp, setIdListFriendTemp] = useState<any[]>([]);
  const [listFriend, setListFriend] = useState<any[]>();
  const [idListFriend, setIdListFriend] = useState<any[]>();
  const [searchDataUser, setSearchDataUser] = useState<any[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [pictureURL, setPictureURL] = useState<string>('');
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [listUser, setListUser] = useState<any>();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    name: '',
    picture: '',
  });
  const [Score, setScore] = useState<ScoreRank>({
    id: '',
    ratingPoints: '',
    perseverancePoint: '',
    idFirebaseUser: '',
  });
  const [ScoreFb, setScoreFb] = useState<ScoreRank>({
    id: '',
    ratingPoints: '',
    perseverancePoint: '',
    idFirebaseUser: '',
  });
  const getScoreRankUser = () => {
    getScoreRank((data: ScoreRank) => {
      setScoreFb(data);
    }, '0');
  };
  const [routes] = useState([
    {key: 'second', title: 'Xếp hạng người dùng'},
    {key: 'first', title: 'Xếp hạng bạn bè'},
  ]);

  const reference = firebase
    .app()
    .database(
      'https://minibobenglish-default-rtdb.asia-southeast1.firebasedatabase.app',
    );
  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name, picture.type(large)',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          reference.ref('/users/' + result.id).on('value', snapshot => {
            if (snapshot.val() === null) {
              reference.ref('/users/' + result.id).update({
                id: result.id,
                name: result.name,
                picture: result.picture.data.url,
                ScoreRating: parseInt(ScoreFb.ratingPoints!),
                ScorePerseverance: parseInt(ScoreFb.perseverancePoint!),
              });
              // reference.ref('/friends/' + result.id).update({
              // });
              reference.ref('/friends/' + userInfo.id + '/').update({
                [result?.id]: 'userID',
              });
              setUserInfo({
                id: result?.id,
                name: result?.name,
                picture: result?.picture?.data?.url,
              });
            } else {
              const dataThis = snapshot.val();
              setUserInfo({
                id: dataThis?.id,
                name: dataThis?.name,
                picture: dataThis?.picture,
              });
              setScore({
                id: '1',
                ratingPoints: dataThis?.ScoreRating,
                perseverancePoint: dataThis?.ScorePerseverance,
                idFirebaseUser: dataThis?.id,
              });
              setScoreFb({
                id: '1',
                ratingPoints: dataThis?.ScoreRating,
                perseverancePoint: dataThis?.ScorePerseverance,
                idFirebaseUser: dataThis?.id,
              });
              updateScoreRankRating(dataThis?.ScoreRating + '');
              updateScoreRankPerseverance(dataThis?.ScorePerseverance + '');
            }
          });
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  const getInfoFromTokenRefresh = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name, picture.type(large)',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          reference.ref('/users/' + result.id).on('value', snapshot => {
            const dataThis = snapshot.val();
            setUserInfo({
              id: dataThis?.id,
              name: dataThis?.name,
              picture: dataThis?.picture,
            });
            setScore({
              id: '1',
              ratingPoints: dataThis.ScoreRating,
              perseverancePoint: dataThis.ScorePerseverance,
              idFirebaseUser: dataThis?.id,
            });
          });

          if (ScoreFb.ratingPoints !== '') {
            reference.ref('/users/' + result.id).update({
              // id: result.id,
              // name: result.name,
              // picture: result.picture.data.url,
              ScoreRating: parseInt(ScoreFb.ratingPoints!),
              ScorePerseverance: parseInt(ScoreFb.perseverancePoint!),
            });
          }
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  const getListFriend = listId => {
    let resultArr: any = [];
    listId.map(element => {
      reference.ref('/users/' + element).on('value', snapshot => {
        if (snapshot.val() != null) {
          resultArr.push(snapshot.val());
        }
      });
    });
    return resultArr;
  };
  useEffect(() => {
    if (idListFriend) {
      setListFriend(getListFriend(idListFriend));
      reference.ref('/users').on('value', snapshot => {
        setListUser(Object.values(snapshot.val()));
        setSearchDataUser(
          Object.values(snapshot.val()).map(element => {
            return {...element!, follow: idListFriend.includes(element.id)};
          }),
        );
      });
      if (idListFriendTemp.length === 0) {
        setIdListFriendTemp(idListFriend);
      }
    }
  }, [idListFriend]);

  const getListUser = () => {
    if (userInfo.id !== '') {
      reference.ref('/friends/' + userInfo.id).on('value', snapshot => {
        if (snapshot.val() != null) {
          setIdListFriend(Object.keys(snapshot.val()));
        }
      });
    } else {
      reference.ref('/users').on('value', snapshot => {
        setListUser(Object.values(snapshot.val()));
      });
    }
  };
  const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  };
  useEffect(() => {
    getScoreRankUser();
    setSearchDataUser(listUser);
  }, []);
  useEffect(() => {
    AccessToken.getCurrentAccessToken().then(data => {
      if (data !== null) {
        const accessToken = data.accessToken.toString();
        getInfoFromTokenRefresh(accessToken);
      }
    });
  }, [ScoreFb]);

  useEffect(() => {
    if (
      typeof userInfo !== 'undefined' &&
      typeof userInfo.picture !== 'undefined'
    ) {
      setPictureURL(userInfo.picture);
      getListUser();
    } else {
      setPictureURL('');
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userInfo]);
  const searchData = (text, data) => {
    const newData = data.filter(item => {
      const itemData = `${item.name
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')}`;
      const textData = text
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
      return itemData.indexOf(textData) > -1;
    });
    setSearchDataUser(newData);
  };
  const handleSearch = text => {
    if (text) {
      searchData(text, listUser);
    } else {
      setSearchDataUser(listUser);
    }
  };
  const onClear = () => {};

  useEffect(() => {}, [listUser]);

  const FirstRoute = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        {userInfo.id !== '' ? (
          <FlatList
            style={{margin: 10}}
            renderItem={({item}) => (
              <View
                style={{
                  height: 70,
                  width: '97%',
                  margin: 5,
                  backgroundColor: '#dddddd',
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    margin: 10,
                    borderRadius: 40,
                    borderColor: '#ffca4c',
                  }}
                  source={
                    item.picture != '' ? {uri: item.picture} : Images.icon_user
                  }
                />
                <Text style={{color: '#000000'}}>{item.name}</Text>
                <Text style={{margin: 10, fontWeight: 'bold', color: '#138'}}>
                  {item.ScoreRating}
                </Text>
              </View>
            )}
            data={
              listFriend
                ? listFriend.sort(compareValues('ScoreRating', 'desc'))
                : null
            }
            // data={listFriend}
          />
        ) : (
          <View style={{flex: 1, margin: 10}}>
            <Text style={{fontSize: 18, color: '#000'}}>
              Vui lòng đăng nhập với facebook để liên kết thông tin của bạn
            </Text>
          </View>
        )}
      </View>
    );
  };
  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      {listUser ? (
        <FlatList
          style={{margin: 10}}
          renderItem={({item}) => (
            <View
              style={{
                height: 70,
                width: '97%',
                margin: 5,
                backgroundColor: '#dddddd',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  margin: 10,
                  borderRadius: 40,
                  borderColor: '#ffca4c',
                }}
                source={
                  item.picture !== '' ? {uri: item.picture} : Images.icon_user
                }
              />
              <Text style={{color: '#000000'}}>{item.name}</Text>
              <Text style={{margin: 10, fontWeight: 'bold', color: '#138'}}>
                {item.ScoreRating}
              </Text>
            </View>
          )}
          data={listUser.sort(compareValues('ScoreRating', 'desc'))}
        />
      ) : null}
    </View>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  return (
    <View style={{flex: 1}}>
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
      <View style={{flex: 1, backgroundColor: '#345'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 4,
                marginVertical: 20,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  borderColor: '#ffca4c',
                }}
                source={pictureURL != '' ? {uri: pictureURL} : Images.icon_user}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LoginButton
                type="solid"
                style={{width: 100, height: 50}}
                readPermissions={['user_friends', 'email']}
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log('login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    console.log('login is cancelled.');
                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                      const accessToken = data.accessToken.toString();
                      getInfoFromToken(accessToken);
                    });
                  }
                }}
                onLogoutFinished={() => {
                  reference.ref('/users/' + userInfo.id).update({
                    ScoreRating: parseInt(ScoreFb.ratingPoints!),
                    ScorePerseverance: parseInt(ScoreFb.perseverancePoint!),
                  });
                  setUserInfo({
                    id: '',
                    name: '',
                    picture: '',
                  });
                }}
              />
            </View>
          </View>
          <View style={{flex: 2}}>
            {userInfo.name != '' ? (
              <View style={{flex: 1, margin: 10}}>
                <Text style={{fontSize: 18, color: '#dddddd'}}>
                  Tên người dùng của bạn
                </Text>
                <Text style={{fontSize: 18, color: '#dddddd', margin: 10}}>
                  {userInfo.name != '' ? userInfo.name : 'Không có thông tin'}
                </Text>
              </View>
            ) : (
              <View style={{flex: 1, margin: 10}}>
                <Text style={{fontSize: 18, color: '#dddddd'}}>
                  Vui lòng đăng nhập với facebook để liên kết thông tin của bạn.
                </Text>
              </View>
            )}
            <View style={{flex: 1, margin: 10}}>
              <Text style={{fontSize: 18, color: '#dddddd'}}>
                Tích điểm làm bài
              </Text>
              <Text style={{fontSize: 18, color: '#dddddd', margin: 5}}>
                {/* {Score.ratingPoints||ScoreFb.ratingPoints} */}
                {ScoreFb.ratingPoints}
              </Text>
            </View>
            <View style={{flex: 1, margin: 10}}>
              <Text style={{fontSize: 18, color: '#dddddd'}}>
                Điểm hoạt động
              </Text>
              <Text style={{fontSize: 18, color: '#dddddd', margin: 5}}>
                {ScoreFb.perseverancePoint}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: '#ddddee',
          justifyContent: 'flex-end',
        }}>
        {/* <View style={{borderWidth: 1, flex: 1}}></View> */}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              renderLabel={({route, color}) => (
                <Text
                  style={{fontSize: 15, textAlign: 'center', color: 'white'}}>
                  {route.title}
                </Text>
              )}
            />
          )}
        />
        {userInfo.id !== '' ? (
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignSelf: 'flex-end',
              zIndex: modalVisible ? -1 : 2,
            }}>
            <TouchableOpacity
              style={{margin: 20}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image
                source={Images.icon_add_user}
                style={{
                  height: 70,
                  // tintColor: Colors.primary,
                  margin: 10,
                  marginBottom: 30,
                  overflow: 'hidden',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{height: '65%', backgroundColor: '#ffffff', width: '100%'}}>
            <View
              style={{
                height: 70,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleSoundClick();
                  setModalVisible(false);
                }}
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.icon_close}
                  style={{
                    // tintColor: Colors.secondary,
                    height: 30,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: '#000000', fontSize: 20, fontWeight: '500'}}>
                  Những người bạn có thể biết
                </Text>
              </View>
            </View>
            <View style={{margin: 10, height: 50}}>
              <SPInputSearch
                placeholder={'Nhập tên người muốn tìm kiếm'}
                // hasClearButton={true}
                onChangeText={handleSearch}
                // iconClearButton={Images2.clearGreyBG}
                // iconStyleClearButton={styles.iconFrameSearch}
                // onBlur={onBlur}
                onClear={onClear}
              />
            </View>
            <View style={{margin: 10}}>
              <Text style={{fontSize: 18}}>Danh sách người dùng</Text>
            </View>
            <View style={{flex: 1, marginBottom: 20}}>
              <FlatList
                renderItem={({item, index}) => {
                  return (
                    <View style={{height: 80, flexDirection: 'row'}}>
                      <Image
                        style={{
                          height: 60,
                          width: 60,
                          margin: 10,
                          borderRadius: 40,
                          borderColor: '#ffca4c',
                        }}
                        source={
                          item.picture != ''
                            ? {uri: item.picture}
                            : Images.icon_user
                        }
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                        }}>
                        <Text style={{margin: 10, fontSize: 18, flex: 1}}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          disabled={item.follow}
                          style={{
                            backgroundColor: !item.follow
                              ? '#0066ef'
                              : '#dddddd',
                            height: 70,
                            width: 100,
                            margin: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                          }}
                          onPress={() => {
                            handleSoundClick();
                            const id = item.id;
                            reference
                              .ref('/friends/' + userInfo.id + '/')
                              .update({
                                [id!]: 'userID',
                              });
                            setSearchDataUser(
                              searchDataUser!.map(element => {
                                if (element.id == item.id) {
                                  return {...element, follow: true};
                                } else {
                                  return element;
                                }
                              }),
                            );
                          }}>
                          <Text
                            style={{
                              color: '#ffffff',
                              fontWeight: '600',
                              fontSize: 18,
                              textAlign: 'center',
                            }}>
                            {!item.follow ? 'Theo dõi' : 'Đang theo dõi'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                data={
                  userInfo.id !== '' && searchDataUser
                    ? searchDataUser.filter(item => {
                        if (idListFriendTemp) {
                          return !idListFriendTemp.includes(item.id);
                        }
                      })
                    : searchDataUser
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserOption;

const styles = StyleSheet.create({});
