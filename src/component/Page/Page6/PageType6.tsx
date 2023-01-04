import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';;
import {MARGIN_LEFT, WORD_HEIGHT} from '../../../Utils/Layout';
import {handleSoundClick} from '../../../Utils/Sound';
import styles from './styles';
import WordItem from '../../Word/Word';
import Colors from '../../../conf/Colors';

export type IPageType6Props = {
  textQuestion: string;
  UpdateResults: Function;
  wordsClone: string[];
  Review: boolean;
  stringAnswer: string;
};

const PageType6: React.FC<IPageType6Props> = ({
  Review,
  textQuestion,
  wordsClone,
  UpdateResults,
  stringAnswer,
}) => {
  const [chonDapAn, setChonDapAn] = useState<string>(stringAnswer);
  const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';
  const onClickAnswer = (item: string) => {
    handleSoundClick();
    setChonDapAn(item);
  };
  useEffect(() => {
    UpdateResults(chonDapAn);
  }, [chonDapAn]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{textQuestion}</Text>
      <View style={{height: '5%'}} />
      <View
        style={{
          flex: 1,
        }}>
        {wordsClone.map((word, index) => {
          const selected = chonDapAn === word ? true : false;
          return (
            <TouchableOpacity
              key={index}
              disabled={Review}
              onPress={() => {
                onClickAnswer(word);
                handleSoundClick();
              }}>
              <View style={styles.root}>
                <View>
                  <View
                    style={{
                      ...styles.containerItem,
                      paddingHorizontal: word.length > 1 ? 5 : 10,
                      backgroundColor: selected
                        ? Colors.primary
                        : Colors.secondary,
                    }}>
                    <Text
                      style={{
                        fontSize: sizeDevices == 'small' ? 18 : 23,
                        margin: 5,
                        color: selected
                          ? Colors.secondary
                          : Colors.textQuestion,
                      }}>
                      {word}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export {PageType6};
