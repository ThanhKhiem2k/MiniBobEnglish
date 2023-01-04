import {Dimensions} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {move} from 'react-native-redash';

import {SharedValues} from './TypeShareValue';
const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';

export const MARGIN_TOP_TYPE1 = sizeDevices == 'small' ? 170 : 200;
export const MARGIN_TOP_TYPES = 40;
export const MARGIN_LEFT = 30;
export const NUMBER_OF_LINES = 4;
export const WORD_HEIGHT = 50;
export const SENTENCE_HEIGHT = (NUMBER_OF_LINES - 1) * WORD_HEIGHT;
export const SINGLE_TEXT_WIDTH_LINE = 50;
export const MULTI_TEXT_WIDTH_LINE = 70;
export const SINGLE_TEXT = 2;
export const MULTI_TEXT = -20;
export const MARGIN_ROW = 15;

export type Offset = SharedValues<{
  order: number;
  width: number;
  height: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  word: string;
  dataResult: number;
}>;

const isNotInBank = (offset: Offset) => {
  'worklet';
  return offset.order.value !== -1;
};

const byOrder = (a: Offset, b: Offset) => {
  'worklet';
  return a.order.value > b.order.value ? 1 : -1;
};

export const lastOrder = (input: Offset[]) => {
  'worklet';
  return input.filter(isNotInBank).length;
};

export const remove = (input: Offset[], index: number) => {
  'worklet';
  const offsets = input
    .filter((_, i) => i !== index)
    .filter(isNotInBank)
    .sort(byOrder);
  offsets.map((offset, i) => (offset.order.value = i));
};

export const reorder = (input: Offset[], from: number, to: number) => {
  'worklet';
  const offsets = input.filter(isNotInBank).sort(byOrder);
  const newOffset = move(offsets, from, to);
  newOffset.map((offset, index) =>
    typeof offset.order !== 'undefined' ? (offset.order.value = index) : null,
  );
};

export const calculateLayout = (input: Offset[], containerWidth: number) => {
  'worklet';
  const offsets = input.filter(isNotInBank).sort(byOrder);
  if (offsets.length === 0) {
    return;
  }
  let lineNumber = 0;
  let lineBreak = 0;
  offsets.forEach((offset, index) => {
    const total = offsets
      .slice(lineBreak, index)
      .reduce((acc, o) => acc + o.width.value, 0);
    // console.log(total);
    if (total + offset.width.value > containerWidth) {
      lineNumber += 1;
      lineBreak = index;
      offset.x.value = -20;
    } else {
      offset.x.value = total - 20;
    }
    offset.y.value = WORD_HEIGHT * lineNumber;
  });
};
export const calculatePosition = (
  inputX: number[],
  inputY: number[],
  offset: Offset,
  answer: string[],
) => {
  'worklet';

  let index: number = answer.length;
  const length: number = answer.length;
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] == offset.word.value) {
      index = i;
      break;
    }
  }

  if (index < length) {
    offset.x.value = inputX[index];
    if (inputY.length > 0) {
      offset.y.value = inputY[length - 1 - index] * -1;
    }
  }
};
