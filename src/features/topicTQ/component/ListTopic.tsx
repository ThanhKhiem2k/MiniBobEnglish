import {
  Dimensions,
  Image,
  ImageBackground,
  ImageBackgroundComponent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {ChuDeTQ} from '../../../model/dbModel';
import {useNavigation} from '@react-navigation/native';
import {handleSoundClick} from '../../../Utils/Sound';

interface ListTopicCpn {
  arrTopic: ChuDeTQ[];
  listIMG: any[];
}

const ListTopic: FC<ListTopicCpn> = ({arrTopic, listIMG}) => {
  const navigation = useNavigation<any>();

  const getSize = () => {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  };
  const _renderItem = (DataTopicTQ: ChuDeTQ, index: number) => {
    const idTopic = DataTopicTQ.id;
    return (
      <TouchableOpacity
        style={{
          marginVertical: 10,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.39,
          shadowRadius: 8.3,
          elevation: 8,
        }}
        onPress={() => {
          navigation.navigate('TopicCT', {idTopic});
          handleSoundClick();
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderRadius: 8,
              backgroundColor: '#eef3fcff',
              paddingHorizontal: 10,
              paddingBottom: 20,
              marginStart: 50,
            }}>
            <Text
              style={{
                fontSize: 25,
                color: '#215',
                fontWeight: 'bold',
                paddingHorizontal: 10,
              }}>
              {DataTopicTQ.Name}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: getSize().height * 0.2,
            marginTop: -20,
            marginHorizontal: 20,
            borderRadius: 20,
            justifyContent: 'flex-end',
            overflow: 'hidden',
          }}>
          <ImageBackground source={listIMG[index]} style={{flex: 1}} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      {arrTopic.map((item, index) => {
        return <View key={index}>{_renderItem(item!, index)}</View>;
      })}
    </ScrollView>
  );
};

export default ListTopic;

const styles = StyleSheet.create({});
