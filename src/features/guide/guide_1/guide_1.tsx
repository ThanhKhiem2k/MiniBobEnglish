import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Images} from '../../../conf';
import {handleSoundClick} from '../../../Utils/Sound';

const getSize = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};

interface Guide_1_Props {}

const Guide_1: React.FC<Guide_1_Props> = ({}) => {
  const navigation = useNavigation<any>();

  const _NextPage = () => {
    navigation.navigate('Guide_2');
    handleSoundClick();
  };
  return (
    <ImageBackground source={Images.bg_home} style={styles.container}>
      <View style={{height: 100}} />
      <View
        style={{
          flex: 9,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
          }}>
          Chào mừng bạn đến với MiniBobEnglish!
        </Text>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'right',
            color: '#ffffff',
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Ứng dụng học tiếng Anh cho người mới bắt đầu
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
              Tiếp theo
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <SafeAreaView edges={['bottom']} style={{flex: 0}} />
    </ImageBackground>
  );
};

export default Guide_1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
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
