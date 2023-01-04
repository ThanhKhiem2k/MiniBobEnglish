import React, {ReactElement, useEffect, useState} from 'react';
import {View, Text, Image, Dimensions, Platform} from 'react-native';
import styles from './styles';
import {MARGIN_LEFT, WORD_HEIGHT} from '../../../Utils/Layout';
import {runOnJS, runOnUI, useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import WordType3 from '../../WordType3/WordType3';
import {checkIndex} from '../../../features/counter/CounterSlice';
import {Word} from '../../../model/dbModel';

interface IPageType3Props {
  children: ReactElement<{id: number; word: string}>[];
  question: string[];
  widthLine: number;
  marginLeftText: number;
  title: string;
  id: number;
  imageQuestion: string;
  stringAnswer: string;
  UpdateResults: Function;
  Review: boolean;
}

const PageType3: React.FC<IPageType3Props> = ({
  children,
  question,
  marginLeftText,
  widthLine,
  title,
  id,
  imageQuestion,
  stringAnswer,
  UpdateResults,
  Review,
}) => {
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(-WORD_HEIGHT),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
    word: useSharedValue(''),
    dataResult: useSharedValue(0),
  }));

  // const bank : = 0;
  const [bank, setBank] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  // const position = useSharedValue<number[]>([]);
  const [checkPosition, setCheckPosition] = useState<number[]>([]);
  const [HeightItem, setHeightItem] = useState<number>(0);
  const [HeightItemGroup, setHeightItemGroup] = useState<number>(0);
  const [positionYItemp, setPositionYItemp] = useState<number>(0);
  const [positionStateHeight, setPositionStateHeight] = useState<number>(0);

  // const checkPosition = useSharedValue<number[]>([]);
  const dragAnswer = (text: string) => {
    const arr: string[] = [...selected];
    let index: number = bank - 1;
    for (let i = 0; i < checkPosition.length; i++) {
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
  const setAtIndexAnswer = (index: number, text: string) => {
    const arr: string[] = [...selected];
    const _i = selected.indexOf(text);
    if (_i == -1) {
      arr[index] = text;
      setSelected(arr);
    }
  };
  const calculatePositionY = (
    HeightItem: number,
    HeightItemGroup: number,
    positionYItemp: number,
  ) => {
    let result = 0;
    const lineNumberQS = parseInt((HeightItemGroup / HeightItem).toFixed());
    const lineNumberA = parseInt((positionYItemp / HeightItem).toFixed()) + 1;
    const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';
    if (lineNumberQS === lineNumberA) {
      result = HeightItem;
    } else if (lineNumberQS - 1 === lineNumberA) {
      result = HeightItem * 2;
    } else if (lineNumberQS - 2 === lineNumberA) {
      result = HeightItem * 3;
    }
    return (
      result +
      (sizeDevices == 'small' ? 13 : 10) -
      (Platform.OS === 'android' ? 15 : 0)
    );
  };
  useEffect(() => {
    if (selected[0] != undefined) {
      UpdateResults(selected[0].trim());
    }
  }, [selected]);
  useEffect(() => {
    const length = question.filter(o => o === '_').length;
    setBank(length);
    for (let i = 0; i < length; i++) {
      checkPosition[i] = -1;
      selected[i] = '';
    }
  }, [question]);
  useEffect(() => {
    setPositionStateHeight(
      calculatePositionY(HeightItem, HeightItemGroup, positionYItemp),
    );
  }, [HeightItem, HeightItemGroup, positionYItemp]);
  if (position == 0 || ready == false) {
    return (
      <View style={styles.root}>
        <View
          style={{...styles.viewQuestion, marginLeft: MARGIN_LEFT + 10}}
          onLayout={({
            nativeEvent: {
              layout: {x, y, width, height},
            },
          }) => {
            setHeightItemGroup(height);
          }}>
          {question.map((item, index) => {
            return item == '_' ? (
              <View
                key={index}
                style={{...styles.line, width: widthLine}}
                onLayout={({
                  nativeEvent: {
                    layout: {x, y, width, height},
                  },
                }) => {
                  setHeightItem(height);
                  setPositionYItemp(y);
                  setPosition(
                    -MARGIN_LEFT + x + marginLeftText + widthLine / 2,
                  );
                }}
              />
            ) : (
              <Text
                key={index}
                style={{
                  ...styles.question,
                  marginRight:
                    question[index + 1] || question[index - 1] === '' ? 8 : 0,
                }}>
                {item}
              </Text>
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
                  offset.dataResult.value =
                    child.props.word == stringAnswer ? index : -1;
                  runOnUI(() => {
                    'worklet';
                    if (
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
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.ViewImage}>
        <Image
          source={{
            uri: imageQuestion,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={{...styles.viewQuestion, marginLeft: MARGIN_LEFT}}>
        {question.map((item, index) => {
          return item === '_' ? (
            <View style={{flexDirection: 'row'}} key={index}>
              <View style={{...styles.line, width: widthLine}} />
              <Text> </Text>
            </View>
          ) : (
            <Text
              key={index}
              style={{
                ...styles.question,
                marginRight:
                  question[index + 1] || question[index - 1] === '' ? 8 : 0,
              }}>
              {item}
            </Text>
          );
        })}
      </View>

      <View style={{flex: 1, marginLeft: MARGIN_LEFT}}>
        {children.map((child, index) => {
          const answer = selected.indexOf(child.props.word);
          return (
            <WordType3
              Review={Review}
              Result={[]}
              key={index.toString()}
              offsets={offsets}
              index={index}
              selected={answer}
              answers={selected}
              dragAnswers={() => dragAnswer(child.props.word)}
              positionX={[position]}
              positionY={[positionStateHeight]}
              removeAnswers={() => removeAnswers(child.props.word)}
              setAtIndexAnswer={setAtIndexAnswer}
              widthLine={widthLine}
              marginLeftText={marginLeftText}>
              {child}
            </WordType3>
          );
        })}
      </View>
      <View style={{flex: 1}} />
    </GestureHandlerRootView>
  );
};

export default PageType3;
