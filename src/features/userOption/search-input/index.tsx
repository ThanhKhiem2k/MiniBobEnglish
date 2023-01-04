import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import { Colors, TextStyles } from '../../../assets';
import assets from '../assets';

export default function SPSearchInput(props) {
  const {
    containerStyle,
    placeholder,
    onChangeText,
    onSubmitEditing,
    onClear,
    onBlur,
    onFocus,
  } = props;
  const [value, setValue] = useState('');

  const _handleChangeText = text => {
    onChangeText && onChangeText(text);
    setValue(text);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={_handleChangeText}
        clearButtonMode="never"
        placeholderTextColor={'#003c5e'}
        returnKeyType="search"
        value={value}
        onSubmitEditing={onSubmitEditing}
        underlineColorAndroid={'transparent'}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <TouchableOpacity
        disabled={value.length === 0}
        onPress={() => {
          _handleChangeText('');
          onClear();
        }}>
        <Image
          style={styles.icon}
          source={value.length > 0 ? assets.clearGrey : assets.search}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#148',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 12,
  },
  textInput: {
    flex: 1,
    height: '100%',
  },
  icon: {
    width: 32,
    height: 32,
  },
});
