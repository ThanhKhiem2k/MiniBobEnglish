import { Dimensions, StyleSheet } from 'react-native';
import { MARGIN_ROW, MULTI_TEXT_WIDTH_LINE } from '../../../Utils/Layout';
const sizeDevices = Dimensions.get('window').height < 650 ? 'small' : 'big';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    // backgroundColor: 'yellow',
    // marginRight: 200,

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  question: {
    fontSize: sizeDevices == 'small' ? 16 : 20,
    fontWeight: 'bold',
    height: 50,
    color: '#000000',
    // backgroundColor: 'red',
    // marginTop: 10,
  },
  viewQuestion: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  line: {
    // marginBottom: 5,
    // marginTop: 45,
    // marginRight: 5,
    // backgroundColor: 'black',
    height: 40,
    borderBottomWidth: 1.5,
    // width: MULTI_TEXT_WIDTH_LINE,
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
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
});
export default styles;
