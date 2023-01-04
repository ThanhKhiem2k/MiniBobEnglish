/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { useSharedValue, runOnUI, runOnJS } from 'react-native-reanimated';

import SortableWord from '../SortableWord/SortableWord';
import Lines from '../Line/Line';
import { MARGIN_LEFT, Offset } from '../../Utils/Layout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';

const containerWidth = Dimensions.get('window').width - 35 * 2;

interface WordListProps {
  children: ReactElement<{ id: number; word: string }>[];
  arrayNumberAnswer: number[];
  UpdateResults: Function;
  Review: boolean;
  haveImage: boolean
}
// const array: number[] =;
const WordList = ({
  children,
  arrayNumberAnswer,
  UpdateResults,
  Review,
  haveImage
}: WordListProps) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    dataResult: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
    word: useSharedValue(''),
  }));
  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          return (
            <View
              key={index}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height },
                },
              }) => {
                const offset = offsets[index]!;
                offset.order.value = -1;
                {
                  arrayNumberAnswer.length != 0
                    ? (offset.dataResult.value = arrayNumberAnswer[index])
                    : (offset.dataResult.value = -1);
                }
                offset.width.value = width;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                offset.word.value = child.props.word;
                runOnUI(() => {
                  'worklet';
                  if (offsets.filter(o => o.order.value !== -1).length === 0) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}>
              {child}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ ...styles.container, margin: 30 }}>
      <Lines />
      {children.map((child, index) => (
        <SortableWord
          haveImage={haveImage}
          Review={Review}
          UpdateResults={UpdateResults}
          key={index}
          offsets={offsets}
          index={index}
          containerWidth={containerWidth}>
          {child}
        </SortableWord>
      ))}
    </GestureHandlerRootView>
  );
};

export default WordList;
