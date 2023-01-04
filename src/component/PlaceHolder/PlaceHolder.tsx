import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { MARGIN_LEFT, Offset, WORD_HEIGHT } from '../../Utils/Layout';

interface PlaceholderProps {
  offset: Offset;
  marginTop: number;
}

const Placeholder = ({ offset, marginTop }: PlaceholderProps) => {
  return (
    <View
      style={{
        ...styles.container,
        top: offset.originalY.value + marginTop + 3,
        left: offset.originalX.value - MARGIN_LEFT + 7,
        width: offset.width.value - 14,
        height: WORD_HEIGHT - 4,
      }}
    />
  );
};

export default Placeholder;
