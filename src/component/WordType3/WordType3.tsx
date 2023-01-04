import React, {ReactElement, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  // runOnUI,
  // useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  SharedValue,
} from 'react-native-reanimated';
import {useVector} from 'react-native-redash';
import {
  Offset,
  WORD_HEIGHT,
  MARGIN_LEFT,
  MARGIN_TOP_TYPES,
  // SENTENCE_HEIGHT,
  // MARGIN_ROW,
} from '../../Utils/Layout';
import Placeholder from '../PlaceHolder/PlaceHolder';

// import {SharedValues} from '../../Utils/TypeShareValue';
import {calculatePosition} from './../../Utils/Layout';
// import {checkIndex} from '../../features/counter/CounterSlice';
// import styles from './styles';

interface IWordType3Props {
  offsets: Offset[];
  children: ReactElement<{id: number}>;
  index: number;
  selected: number;
  answers: string[];
  dragAnswers: () => void;
  removeAnswers: () => void;
  setAtIndexAnswer: (index: number, text: string) => void;
  positionX: number[];
  positionY: number[];
  widthLine: number;
  marginLeftText: number;
  Result: string[];
  Review: boolean;
}

const WordType3: React.FC<IWordType3Props> = ({
  offsets,
  index,
  children,
  selected,
  answers,
  dragAnswers,
  positionX,
  positionY,
  removeAnswers,
  setAtIndexAnswer,
  marginLeftText,
  widthLine,
  Result,
  Review,
}) => {
  const offset = offsets[index]!;
  const isGestureActive = useSharedValue(false);
  const firstAnimation = useSharedValue(true);
  const translation = useVector();
  const startX = useSharedValue<number>(offset.originalX.value - MARGIN_LEFT);
  const startY = useSharedValue<number>(
    offset.originalY.value + MARGIN_TOP_TYPES,
  );

  const isInBank = useDerivedValue(() => offset.order.value === -1);
  const setAnswer = () => {
    'worklet';
    if (offset.order.value === -1) {
      runOnJS(dragAnswers)();
    }
  };
  const renmoveAnswer = () => {
    'worklet';
    runOnJS(removeAnswers)();
  };

  const setAtIndexAnswerReanimated = (index: number) => {
    'worklet';
    runOnJS(setAtIndexAnswer)(index, offset.word.value);
  };

  useEffect(() => {
    if (selected == -1) {
      offset.order.value = -1;
      offset.y.value = -WORD_HEIGHT;
    } else {
      //  setPosition();
      calculatePosition(positionX, positionY, offset, answers);
      offset.order.value = index;
    }
  }, [selected]);
  const dragGestureFalse = Gesture.Pan();
  const dragGesture = Gesture.Pan()
    .onStart(_e => {
      firstAnimation.value = false;
      if (isInBank.value) {
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP_TYPES;
        startX.value = offset.originalX.value - MARGIN_LEFT;
        startY.value = offset.originalY.value + MARGIN_TOP_TYPES;
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
        startX.value = offset.x.value;
        startY.value = offset.y.value;
      }
      isGestureActive.value = true;
    })
    .onUpdate(_e => {
      if (startY.value != 0 && startX.value != 0) {
        translation.x.value = startX.value + _e.translationX;
        translation.y.value = startY.value + _e.translationY;
      }
      const distance = Math.sqrt(_e.translationX ** 2 + _e.translationY ** 2);

      if (isInBank.value && _e.translationY < 0) {
        const check = answers.filter(o => o == '').length == 0;
        if (!check) {
          setAnswer();
          offset.order.value = index;
        }
      } else if (
        !isInBank.value &&
        distance > WORD_HEIGHT &&
        _e.translationY > 0
      ) {
        offset.order.value = -1;
        renmoveAnswer();
      }
    })
    .runOnJS(true)
    .onEnd(e => {
      startX.value = 0;
      startY.value = 0;
      if (isInBank.value && e.translationY < 0) {
        if (
          translation.y.value - 50 < offset.y.value + WORD_HEIGHT / 2 ||
          (positionY.length == 0 && positionX.length == 1)
        ) {
          const len = answers.length;
          for (let i = 0; i < len; i++) {
            if (positionY.length > 1) {
              if (
                translation.y.value < (positionY[i] - WORD_HEIGHT / 2) * -1 &&
                (translation.y.value > positionY[i + 1] * -1 || i == len - 1) &&
                positionX[len - i - 1] - widthLine / 2 - marginLeftText <
                  translation.x.value &&
                positionX[len - i - 1] + widthLine / 2 + marginLeftText >
                  translation.x.value
              ) {
                setAtIndexAnswerReanimated(len - i - 1);
                offset.x.value = positionX[len - i - 1];
                offset.y.value = positionY[i] * -1;
                offset.order.value = index;
                break;
              }
            } else {
              setAtIndexAnswerReanimated(i);
              offset.x.value = positionX[i];
              offset.order.value = index;
              break;
            }
          }
        }
      }
      isGestureActive.value = false;
    });
  useEffect(() => {
    if (index == offset.dataResult.value && answers.length == 1) {
      setAtIndexAnswerReanimated(0);
      offset.order.value = offset.dataResult.value;
      offset.x.value = positionX[0];
    }
  }, []);
  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    } else if (firstAnimation.value) {
      return isInBank.value
        ? offset.originalX.value - MARGIN_LEFT
        : offset.x.value;
    } else {
      return withSpring(
        isInBank.value ? offset.originalX.value - MARGIN_LEFT : offset.x.value,
        {stiffness: 200, mass: 1, damping: 20},
      );
    }
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    } else if (firstAnimation.value) {
      return isInBank.value
        ? offset.originalY.value + MARGIN_TOP_TYPES
        : offset.y.value;
    } else {
      return withSpring(
        isInBank.value
          ? offset.originalY.value + MARGIN_TOP_TYPES
          : offset.y.value,
        {stiffness: 200, mass: 1, damping: 20},
      );
    }
  });

  const style = useAnimatedStyle(() => {
    return {
      top: 0,
      left: 0,
      position: 'absolute',
      zIndex: isGestureActive.value ? 100 : 0,
      width: offset.width.value,
      height: WORD_HEIGHT,
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View>
      <Placeholder offset={offset} marginTop={MARGIN_TOP_TYPES} />
      <Animated.View style={style}>
        <GestureDetector gesture={!Review ? dragGesture : dragGestureFalse}>
          <Animated.View style={StyleSheet.absoluteFill}>
            {children}
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
};

export default WordType3;
