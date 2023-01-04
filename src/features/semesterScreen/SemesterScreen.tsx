import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getTopics, updateSelectedAnswer} from '../../www/connectDB';
import {BoDe} from '../../model/dbModel';
import styles from './styles';
import {Colors, Images} from '../../conf';
import ItemSemester from '../../component/ItemSemester/ItemSemester';
import {handleSoundClick} from '../../Utils/Sound';

export type ISemesterScreenProps = {};

const SemesterScreen: React.FC<ISemesterScreenProps> = ({}) => {
  const [topics, setTopic] = useState<BoDe[]>();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {idSemester} = route.params;
  const Review: boolean = false;

  const getTopic = async () => {
    await getTopics((data: BoDe[]) => {
      setTopic(data);
    }, idSemester);
  };

  useEffect(() => {
    getTopic();
    return () => setTopic([]);
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.card,
      title: route?.params?.nameSemester,
      headerTitleStyle: {
        fontSize: 22,
        color: Colors.secondary,
      },
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleSoundClick();
            navigation.goBack();
          }}>
          <Image
            source={Images.btn_back}
            style={{
              tintColor: Colors.secondary,
              height: 25,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const renderSeparatorView = () => {
    return <View style={styles.seprator} />;
  };

  const onClickDetailSemester = (id?: number, name?: string) => {
    handleSoundClick();
    updateSelectedAnswer(id || 0);
    navigation.navigate('DetailSemester', {
      idTopic: id,
      topicName: name?.toUpperCase(),
      Review,
    });
  };

  const renderItems = ({item, index}: {item: BoDe; index: number}) => (
    <ItemSemester
      styleRow={styles.row}
      styleViewTopic={styles.viewTopic}
      styleViewTitle={styles.viewTitle}
      styleTopic={styles.topic}
      styleTitle={styles.text}
      id={item.id}
      soCau={item.soCau}
      soDiem={item.soDiem}
      soPhut={item.soPhut}
      tenBoDe={item.tenBoDe}
      onPress={onClickDetailSemester}
    />
  );

  return (
    <View style={styles.root}>
      <StatusBar hidden={false} backgroundColor={Colors.primary} />

      {/* <StatusBar backgroundColor={Colors.primary} /> */}
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.viewTopic}>
            {/* <Text style={styles.title}>Đề</Text> */}
          </View>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>Câu</Text>
            <Text style={styles.title}>Phút</Text>
            <Text style={styles.title}>Điểm</Text>
          </View>
        </View>
        <View style={styles.viewContent}>
          <FlatList
            data={topics}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={renderSeparatorView}
            removeClippedSubviews={true}
          />
        </View>
      </View>
    </View>
  );
};

export default SemesterScreen;
