import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export type IItemSemesterProps = {
  styleRow: StyleProp<ViewStyle>;
  styleViewTopic: StyleProp<ViewStyle>;
  styleViewTitle: StyleProp<ViewStyle>;
  styleTopic: StyleProp<TextStyle>;
  styleTitle: StyleProp<TextStyle>;
  id?: number;
  tenBoDe?: string;
  soCau?: string;
  soPhut?: string;
  soDiem?: string;
  onPress: (id?: number, name?: string) => void;
};

const ItemSemester: React.FC<IItemSemesterProps> = ({
  styleRow,
  styleViewTopic,
  styleTitle,
  styleTopic,
  styleViewTitle,
  id,
  tenBoDe,
  soCau,
  soDiem,
  soPhut,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styleRow} onPress={() => onPress(id, tenBoDe)}>
      <View style={styleViewTopic}>
        <Text style={styleTopic}>{tenBoDe}</Text>
      </View>
      <View style={styleViewTitle}>
        <Text style={styleTitle}>{soCau}</Text>
        <Text style={styleTitle}>{soPhut}</Text>
        <Text style={styleTitle}>{soDiem}/10</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSemester;
