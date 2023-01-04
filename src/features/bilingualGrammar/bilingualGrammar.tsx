import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import {Images} from '../../conf';
import {ActivityIndicator} from 'react-native-paper';
import { handleSoundClick } from '../../Utils/Sound';

type Props = {};
//document.getElementsByClassName("block2")[0].style = "visibility: hidden";
//document.getElementsByClassName("_51mx")[0].remove();
//style='word-wrap:break-word; '
//document.getElementById("aswift_1_host").remove();
const getSize = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};

const BilingualGrammar = (props: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const runFirst = `
    document.getElementsByClassName("icon-ad-wrapper")[0].remove();
    document.getElementsByClassName("btn-menu")[0].remove();
    document.getElementsByClassName("content")[0].remove();
    document.getElementsByClassName("article-nav-wrapper")[0].remove();
    document.getElementsByClassName("social-buttons")[0].remove();
    true;
    `;
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
        //onRenderProcessGone
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
        source={{
          uri: 'https://tienganhmoingay.com/ngu-phap-tieng-anh/tong-hop-ngu-phap-tieng-anh/',
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
export default BilingualGrammar;

const styles = StyleSheet.create({});
