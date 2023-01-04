import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {CauHoi} from '../../../model/dbModel';
import PageType3 from '../Page3/PageType3';
import PageType2 from '../Page2/PageType2';
import PageType1 from '../Page1/PageType1';
import WordItem from '../../Word/Word';
import {Word1} from '../../Word1/Word1';

import PageType4 from '../Page4/PageType4';
import PageType5 from '../Page5/PageType5';
import {updateQuestions} from '../../../www/connectDB';
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  MULTI_TEXT_WIDTH_LINE,
  MULTI_TEXT,
  SINGLE_TEXT_WIDTH_LINE,
  SINGLE_TEXT,
} from '../../../Utils/Layout';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Colors from '../../../conf/Colors';
import {PageType6} from '../Page6/PageType6';

export interface IPage0Props {
  data: CauHoi;
  page: number;
  // updateBooleanQuestions: number;
  idTopic: number;
  UpdateResultsDetail: Function;
  Review: boolean;
}
const Page0: React.FC<IPage0Props> = ({
  data,
  page,
  // updateBooleanQuestions,
  idTopic,
  UpdateResultsDetail,
  Review,
}) => {
  const [ready, setReady] = useState(false);
  const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';
  const [keyWord, setKeyword] = useState<string[]>([]);
  const [keyWordArray, setKeywordArray] = useState<string[]>([]);
  const [questionItem, setQuestionItem] = useState<string[][]>([]);
  const [result, setResult] = useState<string>('');
  const question: any = data.cauHoi?.split(':');
  const [wordsClone, serWordsClone] = useState<string[]>([]);
  const questionType4 = (question.length > 1 ? question[1] : '').split('?');
  const UpdateResults = (temp: string) => {
    setResult(temp);
    UpdateResultsDetail(temp);
  };
  useEffect(() => {
    setReady(false);
    serWordsClone(data.words || []);
    if (data.type == 3) {
      const key = (
        questionType4.length == 1 ? questionType4[0] : questionType4[1]
      )
        .replace('_,', '_ ,')
        .replace('_.', '_')
        .trim()
        .split('');
      setKeyword(key);
    } else if (data.type == 4) {
      const key = (
        questionType4.length == 1
          ? questionType4[0]
          : questionType4[1] == ''
          ? question[1]
          : questionType4[1]
      )
        .replace('_,', '_ ,')
        .replace('_.', '_')
        // .replace('.', '')
        .trim()
        .split(' ');
      setKeyword(key);
      // console.log(key)
    } else if (data.type == 5) {
      let sep = /\r\n|\n/;
      let keyArray: string[] = [];
      let questionI: string[][] = [];

      const replaceQs: string = question[1].split('.').join('');
      const key: string[] = replaceQs.trim().split(sep);
      key.forEach((element, index) => {
        let temp: string[];
        key[index] = element
          .replace('_,', '_ ,')
          .replace('_.', '_ .')
          .trim()
          .slice(2);
        temp = key[index].split(' ');
        questionI.push(temp);
        temp.forEach(elements => {
          keyArray.push(elements);
        });
        if (index < key.length - 1) {
          keyArray.push('/');
        }
      });
      // console.log(keyArray)
      setQuestionItem(questionI);
      setKeywordArray(keyArray);
    }
  }, [data]);
  const processSizeWords = (temp: string[]) => {
    let results: number = 0;
    temp.forEach((element, index) => {
      let sumAZ = element.length;
      if (sumAZ > results) {
        results = sumAZ;
      }
    });
    return results;
  };
  const main = () => {
    return (
      <GestureHandlerRootView>
        <View
          style={{
            marginTop: sizeDevices == 'small' ? 5 : 10,
            backgroundColor: '#ffffff',
            height: sizeDevices == 'small' ? '98%' : '95%',
            margin: 25,
            borderRadius: 25,
          }}>
          <View
            style={{
              margin: sizeDevices == 'small' ? 10 : 20,
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <View
              style={{
                backgroundColor: '#000000',
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontSize: sizeDevices == 'small' ? 18 : 23,
                  color: '#ffffff',
                  fontWeight: 'bold',
                }}>
                {page + 1}
              </Text>
            </View>
            <Text
              style={{
                fontSize: sizeDevices == 'small' ? 16 : 20,
                color: '#000000',
                fontWeight: 'bold',
                marginRight: 40,
              }}>
              {data?.type == 2 ? 'Read and tick' : question[0]}
            </Text>
          </View>
          {ready && data != undefined ? (
            data.type == 1 ? (
              <PageType1
                Review={Review}
                UpdateResults={UpdateResults}
                stringAnswer={data.chonDapAn || ''}
                words={wordsClone}
                id={data.id || 0}
                imageQuestion={data.image || ''}
                cauHoi={data.cauHoi || ''}>
                {data?.words?.map((word, index) => (
                  <WordItem
                    key={data.id?.toString()}
                    id={data.id || 0}
                    word={word}
                  />
                ))}
              </PageType1>
            ) : data?.type == 2 ? (
              <PageType2
                Review={Review}
                UpdateResults={UpdateResults}
                stringAnswer={data.chonDapAn || ''}
                linkImage={data.DapAn || []}
                textQuestion={data.cauHoi || ''}
                id={data.id || 0}
              />
            ) : data?.type == 3 ? (
              <PageType3
                Review={Review}
                UpdateResults={UpdateResults}
                stringAnswer={data.chonDapAn || ''}
                question={keyWord}
                widthLine={35}
                marginLeftText={SINGLE_TEXT}
                title={questionType4.length == 1 ? null : questionType4[0]}
                id={data.id || 0}
                imageQuestion={data.image || ''}>
                {wordsClone.map((word, index) => {
                  return (
                    <WordItem
                      key={data.id?.toString()}
                      id={data.id || 0}
                      word={word}
                    />
                  );
                })}
              </PageType3>
            ) : data?.type == 4 ? (
              <PageType4
                Review={Review}
                UpdateResults={UpdateResults}
                stringAnswer={data.chonDapAn || ''}
                question={keyWord}
                widthLine={processSizeWords(wordsClone) * 11 + 35}
                marginLeftText={
                  processSizeWords(wordsClone) == 1
                    ? SINGLE_TEXT
                    : processSizeWords(wordsClone) < 5
                    ? processSizeWords(wordsClone) * -1
                    : processSizeWords(wordsClone) * -3 + 5
                  // processSizeWords(data.words || []) ? SINGLE_TEXT : MULTI_TEXT
                }
                title={
                  questionType4.length == 1 || questionType4[1] == ''
                    ? null
                    : questionType4[0]
                }
                id={data.id || 0}
                imageQuestion={data.image || ''}>
                {wordsClone.map((word, index) => {
                  return <WordItem key={index} id={data.id || 0} word={word} />;
                })}
              </PageType4>
            ) : data.type == 5 && data != undefined ? (
              <PageType5
                Review={Review}
                UpdateResults={UpdateResults}
                stringAnswer={data.chonDapAn || ''}
                question={keyWordArray || []}
                questionItem={questionItem || []}
                widthLine={processSizeWords(wordsClone) * 11 + 35}
                title={question[0]}
                indexNumber={data.id || 0}>
                {wordsClone.map((word, index) => {
                  return (
                    <Word1 key={index} id={data.id || 0} word={word + index} />
                  );
                })}
              </PageType5>
            ) : data?.type == 6 ? (
              <PageType6
                textQuestion={question[1].trim() || ''}
                UpdateResults={UpdateResults}
                wordsClone={wordsClone}
                Review={Review}
                stringAnswer={data.chonDapAn || ''}
              />
            ) : null
          ) : (
            <View
              style={{opacity: 0, flex: 1}}
              onLayout={() => {
                runOnUI(() => {
                  'worklet';
                  runOnJS(setReady)(true);
                })();
              }}
            />
          )}
        </View>
      </GestureHandlerRootView>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 15,
      }}>
      {main()}
    </View>
  );
};

export default Page0;
