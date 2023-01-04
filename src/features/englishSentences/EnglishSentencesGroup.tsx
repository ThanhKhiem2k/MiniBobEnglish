import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import { handleSoundClick } from '../../Utils/Sound';

const EnglishSentencesGroup = () => {
  const getSize = () => {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  };
  const arrSentences1 = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  const arrSentences2 = [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  ];
  const arrSentences3 = [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
  ];
  const navigation = useNavigation<any>();

  const componentList = ({item, index}: {item: number; index: number}) => {
    const indexNew = index + 1;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EnglishSentences', {item, indexNew});
          handleSoundClick();
        }}
        style={{
          height: getSize().height * 0.1,
          width: getSize().height * 0.1,
          margin: 10,
          borderRadius: 50,
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          alignItems: 'center',
          ...styles.shadow,
        }}>
        <Text
          style={{
            fontSize: 17,
            margin: 10,
            color: '#215',
            textAlign: 'center',
          }}>
          List {index + 1}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          margin: 30,
          marginBottom: 0,
          borderRadius: 20,
          justifyContent: 'space-between',
          backgroundColor: '#27d8a1',
          ...styles.shadow,
        }}>
        <Text
          style={{
            fontSize: 30,
            margin: 20,
            color: '#ffffff',
            fontWeight: 'bold',
          }}>
          Easy
        </Text>
        <View style={{height: '60%', margin: 10}}>
          <FlatList
            style={{height: '10%'}}
            horizontal={true}
            data={arrSentences1}
            renderItem={componentList}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          margin: 30,
          marginBottom: 0,
          borderRadius: 20,
          justifyContent: 'space-between',
          backgroundColor: '#3568ed',
          ...styles.shadow,
        }}>
        <Text
          style={{
            fontSize: 30,
            margin: 20,
            color: '#ffffff',
            fontWeight: 'bold',
          }}>
          Normal
        </Text>
        <View style={{height: '60%', margin: 10}}>
          <FlatList
            style={{height: '10%'}}
            horizontal={true}
            data={arrSentences2}
            renderItem={componentList}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          margin: 30,
          borderRadius: 20,
          justifyContent: 'space-between',
          backgroundColor: '#ed7171ff',
          ...styles.shadow,
        }}>
        <Text
          style={{
            fontSize: 30,
            margin: 20,
            color: '#ffffff',
            fontWeight: 'bold',
          }}>
          Hard
        </Text>
        <View style={{height: '60%', margin: 10}}>
          <FlatList
            style={{height: '10%'}}
            horizontal={true}
            data={arrSentences3}
            renderItem={componentList}
          />
        </View>
      </View>
    </View>
  );
};

export default EnglishSentencesGroup;

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
