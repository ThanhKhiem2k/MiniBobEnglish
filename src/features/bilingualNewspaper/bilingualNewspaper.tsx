import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Images} from '../../conf';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {handleSoundClick} from '../../Utils/Sound';

type Props = {};
//document.getElementsByClassName("block2")[0].style = "visibility: hidden";
//document.getElementsByClassName("block2")[0].remove();
//document.getElementById("cfacebook").remove();
//document.getElementById("header").remove();
const getSize = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};

const BilingualNewspaper = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const runFirst = `
      document.getElementsByClassName("header-banner header-style-3")[0].remove();
      document.getElementsByClassName("faq-home")[0].remove();
      true;`;
  const initialRef: any = null;
  const webView = useRef(initialRef);
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            zIndex: 1,
            backgroundColor: '#dddddd',
          }}>
          <ActivityIndicator
            // animating={isLoading}
            size={'large'}
            color={'#00e3feff'}
            style={{}}
          />
        </View>
      ) : null}
      <WebView
        incognito={true}
        style={{justifyContent: 'flex-end'}}
        setSupportMultipleWindows={false}
        pullToRefreshEnabled={true}
        textZoom={100}
        useWebView2={true}
        ref={webView}
        originWhitelist={['*']}
        sharedCookiesEnabled={true}
        injectedJavaScript={runFirst}
        // injectedJavaScriptBeforeContentLoaded={runFirst}
        setBuiltInZoomControls={false}
        // source={{uri: 'http://saokhue.edu.vn/bao-song-ngu-nc,12386'}}
        source={{
          uri: 'http://vietanhsongngu.com/hoc-tieng-anh-bai-mau-tin-tuc-c5.htm',
        }}
        onLoadStart={() => {
          setLoading(true);
        }}
        // onLoad={() => {}}
        scalesPageToFit={true}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: getSize().height * 0.1,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            webView.current?.goBack();
            handleSoundClick();
          }}>
          <Image
            source={Images.back_page}
            style={{
              // tintColor: Colors.primary,
              margin: 10,
              overflow: 'hidden',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            webView.current?.goForward();
            handleSoundClick();
          }}>
          <Image
            source={Images.next_page}
            style={{
              margin: 10,
              overflow: 'hidden',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BilingualNewspaper;

const styles = StyleSheet.create({});
