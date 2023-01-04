import React from 'react';
import {StyleSheet, View} from 'react-native';

import {WORD_HEIGHT, NUMBER_OF_LINES} from '../../Utils/Layout';
import styles from './styles';

const Lines = () => {
  return (
    <View style={styles.container}>
      {new Array(NUMBER_OF_LINES).fill(0).map((_, index) => (
        <View
          key={index * WORD_HEIGHT}
          style={{...styles.line, top: index * WORD_HEIGHT + 5}}
        />
      ))}
    </View>
  );
};

export default Lines;
