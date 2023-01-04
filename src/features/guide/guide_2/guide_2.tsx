import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Images} from '../../../conf';
import { handleSoundClick } from '../../../Utils/Sound';

const getSize = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};

interface Guide_2_Props {}

const Guide_2: React.FC<Guide_2_Props> = ({}) => {
  const navigation = useNavigation<any>();

  const _NextPage = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'HomeApp',
        },
      ],
    });
    handleSoundClick();
  };
  return (
    <ImageBackground source={Images.bg_home} style={styles.container}>
      <View style={{flex: 2}} />
      <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Ứng dụng học tiếng Anh miễn phí và hiệu quả
        </Text>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'right',
            color: '#ffffff',
            fontWeight: 'bold',
            marginHorizontal: 20,
            marginTop: 50,
          }}>
          Bắt đầu ngay thôi!!!👋
        </Text>
      </View>
      <View
        style={{
          height: '11%',
          justifyContent: 'center',
          width: getSize().width,
          paddingHorizontal: 30,
          borderRadius: 30,
          ...styles.shadow,
        }}>
        <TouchableOpacity onPress={_NextPage}>
          <View
            style={{
              backgroundColor: '#f9f9f9',
              height: '90%',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={{marginEnd: 20, fontSize: 20, color: '#215'}}>
              Bắt đầu
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <SafeAreaView
        edges={['bottom']}
        style={{flex: 0}}
      />
    </ImageBackground>
  );
};

export default Guide_2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
