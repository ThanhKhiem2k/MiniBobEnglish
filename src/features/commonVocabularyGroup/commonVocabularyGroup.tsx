import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { handleSoundClick } from '../../Utils/Sound';

type Props = {};
const getSize = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};
const CommonVocabularyGroup = (props: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.shadow}>
      <FlatList
        data={[
          '#b384fe',
          '#ff9a97',
          '#27d8a1',
          '#73ceff',
          '#6adccd',
          '#5b7d96',
          '#f1cd3f',
          '#ed7171',
          '#b5e3fd',
          '#422d14',
        ]}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CommonVocabulary', {index});
              handleSoundClick();
            }}
            style={{
              height: getSize().width * 0.5 - 25,
              width: getSize().width * 0.5 - 25,
              borderRadius: 20,
              backgroundColor: item,
              flexDirection: 'column',
              margin: 20,
              shadowColor: '#003d87',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.39,
              shadowRadius: 8.3,
              elevation: 8,
              marginEnd: 0,
              marginBottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: '70%',
                width: '70%',
                borderRadius: 100,
                justifyContent: 'center',
                ...styles.shadow,
                alignItems: 'center',
                backgroundColor: '#dff',
              }}
            >
              <Text style={{fontSize: 25, color: '#215', textAlign: 'center'}}>
                Phần {index + 1}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CommonVocabularyGroup;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#003d87',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 8,
  },
});
