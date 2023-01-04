import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WORD_HEIGHT } from '../../Utils/Layout';
import styles from './styles';

interface WordProps {
  id: number;
  word: string;
}

const Word = ({ word }: WordProps) => {
  return (
    <View style={styles.root}>
      <View>
        <View
          style={{
            ...styles.container,
            height: WORD_HEIGHT - 8,
            paddingHorizontal: word.length > 1 ? 5 : 10,
          }}>
          <Text style={styles.text}>{word}</Text>
        </View>
        <View style={styles.shadow} />
      </View>
    </View>
  );
};

export default Word;
