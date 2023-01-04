import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { between, useVector } from 'react-native-redash';

import {
  calculateLayout,
  lastOrder,
  Offset,
  remove,
  reorder,
  WORD_HEIGHT,
  SENTENCE_HEIGHT,
  MARGIN_LEFT,
} from '../../Utils/Layout';
import Placeholder from '../PlaceHolder/PlaceHolder';
import { MARGIN_TOP_TYPE1 } from '../../Utils/Layout';

interface SortableWordProps {
  offsets: Offset[];
  children: ReactElement<{ id: number }>;
  index: number;
  containerWidth: number;
  UpdateResults: Function;
  Review: boolean;
  haveImage: boolean;
}

const SortableWord = ({
  offsets,
  index,
  children,
  containerWidth,
  UpdateResults,
  Review,
  haveImage
}: SortableWordProps) => {
  const offset = offsets[index]!;
  // let loading: number = 0;
  // const translateDefaultX = useSharedValue<boolean>(false);
  // const translateDefaultY = useSharedValue<boolean>(false);
  const [translateDefaultX, setTranslateDefaultX] = useState<boolean>(false);
  const [translateDefaultY, setTranslateDefaultY] = useState<boolean>(false);
  const isGestureActive = useSharedValue(false);
  const isAnimating = useSharedValue(false);
  const translation = useVector();
  const isInBank = useDerivedValue(() => offset.order.value === -1);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      if (isInBank.value) {
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP_TYPE1;
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }
      ctx.x = translation.x.value;
      ctx.y = translation.y.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translation.x.value = ctx.x + translationX;
      translation.y.value = ctx.y + translationY;
      if (isInBank.value && translation.y.value < SENTENCE_HEIGHT) {
        offset.order.value = lastOrder(offsets);
        calculateLayout(offsets, containerWidth);
      } else if (!isInBank.value && translation.y.value > SENTENCE_HEIGHT) {
        offset.order.value = -1;
        remove(offsets, index);
        calculateLayout(offsets, containerWidth);
      }
      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i]!;
        if (i === index && o.order.value !== -1) {
          continue;
        }
        if (
          between(translation.x.value, o.x.value, o.x.value + o.width.value) &&
          between(translation.y.value, o.y.value, o.y.value + WORD_HEIGHT)
        ) {
          reorder(offsets, offset.order.value, o.order.value);
          calculateLayout(offsets, containerWidth);
          break;
        }
      }
    },
    onEnd: ({ velocityX, velocityY }) => {
      isAnimating.value = true;
      translation.x.value = withSpring(
        offset.x.value,
        { velocity: velocityX },
        () => (isAnimating.value = false),
      );
      translation.y.value = withSpring(offset.y.value, { velocity: velocityY });
      isGestureActive.value = false;
    },
  });
  useEffect(() => {
    let arrayResult: string[] = [];
    offsets.forEach((of, index) => {
      if (
        offsets[offsets.findIndex((off, idx) => off.order.value == index)] !=
        undefined
      ) {
        arrayResult.push(
          offsets[
            offsets.findIndex((off, idx) => off.order.value == index)
          ].word.value.trim(),
        );
      }
      if (haveImage == true) {
        UpdateResults(arrayResult.join(''));
      } else {
        UpdateResults(arrayResult.join(' '));
      }
    });
  }, [offset]);
  useEffect(() => {
    if (offset.dataResult.value != -1) {
      calculateLayout(offsets, containerWidth);
    }
  }, [offset.order.value])
  // useEffect(() => {
  //   // const timer = setTimeout(() => {
  //   //   console.log('This will run after 1 second!')
  //   // }, 1000);
  //   // return () => clearTimeout(timer);
  // }, [])
  useEffect(() => {
    if (offset.dataResult.value != -1) {
      offsets[index].order.value = offset.dataResult.value;
      calculateLayout(offsets, containerWidth);
    }
    setTimeout(() => {
      setTranslateDefaultY(true);
      setTranslateDefaultX(true);
    }, 500);
  }, [offset.dataResult.value]);
  const translateX = useDerivedValue(() => {

    if (isGestureActive.value) {
      return translation.x.value ;
    }
    if (translateDefaultX == false) {
      return isInBank.value
        ? offset.originalX.value - MARGIN_LEFT 
        : offset.x.value;
    }
    return withSpring(
      isInBank.value ? offset.originalX.value - MARGIN_LEFT  : offset.x.value,
      { stiffness: 200, mass: 1, damping: 20 },
    );
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    if (translateDefaultY == false) {
      return isInBank.value
        ? offset.originalY.value + MARGIN_TOP_TYPE1
        : offset.y.value;
    }
    return withSpring(
      isInBank.value
        ? offset.originalY.value + MARGIN_TOP_TYPE1
        : offset.y.value,
      { stiffness: 200, mass: 1, damping: 20 },
    );
  });
  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: isGestureActive.value || isAnimating.value ? 100 : 0,
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
    <GestureHandlerRootView>
      <Placeholder offset={offset} marginTop={MARGIN_TOP_TYPE1} />
      <Animated.View style={style}>
        <PanGestureHandler enabled={!Review} onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default SortableWord;
