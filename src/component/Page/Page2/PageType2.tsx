import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Page2/styles';
import { MARGIN_LEFT } from '../../../Utils/Layout';
import RadioButton from '../../RadioButton/RadioButton';
import { ConvertOptions } from '../../../Utils/ConvertOption';
import { handleSoundClick } from '../../../Utils/Sound';
export interface IPage2Props {
  linkImage: string[];
  textQuestion: string;
  id: number;
  stringAnswer: string;
  UpdateResults: Function;
  Review: boolean;
}

const PageType2: React.FC<IPage2Props> = ({
  linkImage,
  textQuestion,
  id,
  stringAnswer,
  UpdateResults,
  Review,
}) => {
  const [chonDapan, setChonDapan] = useState<string>('');

  // const selected:boolean = dataResult == 'A' ? true
  const onClickAnswer = (item: string) => {
    handleSoundClick();
    setChonDapan(item)
  };
  useEffect(() => {
    setChonDapan('');
    UpdateResults('');
  }, [linkImage]);
  useEffect(() => {
    linkImage.forEach((item, index) => {
      chonDapan === item && index == 0
        ? UpdateResults('A')
        : chonDapan === item && index == 1
          ? UpdateResults('B')
          : null;
    });

  }, [chonDapan])

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.text,
          marginLeft: MARGIN_LEFT,
          alignSelf: 'center',
          marginTop: '15%',
        }}>
        {textQuestion}
      </Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {linkImage.map((item, index) => {
          const selected =
            chonDapan === item
              ? true
              : index ==
                (stringAnswer == 'A' ? 0 : stringAnswer == 'B' ? 1 : -1) &&
                chonDapan == ''
                ? true
                : false;
          return (
            <RadioButton
              key={index.toString()}
              title={ConvertOptions(index)}
              content={item}
              isSelected={selected}
              Review={Review}
              onPress={() => { onClickAnswer(item) }}
              touchableImage={
                selected ? styles.touchableImageSelect : styles.touchableImage
              }
              textOptions={
                selected ? styles.textOptionsSelect : styles.textOptions
              }
              styleSelected={selected ? styles.optionSelect : styles.option}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PageType2;
