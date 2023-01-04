import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deleteBookmark, getBookmark} from '../../www/connectDB';
import {NDTuVung} from '../../model/dbModel';
import {ActivityIndicator} from 'react-native-paper';
import {Images} from '../../conf';
import {handleSoundClick} from '../../Utils/Sound';

const BookMark = () => {
  const [ScoreFb, setScoreFb] = useState<NDTuVung[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getBookmarkList = () => {
    getBookmark((data: NDTuVung[]) => {
      setScoreFb(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    getBookmarkList();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f3f5fe'}}>
      <Text
        style={{
          margin: 20,
          marginBottom: 0,
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000000',
        }}>
        Danh sách các từ được lưu
      </Text>
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
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          {ScoreFb?.length ? (
            <FlatList
              data={ScoreFb}
              style={{width: '100%'}}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      height: 80,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 0.5,
                      borderColor: '#888',
                      margin: 15,
                      marginBottom: 0,
                      borderRadius: 10,
                      backgroundColor: '#ffffff',
                    }}>
                    <View style={{flex: 1, margin: 10}}>
                      <Text style={{fontSize: 20, color: '#213'}}>
                        {item.TuVung}
                      </Text>
                      <Text
                        style={{fontSize: 18, marginTop: 5, marginStart: 20}}>
                        {item.Nghia}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        deleteBookmark(item.TuVung || '');
                        let _itemState = ScoreFb.filter(
                          (_item, _index) => _index !== index,
                        );
                        setScoreFb(_itemState);
                        handleSoundClick();
                      }}
                      style={{margin: 10}}>
                      <Image
                        source={Images.icon_trash}
                        style={{height: 30, width: 30, tintColor: '#888'}}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : (
            <Text style={{fontSize: 20}}>Chưa có từ nào được lưu</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default BookMark;

const styles = StyleSheet.create({});
