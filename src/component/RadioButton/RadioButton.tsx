import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Image,
  TextStyle,
} from 'react-native';
import styles from './styles';
import { MARGIN_LEFT } from '../../Utils/Layout';
import { handleSoundClick } from '../../Utils/Sound';
interface IRadioButtonProps {
  title?: string;
  isSelected: boolean;
  content: string;
  onPress: () => void;
  styleSelected: StyleProp<ViewStyle>;
  textOptions: StyleProp<TextStyle>;
  touchableImage: StyleProp<ViewStyle>;
  Review: boolean;
}

const RadioButton: React.FC<IRadioButtonProps> = ({
  title,
  isSelected,
  content,
  onPress,
  styleSelected,
  textOptions,
  touchableImage,
  Review,
}) => {
  return (
    <View style={{ ...styles.container }}>
      <View style={styles.viewImage}>
        <TouchableOpacity
          disabled={Review}
          style={touchableImage}
          onPress={onPress}>
          <Image
            source={{
              uri: content,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={Review}
        onPress={onPress}
        style={styleSelected}>
        <Text style={textOptions}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;
