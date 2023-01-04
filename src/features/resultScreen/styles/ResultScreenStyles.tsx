// import { COLORS } from '../../../contains/colors'
import {StyleSheet} from 'react-native';
import {Colors, Images} from '../../../conf/';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between'
    backgroundColor: Colors.secondary,
  },
  imageBackground: {
    flex: 1,
  },
  cardWrapper: {
    margin: 20,
    marginTop: 20,
    marginBottom: 5,
    // borderRadius: 20,
    height: '80%',
  },
  topicWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
  },
  textTopic: {
    fontSize: 20,
    color: Colors.textQuestion2,
    fontWeight: 'bold',
  },
  bodyWrapper: {
    margin: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sentenceWrapper: {
    // borderWidth: 0.5,
    flex: 1,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.card2,
  },
  textSentence: {
    // margin: 20,
    fontSize: 18,
    color: Colors.textQuestion,
    fontWeight: 'bold',
  },
  resultWrapper: {
    flex: 0.5,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
  },
  scoreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  textScore: {
    fontSize: 18,
    color: Colors.textQuestion2,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flex: 2,
    margin: 20,
  },
  buttonTryAgain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  textButtonTryAgain: {
    fontSize: 18,
    color: Colors.textHeader,
    fontWeight: 'bold',
  },
  buttonReview: {
    flex: 1,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});
