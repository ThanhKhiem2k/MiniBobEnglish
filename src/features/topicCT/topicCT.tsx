import {useNavigation, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ChuDeCT, ChuDeTQ} from '../../model/dbModel';
import {handleSoundClick} from '../../Utils/Sound';
import {getTopicsCT} from '../../www/connectDB';

interface AppProps {}

const TopicCT = (props: AppProps) => {
  const getSize = () => {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  };
  const route = useRoute<any>();
  const {idTopic} = route.params;

  const navigation = useNavigation<any>();

  const [DataTopics, setDataTopics] = useState<ChuDeCT[]>([]);
  const getDataTopics = async () => {
    await getTopicsCT((result: ChuDeCT[]) => {
      setDataTopics(result);
    }, idTopic);
  };
  const _renderItem = ({item, index}: {item: ChuDeCT; index: number}) => {
    const itemCT = item;
    return (
      <TouchableOpacity
        style={{
          height: getSize().height * 0.16,
          backgroundColor: '#eef3fc',
          shadowColor: '#003d87',
          ...styles.shadow,
          margin: 20,
          marginBottom: 0,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate('StudyLayout', {itemCT});
          handleSoundClick();
        }}>
        <View
          style={{
            flex: 1.5,
            margin: 10,
            marginBottom: 0,
            borderRadius: 20,
            backgroundColor: '#5b7d96',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              marginStart: 20,
              fontWeight: 'bold',
              fontSize: 18,
              color: 'white',
            }}>
            Chủ đề {index + 1}
          </Text>
          <Text
            style={{
              marginStart: 20,
              fontWeight: 'bold',
              fontSize: 16,
              color: '#223',
            }}>
            {itemCT.SoLuongTN} từ vựng
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 50,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              color: '#215',
            }}>
            {itemCT.Name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getDataTopics();
    return () => setDataTopics([]);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <FlatList data={DataTopics} renderItem={_renderItem} />
    </View>
  );
};

export default TopicCT;

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
