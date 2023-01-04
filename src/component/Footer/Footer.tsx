import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import images from '../../conf/images';

interface IFooter {
  page: number;
  onClickNextFooter: () => void;
  onClickBackFooter: () => void;
}
const Footer = ({page, onClickBackFooter, onClickNextFooter}: IFooter) => {
  const [disableIcon, setDisableIcon] = useState<boolean>(false);
  useEffect(() => {
    setDisableIcon(true);
    setTimeout(() => {
      setDisableIcon(false);
    }, 300);
  }, [page]);
  return (
    <View style={styles.container}>
      {page === 0 ? (
        <Image
          source={images.btn_arrow_left_unable}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <TouchableOpacity disabled={disableIcon} onPress={onClickBackFooter}>
          <Image
            source={images.btn_arrow_left}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{page + 1}/20</Text>
      {page === 19 ? (
        <Image
          source={images.btn_arrow_right_unable}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <TouchableOpacity disabled={disableIcon} onPress={onClickNextFooter}>
          <Image
            source={images.btn_arrow_right}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>

    // <View style={styles.container}>
    //   {page != 0 ? (
    //     <TouchableOpacity onPress={onClickBackFooter}>
    //       <Image
    //         source={{
    //           uri: 'https://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/72/back-icon.png',
    //         }}
    //         style={styles.image}
    //       />
    //     </TouchableOpacity>
    //   ) : (
    //     <View style={styles.image} />
    //   )}
    //   <Text style={styles.text}>{page + 1}/20</Text>
    //   {page != 19 ? (
    //     <TouchableOpacity onPress={onClickNextFooter}>
    //       <Image
    //         source={{
    //           uri: 'https://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/72/forward-icon.png',
    //         }}
    //         style={styles.image}
    //       />
    //     </TouchableOpacity>
    //   ) : (
    //     <View style={styles.image} />
    //   )}
    // </View>
  );
};

export default Footer;
