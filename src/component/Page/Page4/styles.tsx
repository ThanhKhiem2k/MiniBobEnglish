import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../../conf';
import { MARGIN_LEFT } from '../../../Utils/Layout';
const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ViewImage: {
    width: '80%',
    height: sizeDevices == 'small' ? '25%' : '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    marginVertical: 20,
  },
  image: {
    width: '95%',
    height: '95%',
  },
  question: {
    fontSize: sizeDevices == 'small' ? 20 : 23,
  },
  question1: {
    fontSize: sizeDevices == 'small' ? 20 : 23,
    color: '#000000',
  },
  viewQuestion: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: MARGIN_LEFT,
  },
  line: {
    borderBottomWidth: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  root: {
    opacity: 0,
    flex: 1,
  },
});
export default styles;
