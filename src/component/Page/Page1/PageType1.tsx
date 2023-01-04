import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import WordList from '../../../component/WordList/WordList';
import Word from '../../../component/Word/Word';
import styles from './styles';
import { MARGIN_LEFT } from '../../../Utils/Layout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export interface IPageType1Props {
  words: string[];
  id: number;
  cauHoi: string;
  stringAnswer: string;
  UpdateResults: Function;
  Review: boolean;
  imageQuestion: string;
}

const PageType1: React.FC<IPageType1Props> = ({
  UpdateResults,
  words,
  id,
  cauHoi,
  stringAnswer,
  Review,
  imageQuestion,
}) => {
  const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';
  const [arrayNumberAnswerTemp, setArrayNumberAnswerTemp] = useState<number[]>(
    [],
  );
  useEffect(() => {
    UpdateResults('');
    let arrayNumberAnswers: string[] = imageQuestion == '' ? stringAnswer.split(' ') : stringAnswer.split('');
    let arrayNumberAnswerTemps: number[] = [];
    words.forEach((item, index) => {
      const number: number = arrayNumberAnswers.indexOf(item);
      arrayNumberAnswerTemps.push(number);
      arrayNumberAnswers[number] = '';
    });
    setArrayNumberAnswerTemp(arrayNumberAnswerTemps);
  }, [stringAnswer]);
  return (
    <GestureHandlerRootView style={styles.container}>
      {imageQuestion != '' ? (
        <Image
          source={{
            uri: imageQuestion,
          }}
          style={{
            width: '100%',
            height: '25%',
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      ) : (
        <View
          style={{
            width: sizeDevices == 'small' ? 0 : '5%',
            height: sizeDevices == 'small' ? 0 : '5%',
          }}
        />
      )}
      <WordList
        haveImage={imageQuestion != ''}
        Review={Review}
        UpdateResults={UpdateResults}
        arrayNumberAnswer={arrayNumberAnswerTemp}>
        {words.map((word, index) => (
          <Word key={index} id={index + 1} word={word} />
        ))}
      </WordList>
    </GestureHandlerRootView>
  );
};

export default PageType1;
