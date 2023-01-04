import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getTopicsTQ} from '../../www/connectDB';
import {ChuDeTQ} from '../../model/dbModel';
import ListTopic from './component/ListTopic';
import Images from '../../conf/images';

interface PropsVocabularyTopics {}

const VocabularyTopics: React.FC<PropsVocabularyTopics> = ({}) => {
  const [DataTopics, setDataTopics] = useState<ChuDeTQ[]>([]);
  const arrImg: any[] = [
    Images.imgTopic_popular,
    Images.imgTopic_lifeDaily,
    Images.imgTopic_natural,
    Images.imgTopic_school,
    Images.imgTopic_people,
    Images.imgTopic_media,
    Images.imgTopic_surrounding_things,
    Images.imgTopic_working,
  ];
  const getDataTopics = async () => {
    await getTopicsTQ((result: ChuDeTQ[]) => {
      setDataTopics(result);
    });
  };

  useEffect(() => {
    getDataTopics();
    return () => setDataTopics([]);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ListTopic arrTopic={DataTopics} listIMG={arrImg} />
    </View>
  );
};

export default VocabularyTopics;

const styles = StyleSheet.create({});
