import React, {Children, ReactElement, useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styles from './styles';
import {
  MARGIN_LEFT,
  WORD_HEIGHT,
  MULTI_TEXT_WIDTH_LINE,
  SENTENCE_HEIGHT,
} from '../../../Utils/Layout';
import {Word} from '../../../model/dbModel';
import {runOnJS, runOnUI, useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MULTI_TEXT, Offset, MARGIN_ROW} from '../../../Utils/Layout';
import WordType5 from '../../WordType5/WordType5';

interface IPageType4Props {
  children: ReactElement<Word>[];
  question: string[];
  title: string;
  indexNumber: number;
  stringAnswer: string;
  UpdateResults: Function;
  Review: boolean;
  widthLine: number;
  questionItem: string[][];
}

const PageType5: React.FC<IPageType4Props> = ({
  question,
  children,
  title,
  indexNumber,
  stringAnswer,
  UpdateResults,
  Review,
  widthLine,
  questionItem,
}) => {
  const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';
  const wDevices = Dimensions.get('window').width;
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [questionResult, setQuestionResult] = useState<string[]>([]);
  const heightItemp = useSharedValue<number>(0);
  const height1Itemp = useSharedValue<number>(0);
  // const [heightItemp, setHeightItemp] = useState(0);
  // const [height1Itemp, setHeight1Itemp] = useState(0);

  const [positionX, setPositionX] = useState<number[]>([]);
  const [positionY, setPositionY] = useState<number[]>([]);

  type orderPosition = {
    orderPosition: number;
    positionX: number;
    positionY: number;
  };
  // type orderPosition = SharedValues<{
  //   numberOrder: number,
  //   positionX: number,
  //   positionY: number,
  // }>;
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
    word: useSharedValue(''),
    dataResult: useSharedValue(0),
  }));
  const bank = useSharedValue(questionItem.length);
  const arrayStringAnswer: string[] =
    stringAnswer == '' ? [] : stringAnswer.split(',');
  //const {checkPosition} = useSelector((state: RootState) => state.position);
  const position = useSharedValue<orderPosition[]>([]);
  // const positionY = useSharedValue<number[]>([]);
  const checkPosition = useSharedValue<number[]>([]);
  let NumberValueXY: number = 0;
  const dragAnswer = (text: string) => {
    const arr: string[] = [...selected];
    let index: number = bank.value - 1;
    for (let i = 0; i < checkPosition.value.length; i++) {
      if (selected[i] == '') {
        index = i;
        break;
      }
    }
    if (arr.indexOf(text) == -1) {
      arr[index] = text;
      setSelected(arr);
    }
  };

  const removeAnswers = (text: string) => {
    const arr: string[] = [...selected];
    const _i = arr.indexOf(text);
    if (_i != -1) {
      arr[_i] = '';
      setSelected(arr);
    }
  };
  const cloneAttributesArray = (
    arrObj: orderPosition[],
    type: string,
    heightI: number,
    height1I: number,
  ) => {
    let result: number[] = [];
    const indexItemp: number = parseInt((heightI / height1I).toFixed());
    // const numberLength4 = (questionItem.length >= 3 ? (sizeDevices == "small" ? 32 + (indexItemp == 10 ? 10 : 0) : 35) : 0)
    const numberLength4 = 0;
    // console.log(((heightI - (13 * questionItem.length)) / (height1I)))
    // console.log(heightI);
    // console.log(height1I);

    arrObj.forEach(element => {
      if (type == 'X') {
        result.push(element.positionX);
      } else if (type == 'Y') {
        switch (indexItemp) {
          case 3:
            result.push(element.positionY - 60);
            break;
          case 4:
            result.push(element.positionY - 9);
            break;
          case 5:
            result.push(element.positionY + 40);
            break;
          case 6:
            result.push(element.positionY + 45 * 2);
            break;
          case 7:
            result.push(element.positionY + 47 * 3);
            break;
          case 8:
            result.push(element.positionY + 48 * 4);
            break;
          case 9:
            result.push(element.positionY + 48 * 5);
            break;
          default:
            result.push(element.positionY + 49 * 6);
            break;
        }
      }
    });
    return result;
  };
  const setAtIndexAnswer = (index: number, text: string) => {
    const arr: string[] = [...selected];
    const _i = arr.indexOf(text);
    if (_i === -1) {
      arr[index] = text;
      setSelected(arr);
    }
  };
  // const removeCheckPosition = (index: number) => {
  //   checkPosition.value[index] = -1;
  // };

  // const changeCheckPosition = (value: checkIndex) => {
  //   checkPosition.value[value.index] = value.value;
  // };
  useEffect(() => {
    for (let i = 0; i < questionItem.length; i++) {
      checkPosition.value[i] = -1;
      // positionX.value.push(0);
      // positionY.value.push(0);
      arrayStringAnswer.length != 0
        ? (selected[i] = arrayStringAnswer[i])
        : (selected[i] = '');
      // questionResult[i] = children[i].props.word;
      // offsets[i].x.value = positionX.value[i];
      // offsets[i].y.value = positionY.value[i];
      // offsets[i].originalX.value = positionX.value[i];
      // offsets[i].originalY.value = positionY.value[i];
    }
  }, [question.length]);
  useEffect(() => {
    let str: string = '';
    if (selected != undefined) {
      selected.forEach(function (element) {
        if (element != undefined && element != '') {
          if (str == '') {
            str += element;
          } else {
            str += ',' + element;
          }
        }
      });

      UpdateResults(str);
    }
  }, [selected]);
  // useEffect(() => {
  //   setPositionX(cloneAttributesArray(position.value, 'X', heightItemp.value, height1Itemp.value))
  //   setPositionY(cloneAttributesArray(position.value, 'Y', heightItemp.value, height1Itemp.value).reverse())
  //   // }, [heightItemp, height1Itemp]);
  // }, [heightItemp.value]);
  if (!ready) {
    return (
      <View style={styles.root}>
        <View
          style={styles.container}
          onLayout={({
            nativeEvent: {
              layout: {x, y, width, height},
            },
          }) => {
            heightItemp.value = height;
            // setHeightItemp(height)
          }}>
          {question.map((o, i) => {
            return (
              <View
                key={i}
                onLayout={({
                  nativeEvent: {
                    layout: {x, y, width, height},
                  },
                }) => {
                  // setHeight1Itemp(height)
                  height1Itemp.value = height;
                  if (o === '_') {
                    position.value.push({
                      orderPosition: i,
                      positionX:
                        +x +
                        MULTI_TEXT -
                        MARGIN_LEFT +
                        MULTI_TEXT_WIDTH_LINE / 2,
                      positionY: -y + 20 + 202,
                    });
                    position.value.sort((a, b) =>
                      a.orderPosition > b.orderPosition ? 1 : -1,
                    );
                  }
                }}
                style={{
                  ...styles.viewQuestion,
                  // marginLeft: MARGIN_LEFT,
                }}>
                {o === '_' ? (
                  <View style={{height: 50}}>
                    <View style={{...styles.line, width: widthLine}} />
                  </View>
                ) : o === '/' ? (
                  <Text style={{height: 0, width: wDevices}} />
                ) : (
                  <Text
                    key={i}
                    style={{
                      ...styles.question,
                      marginRight:
                        question[i][i + 1] || question[i][i - 1] === '_'
                          ? 8
                          : 0,
                    }}>
                    {o + ' '}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.row}>
          {children.map((child, index) => {
            return (
              <View
                key={index.toString()}
                onLayout={({
                  nativeEvent: {
                    layout: {x, y, width, height},
                  },
                }) => {
                  const offset = offsets[index]!;
                  offset.order.value = -1;
                  offset.width.value = width;
                  offset.height.value = height;
                  offset.originalX.value = x;
                  offset.originalY.value = y;
                  offset.word.value = child.props.word;
                  offset.dataResult.value = -1;
                  // questionResult.push(child.props.word);
                  runOnUI(() => {
                    'worklet';
                    if (
                      // positionY.value.length == questionItem.length
                      offsets.filter(o => o.order.value !== -1).length === 0
                    ) {
                      runOnJS(setReady)(true);
                    }
                  })();
                }}>
                {child}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          height: sizeDevices == 'small' ? 0 : '5%',
        }}
      />
      <View style={styles.container}>
        {question.map((o, i) => {
          return (
            <View
              key={i}
              style={{
                ...styles.viewQuestion,
                // marginLeft: MARGIN_LEFT,
              }}>
              {o === '_' ? (
                <View style={{height: 50}}>
                  <View style={{...styles.line, width: widthLine}} />
                </View>
              ) : o === '/' ? (
                <Text style={{height: 0, width: wDevices}} />
              ) : (
                <Text
                  key={i}
                  style={{
                    ...styles.question,
                    marginRight:
                      question[i][i + 1] || question[i][i - 1] === '_' ? 8 : 0,
                  }}>
                  {o + ' '}
                </Text>
              )}
            </View>
          );
        })}
      </View>
      <View
        style={{
          marginLeft: MARGIN_LEFT,
          // backgroundColor: 'red'
        }}>
        {children != undefined ? (
          children.map((child, index) => {
            const answer: number = selected.indexOf(child.props.word);
            return (
              <WordType5
                Review={Review}
                Result={questionResult}
                key={index.toString()}
                offsets={offsets}
                index={index}
                selected={answer}
                dragAnswers={() => dragAnswer(child.props.word)}
                answers={selected}
                positionX={cloneAttributesArray(
                  position.value,
                  'X',
                  heightItemp.value,
                  height1Itemp.value,
                )}
                positionY={cloneAttributesArray(
                  position.value,
                  'Y',
                  heightItemp.value,
                  height1Itemp.value,
                ).reverse()}
                removeAnswers={() => removeAnswers(child.props.word)}
                setAtIndexAnswer={setAtIndexAnswer}
                widthLine={MULTI_TEXT_WIDTH_LINE}
                marginLeftText={MULTI_TEXT}>
                {child}
              </WordType5>
            );
          })
        ) : (
          <View />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default PageType5;
